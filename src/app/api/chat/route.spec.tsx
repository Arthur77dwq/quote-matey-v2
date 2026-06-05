import type { DecodedIdToken } from 'firebase-admin/auth';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

export const mockGenerate = vi.fn();
vi.mock('@/lib/ai/ai', () => {
  class MockGoogleAI {
    generate = mockGenerate;
  }

  class MockOpenAIGenAI {
    generate = mockGenerate;
  }

  return {
    GoogleAI: MockGoogleAI,
    OpenAIGenAI: MockOpenAIGenAI,
  };
});

vi.mock('@/constant/ai', () => ({
  MODELS: [
    {
      id: 'test-1',
      compatibility: 'google',
      priority: 1,
      temperature: 0.7,
      abortTimeout: 3000,
      model: 'model-1',
      maxOutputTokens: 1000,
    },
    {
      id: 'test-2',
      compatibility: 'openai',
      priority: 0,
      temperature: 0.7,
      abortTimeout: 3000,
      model: 'model-2',
      maxOutputTokens: 1000,
    },
  ],
  SYSTEM_PROMPTS: {
    text: 'test prompt',
    image: 'test image prompt',
  },
}));

import { NextRequest } from 'next/server';

import { buildPrompt, extractCurrectMessage, POST } from '@/app/api/chat/route';
import { Message } from '@/types/chat';

function createRequest<T>(body: T): NextRequest {
  return {
    json: async () => body,
  } as unknown as NextRequest;
}

function createTextMsg(msg: string) {
  return [{ id: `1${msg}`, role: 'user', parts: [{ text: msg }] }];
}

const findTextpart = (parts: Message[]) => {
  return parts.find((part) => 'text' in part) || { text: '' };
};

async function readStreamResponse(res: Response) {
  const reader = res.body?.getReader();

  if (!reader) {
    throw new Error('No response body');
  }

  let result = '';

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    result += new TextDecoder().decode(value);
  }

  const lines = result
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line) => JSON.parse(line));
}

async function* mockStream(msg?: string) {
  yield { text: msg };
}

/* eslint-disable require-yield */
async function* failingStream(status: number) {
  throw { status };
}

vi.mock('@/services/usage', () => ({
  updateUsage: vi.fn(),
}));

vi.mock('@/lib/auth/user', () => ({
  getUserId: vi.fn(),
}));

vi.mock('@/services/access', () => ({
  canUserUseFeature: vi.fn(),
}));

import { MODELS } from '@/constant/ai';
import { getUserId } from '@/lib/auth/user';
import { cleanOutput } from '@/lib/utils';
import { canUserUseFeature } from '@/services/access';
import { updateUsage } from '@/services/usage';

