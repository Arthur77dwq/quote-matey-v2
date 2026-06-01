import type { DecodedIdToken } from 'firebase-admin/auth';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
const mockGenerate = vi.fn();

vi.mock('@google/genai', () => {
  class MockGoogleGenAI {
    models = {
      generateContent: mockGenerate,
    };
  }

  return { GoogleGenAI: MockGoogleGenAI };
});

vi.mock('@/constant/ai', () => ({
  MODELS: [
    { model: 'model-1', maxOutputTokens: 1000 },
    { model: 'model-2', maxOutputTokens: 1000 },
  ],
  SYSTEM_PROMPTS: {
    text: 'test prompt',
    image: 'test image prompt',
  },
}));

import { NextRequest } from 'next/server';

import { buildPrompt, extractCurrectMessage, POST } from '@/app/api/chat/route';
import { getApiKey } from '@/services/ai';
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
import { canUserUseFeature } from '@/services/access';
import { updateUsage } from '@/services/usage';

describe('Chat API', () => {
  const expectedErrorMessage = 'High demand';
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

    test('TC-02: Should fetch api key from environment variables.', () => {
      process.env.GEMINI_API_KEY = 'primary-key';

      const key = getApiKey();

      expect(key).toBe('primary-key');
    });

    test('TC-03: Should build prompt which contains user message.', () => {
      const prompt = buildPrompt('Fix AC', false);

      expect(prompt).toContain('Fix AC');
      expect(prompt).toContain('[SYSTEM]');
      expect(prompt).toContain('[INPUT START]');
    });

    test('TC-04: Should call ai model to generate quote.', async () => {
      mockGenerate.mockResolvedValue({ text: 'Quote generated' });

      const req = createRequest({
        messages: createTextMsg('Need plumbing work'),
      });

      await POST(req);

      expect(mockGenerate).toHaveBeenCalledTimes(1);

      const args = mockGenerate.mock.calls[0][0];

      expect(args).toHaveProperty('model');
      expect(args).toHaveProperty('contents');
    });

    test('TC-05: Should provide response.', async () => {
      mockGenerate.mockResolvedValue({ text: 'Final quote' });

      const req = createRequest({
        messages: createTextMsg('Need electrician'),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toBe('Final quote');
    });

    test('TC-31: Should use backup api key if primary missing', () => {
      process.env.GEMINI_API_KEY = '';
      process.env.GEMINI_API_KEY_BACKUP = 'backup-key';

      expect(getApiKey()).toBe('backup-key');
    });

    test('TC-32: Returns error if no api key available', async () => {
      process.env.GEMINI_API_KEY = '';
      process.env.GEMINI_API_KEY_BACKUP = '';

      const req = createRequest({
        messages: createTextMsg('test'),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toContain('Something went wrong');
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
      mockGenerate.mockResolvedValue({ text: 'Image processed' });

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
      const data = await res.json();

      expect(data.parts[0].text).toBe('Image processed');
    });

    test('TC-35: Replaces user text with built prompt', async () => {
      mockGenerate.mockResolvedValue({ text: 'ok' });

      const req = createRequest({
        messages: createTextMsg('Need plumber'),
      });

      await POST(req);

      const args = mockGenerate.mock.calls[0][0];

      expect(args.contents[0].parts[0].text).toContain('[SYSTEM]');
    });

    test('TC-36: Updates usage after successful response', async () => {
      mockGenerate.mockResolvedValue({ text: 'Success' });

      const req = createRequest({
        messages: createTextMsg('test'),
      });

      await POST(req);

      expect(updateUsage).toHaveBeenCalledWith(['text']);
    });

    test('TC-37: Does not update usage on failed generation', async () => {
      mockGenerate.mockRejectedValue({ status: 503 });

      const req = createRequest({
        messages: createTextMsg('fail'),
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      await resPromise;

      expect(updateUsage).not.toHaveBeenCalled();
    });

    test('TC-38: Handles image and text together', async () => {
      mockGenerate.mockResolvedValue({ text: 'Handled mixed input' });

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
      const data = await res.json();

      expect(data.parts[0].text).toBe('Handled mixed input');
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
      mockGenerate.mockResolvedValue({
        text: 'Handled numeric content',
      });
      const req = createRequest({
        messages: [{ role: 'user', parts: [{ text: 12345 }] }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toBe('Handled numeric content');
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

      mockGenerate.mockResolvedValue({
        text: 'ok',
      });

      const req = createRequest({
        messages: createTextMsg(longText),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.parts.length).toBeGreaterThan(0);
      expect(findTextpart(data.parts).text).toBe('ok');
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
      mockGenerate.mockResolvedValue({ text: 'ok' });

      const req = createRequest({
        messages: [
          { role: 'user', content: 'first' },
          ...createTextMsg('second'),
        ],
      });

      await POST(req);

      expect(mockGenerate).toHaveBeenCalledWith(
        expect.objectContaining({
          contents: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              parts: expect.arrayContaining([
                expect.objectContaining({
                  text: expect.stringContaining('second'),
                }),
              ]),
            }),
          ]),
        }),
      );
    });

    test('TC-15: falls back if AI returns empty string', async () => {
      mockGenerate
        .mockResolvedValueOnce({ text: '' })
        .mockResolvedValueOnce({ text: 'Recovered' });

      const req = createRequest({
        messages: createTextMsg('test'),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toBe('Recovered');
    });

    test('TC-16: handles undefined AI response safely', async () => {
      mockGenerate
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({ text: 'Fallback works' });

      const req = createRequest({
        messages: createTextMsg('test'),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toBe('Fallback works');
    });

    test('TC-17: handles very large input', async () => {
      const largeInput = 'a'.repeat(20000);

      mockGenerate.mockResolvedValue({ text: 'Handled large input' });

      const req = createRequest({
        messages: createTextMsg(largeInput),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toBe('Handled large input');
    });

    test('TC-18: handles special characters safely', async () => {
      mockGenerate.mockResolvedValue({ text: 'ok' });

      const req = createRequest({
        messages: createTextMsg('!@#$%^&*()_+'),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toBe('ok');
    });

    test('TC-19: cleans markdown and emojis from output', async () => {
      mockGenerate.mockResolvedValue({
        text: '**Hello** ## World 🎯',
      });

      const req = createRequest({
        messages: createTextMsg('test'),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(findTextpart(data.parts).text).toBe('Hello  World');
    });

    test('TC-20: stops retry after max attempts', async () => {
      mockGenerate.mockRejectedValue({ status: 429 });

      const req = createRequest({
        messages: createTextMsg('retry fail'),
      });

      const resPromise = POST(req);

      await vi.runAllTimersAsync();

      const res = await resPromise;
      const data = await res.json();

      expect(findTextpart(data.parts).text).toContain(expectedErrorMessage);
    });

    test('TC-21: ignores assistant/system messages', async () => {
      mockGenerate.mockResolvedValue({ text: 'ok' });

      const req = createRequest({
        messages: [
          { role: 'assistant', parts: [{ text: 'ignore this' }] },
          ...createTextMsg('real input'),
        ],
      });

      await POST(req);

      expect(mockGenerate).toHaveBeenCalledWith(
        expect.objectContaining({
          contents: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              parts: expect.arrayContaining([
                expect.objectContaining({
                  text: expect.stringContaining('real input'),
                }),
              ]),
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
        .mockRejectedValueOnce({ status: 429 })
        .mockResolvedValueOnce({ text: 'Recovered' });

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
        .mockRejectedValueOnce({ status: 503 })
        .mockResolvedValueOnce({ text: 'Recovered 503' });

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
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({ text: 'Recovered timeout' });

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
        .mockRejectedValueOnce({ status: 503 })
        .mockResolvedValueOnce({ text: 'Second model works' });

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
        .mockResolvedValueOnce({ text: '' })
        .mockResolvedValueOnce({ text: 'Fallback response' });

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

      expect(findTextpart(data.parts).text).toContain('High demand right now.');
    });
  });
});