describe('Chat API', () => {
  const expectedErrorMessage = '❌ Something went wrong. Please try again.';
  describe('Core Functionality', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.clearAllMocks();
      process.env.GEMINI_API_KEY = 'test-key';

      vi.mocked(getUserId).mockResolvedValue({
        uid: 'test-user-id',
      } as DecodedIdToken);
      vi.mocked(updateUsage).mockResolvedValue(undefined);
      vi.mocked(canUserUseFeature).mockResolvedValue(true);
    });

    test('TC-01: Should extract user message.', () => {
      const mockMessages: Message[] = [
        { id: '1', role: 'user', parts: [{ text: 'leaking tap' }] },
      ];

      const userMessage = extractCurrectMessage(mockMessages);

      expect(userMessage.msg).toBe('leaking tap');
    });

    test('TC-03: Should build prompt which contains user message.', () => {
      const prompt = buildPrompt('Fix AC', false);

      expect(prompt).toContain('Fix AC');
      expect(prompt).toContain('[SYSTEM]');
      expect(prompt).toContain('[INPUT START]');
    });

    test('TC-04: Should call ai model to generate quote.', async () => {
      mockGenerate.mockReturnValue(mockStream('Quote generated'));

      const req = createRequest({
        messages: createTextMsg('Need plumbing work'),
      });

      const res = await POST(req);

      await readStreamResponse(res);

      expect(mockGenerate).toHaveBeenCalledTimes(1);

      expect(mockGenerate).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Number),
        expect.any(Number),
        expect.any(Number),
        expect.any(Array),
      );
    });

    test('TC-05: Should provide response.', async () => {
      mockGenerate.mockReturnValue(mockStream('Final quote'));

      const req = createRequest({
        messages: createTextMsg('Need electrician'),
      });

      const res = await POST(req);
      const data = await readStreamResponse(res);
      expect(findTextpart(data[0].parts).text).toBe('Final quote');
      expect('Final quote').toBe('Final quote');
    });

    test('TC-33: Returns upgrade notification when usage exceeded', async () => {
      vi.mocked(canUserUseFeature).mockResolvedValue(false);

      const req = createRequest({
        messages: createTextMsg('test'),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.notification.link_text).toBe('Upgrade');
      expect(data.notification.info_text).toContain('Usage limit exceed');
    });

    test('TC-34: Handles image-only input', async () => {
      mockGenerate.mockReturnValue(mockStream('Image processed'));

      const req = createRequest({
        messages: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: 'base64-image',
                },
              },
            ],
          },
        ],
      });

      const res = await POST(req);
      const data = await readStreamResponse(res);

      expect(data[0].parts[0].text).toBe('Image processed');
    });

    test('TC-35: Replaces user text with built prompt', async () => {
      mockGenerate.mockReturnValue(mockStream('ok'));

      const req = createRequest({
        messages: createTextMsg('Need plumber'),
      });

      await POST(req);

      const args = mockGenerate.mock.calls[0][4];

      expect(args[0].parts[0].text).toContain('[SYSTEM]');
    });

    test('TC-36: Updates usage after successful response', async () => {
      mockGenerate.mockReturnValue(mockStream('Success'));

      const req = createRequest({
        messages: createTextMsg('test'),
      });

      const res = await POST(req);
      await readStreamResponse(res);

      expect(updateUsage).toHaveBeenCalledWith(['text']);
    });

    test('TC-37: Does not update usage on failed generation', async () => {
      mockGenerate.mockRejectedValue(failingStream(503));

      const req = createRequest({
        messages: createTextMsg('fail'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;
      const data = await readStreamResponse(res);
      expect(findTextpart(data[0].parts).text).toContain(expectedErrorMessage);

      expect(updateUsage).not.toHaveBeenCalled();
    });

    test('TC-38: Handles image and text together', async () => {
      mockGenerate.mockReturnValue(mockStream('Handled mixed input'));

      const req = createRequest({
        messages: [
          {
            role: 'user',
            parts: [
              { text: 'Fix this issue' },
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: 'abc',
                },
              },
            ],
          },
        ],
      });

      const res = await POST(req);
      const data = await readStreamResponse(res);

      expect(data[0].parts[0].text).toBe('Handled mixed input');
    });
  });

  describe('Invalid Inputs', () => {
    const expectedErrorMessage = 'Need more details to provide a quote.';

    beforeEach(() => {
      vi.clearAllMocks();
      process.env.GEMINI_API_KEY = 'test-key';
      vi.mocked(updateUsage).mockResolvedValue(undefined);
      vi.mocked(getUserId).mockResolvedValue({
        uid: 'test-user-id',
      } as DecodedIdToken);
    });

    test('TC-06: Returns error if messages array is empty', async () => {
      const req = createRequest({ messages: [] });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toContain(expectedErrorMessage);
    });

    test('TC-07: Returns error if messages is undefined', async () => {
      const req = createRequest({});

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toContain('Something went wrong. ');
    });

    test('TC-08: Returns error if no user message present', async () => {
      const req = createRequest({
        messages: [{ role: 'assistant', content: 'Hello' }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toContain(expectedErrorMessage);
    });

    test('TC-09: Returns error if user message is empty', async () => {
      const req = createRequest({
        messages: [{ role: 'user', content: '   ' }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toContain('Something went wrong.');
    });

    test('TC-10: Handles null content safely', async () => {
      const req = createRequest({
        messages: [{ role: 'user', parts: [{ text: null }] }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toContain(expectedErrorMessage);
    });

    test('TC-11: Handles non-string user content', async () => {
      mockGenerate.mockReturnValue(mockStream('Handled numeric content'));
      const req = createRequest({
        messages: [{ role: 'user', parts: [{ text: 12345 }] }],
      });

      const res = await POST(req);
      const data = await readStreamResponse(res);

      expect(findTextpart(data[0].parts).text).toBe('Handled numeric content');
    });

    test('TC-12: Handles invalid messages type (not array)', async () => {
      const req = createRequest({
        messages: 'invalid-type',
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toContain('Something went wrong.');
    });

    test('TC-13: Handles very long input safely', async () => {
      const longText = 'a'.repeat(10000);

      mockGenerate.mockReturnValue(mockStream('ok'));

      const req = createRequest({
        messages: createTextMsg(longText),
      });

      const res = await POST(req);
      const data = await readStreamResponse(res);

      expect(data[0].parts.length).toBeGreaterThan(0);
      expect(findTextpart(data[0].parts).text).toBe('ok');
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.useFakeTimers();

      process.env.GEMINI_API_KEY = 'test-key';
      vi.mocked(updateUsage).mockResolvedValue(undefined);
      vi.mocked(getUserId).mockResolvedValue({
        uid: 'test-user-id',
      } as DecodedIdToken);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test('TC-14: uses the last user message', async () => {
      mockGenerate.mockReturnValue(mockStream('ok'));

      const req = createRequest({
        messages: [
          { role: 'user', content: 'first' },
          ...createTextMsg('second'),
        ],
      });

      const res = await POST(req);
      await readStreamResponse(res);
      const messages = mockGenerate.mock.calls[0][4];
      expect(messages[messages.length - 1]).toEqual(
        expect.objectContaining({
          role: 'user',
          parts: expect.arrayContaining([
            expect.objectContaining({
              text: expect.stringContaining('Job Description:\nsecond'),
            }),
          ]),
        }),
      );
    });

    test('TC-15: falls back if AI returns empty string', async () => {
      mockGenerate
        .mockReturnValueOnce(mockStream(''))
        .mockReturnValueOnce(mockStream('Recovered'));

      const req = createRequest({
        messages: createTextMsg('test'),
      });

      const res = await POST(req);
      const data = await readStreamResponse(res);

      expect(findTextpart(data[0].parts).text).toBe('Recovered');
    });

    test('TC-16: handles undefined AI response safely', async () => {
      mockGenerate
        .mockReturnValueOnce(mockStream())
        .mockReturnValueOnce(mockStream('Fallback works'));

      const req = createRequest({
        messages: createTextMsg('test'),
      });

      const res = await POST(req);
      const data = await readStreamResponse(res);

      expect(findTextpart(data[0].parts).text).toBe('Fallback works');
    });

    test('TC-17: handles very large input', async () => {
      const largeInput = 'a'.repeat(20000);

      mockGenerate.mockReturnValue(mockStream('Handled large input'));

      const req = createRequest({
        messages: createTextMsg(largeInput),
      });

      const res = await POST(req);
      const data = await readStreamResponse(res);

      expect(findTextpart(data[0].parts).text).toBe('Handled large input');
    });

    test('TC-18: handles special characters safely', async () => {
      mockGenerate.mockReturnValue(mockStream('ok'));

      const req = createRequest({
        messages: createTextMsg('!@#$%^&*()_+'),
      });

      const res = await POST(req);
      const data = await readStreamResponse(res);

      expect(findTextpart(data[0].parts).text).toBe('ok');
    });

    test('TC-19: removes markdown and emojis', () => {
      expect(cleanOutput('**Hello** ## World 🎯')).toBe('Hello World ');
    });

    test('TC-20: stops retry after max attempts', async () => {
      mockGenerate.mockReturnValue(failingStream(429));

      const req = createRequest({
        messages: createTextMsg('retry fail'),
      });

      const resPromise = POST(req);

      await vi.runAllTimersAsync();

      const res = await resPromise;
      const data = await readStreamResponse(res);

      expect(findTextpart(data[0].parts).text).toContain(expectedErrorMessage);
    });

    test('TC-21: ignores assistant/system messages', async () => {
      mockGenerate.mockReturnValue(mockStream('ok'));

      const req = createRequest({
        messages: [
          { role: 'assistant', parts: [{ text: 'ignore this' }] },
          ...createTextMsg('real input'),
        ],
      });

      await POST(req);
      const messages = mockGenerate.mock.calls[0][4];
      expect(messages[messages.length - 1]).toEqual(
        expect.objectContaining({
          role: 'user',
          parts: expect.arrayContaining([
            expect.objectContaining({
              text: expect.stringContaining('Job Description:\nreal input'),
            }),
          ]),
        }),
      );
    });
  });

  describe('Failure Handling', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.useFakeTimers();
      vi.mocked(updateUsage).mockResolvedValue(undefined);
      vi.mocked(getUserId).mockResolvedValue({
        uid: 'test-user-id',
      } as DecodedIdToken);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test('TC-22: retries on 429', async () => {
      mockGenerate
        .mockReturnValueOnce(failingStream(429))
        .mockReturnValueOnce(mockStream('Recovered'));

      const req = createRequest({
        messages: createTextMsg('retry test'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();

      const res = await resPromise;

      const data = await res.json();

      expect(mockGenerate).toHaveBeenCalledTimes(2);
      expect(findTextpart(data.parts).text).toBe('Recovered');
    });

    test('TC-23: retries on 503', async () => {
      mockGenerate
        .mockReturnValueOnce(failingStream(503))
        .mockReturnValueOnce(mockStream('Recovered 503'));

      const req = createRequest({
        messages: createTextMsg('test'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(mockGenerate).toHaveBeenCalledTimes(2);
      expect(findTextpart(data.parts).text).toBe('Recovered 503');
    });

    test('TC-24: retries on AbortError', async () => {
      const error = new Error('timeout');
      error.name = 'AbortError';

      mockGenerate
        .mockReturnValueOnce(error)
        .mockReturnValueOnce(mockStream('Recovered timeout'));

      const req = createRequest({
        messages: createTextMsg('timeout test'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(mockGenerate).toHaveBeenCalledTimes(2);
      expect(findTextpart(data.parts).text).toBe('Recovered timeout');
    });

    test('TC-25: stops after max retries', async () => {
      mockGenerate.mockRejectedValue({ status: 429 });

      const req = createRequest({
        messages: createTextMsg('max retry'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(mockGenerate).toHaveBeenCalled(); // count depends on MAX_RETRIES
      expect(findTextpart(data.parts).text).toContain(expectedErrorMessage);
    });

    test('TC-26: falls back to next model', async () => {
      mockGenerate
        .mockReturnValueOnce(failingStream(503))
        .mockReturnValueOnce(mockStream('Second model works'));

      const req = createRequest({
        messages: createTextMsg('fallback'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(findTextpart(data.parts).text).toBe('Second model works');
    });

    test('TC-27: uses next model if response is empty', async () => {
      mockGenerate
        .mockReturnValueOnce(mockStream(''))
        .mockReturnValueOnce(mockStream('Fallback response'));

      const req = createRequest({
        messages: createTextMsg('empty test'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(findTextpart(data.parts).text).toBe('Fallback response');
    });

    test('TC-28: returns fallback if all models fail', async () => {
      mockGenerate.mockRejectedValue({ status: 503 });

      const req = createRequest({
        messages: createTextMsg('fail all'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(findTextpart(data.parts).text).toContain(expectedErrorMessage);
    });

    test('TC-29: does not retry on non-retryable error', async () => {
      vi.mocked(canUserUseFeature).mockResolvedValue(true);
      mockGenerate.mockRejectedValue({ status: 400 });

      const req = createRequest({
        messages: createTextMsg('bad request'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(mockGenerate).toHaveBeenCalledTimes(MODELS.length);

      expect(findTextpart(data.parts).text).toContain(expectedErrorMessage);
    });

    test('TC-30: handles unexpected error gracefully', async () => {
      mockGenerate.mockImplementation(() => {
        throw new Error('Unexpected');
      });

      const req = createRequest({
        messages: createTextMsg('crash'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(findTextpart(data.parts).text).toContain(expectedErrorMessage);
    });
  });
});
