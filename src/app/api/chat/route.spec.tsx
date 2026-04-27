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
  SYSTEM_PROMPT: 'test',
}));

import { NextRequest } from 'next/server';

import {
  buildPrompt,
  extractUserMessage,
  getApiKey,
  POST,
} from '@/app/api/chat/route';
import { Message } from '@/types/chat';

function createRequest<T>(body: T): NextRequest {
  return {
    json: async () => body,
  } as unknown as NextRequest;
}

describe('Chat API', () => {
  const expectedErrorMessage = 'High demand';
  describe('Core Functionality', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      process.env.GEMINI_API_KEY = 'test-key';
    });

    test('TC-01: Should extract user message.', () => {
      const mockMessages: Message[] = [
        { role: 'user', content: 'leaking tap' },
      ];

      const userMessage = extractUserMessage(mockMessages);

      expect(userMessage).toBe('leaking tap');
    });

    test('TC-02: Should fetch api key from environment variables.', () => {
      process.env.GEMINI_API_KEY = 'primary-key';

      const key = getApiKey();

      expect(key).toBe('primary-key');
    });

    test('TC-03: Should build prompt which contains user message.', () => {
      const prompt = buildPrompt('Fix AC');

      expect(prompt).toContain('Fix AC');
      expect(prompt).toContain('[SYSTEM]');
      expect(prompt).toContain('[INPUT START]');
    });

    test('TC-04: Should call ai model to generate quote.', async () => {
      mockGenerate.mockResolvedValue({ text: 'Quote generated' });

      const req = createRequest({
        messages: [{ role: 'user', content: 'Need plumbing work' }],
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
        messages: [{ role: 'user', content: 'Need electrician' }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toBe('Final quote');
    });
  });

  describe('Invalid Inputs', () => {
    const expectedErrorMessage = 'Need more details to provide a quote.';

    beforeEach(() => {
      vi.clearAllMocks();
      process.env.GEMINI_API_KEY = 'test-key';
    });

    test('TC-06: Returns error if messages array is empty', async () => {
      const req = createRequest({ messages: [] });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toContain(expectedErrorMessage);
    });

    test('TC-07: Returns error if messages is undefined', async () => {
      const req = createRequest({});

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toContain(expectedErrorMessage);
    });

    test('TC-08: Returns error if no user message present', async () => {
      const req = createRequest({
        messages: [{ role: 'assistant', content: 'Hello' }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toContain(expectedErrorMessage);
    });

    test('TC-09: Returns error if user message is empty', async () => {
      const req = createRequest({
        messages: [{ role: 'user', content: '   ' }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toContain(expectedErrorMessage);
    });

    test('TC-10: Handles null content safely', async () => {
      const req = createRequest({
        messages: [{ role: 'user', content: null }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toContain(expectedErrorMessage);
    });

    test('TC-11: Handles non-string user content', async () => {
      const req = createRequest({
        messages: [{ role: 'user', content: 12345 }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toContain('Something went wrong.');
    });

    test('TC-12: Handles invalid messages type (not array)', async () => {
      const req = createRequest({
        messages: 'invalid-type',
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toContain('Something went wrong.');
    });

    test('TC-13: Handles very long input safely', async () => {
      const longText = 'a'.repeat(10000);

      const req = createRequest({
        messages: [{ role: 'user', content: longText }],
      });

      const res = await POST(req);
      const data = await res.json();

      // Should not crash; response should exist
      expect(data).toHaveProperty('content');
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.useFakeTimers();

      process.env.GEMINI_API_KEY = 'test-key';
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test('TC-14: uses the last user message', async () => {
      mockGenerate.mockResolvedValue({ text: 'ok' });

      const req = createRequest({
        messages: [
          { role: 'user', content: 'first' },
          { role: 'user', content: 'second' },
        ],
      });

      await POST(req);

      expect(mockGenerate).toHaveBeenCalledWith(
        expect.objectContaining({
          contents: expect.stringContaining('second'),
        }),
      );
    });

    test('TC-15: falls back if AI returns empty string', async () => {
      mockGenerate
        .mockResolvedValueOnce({ text: '' })
        .mockResolvedValueOnce({ text: 'Recovered' });

      const req = createRequest({
        messages: [{ role: 'user', content: 'test' }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toBe('Recovered');
    });

    test('TC-16: handles undefined AI response safely', async () => {
      mockGenerate
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({ text: 'Fallback works' });

      const req = createRequest({
        messages: [{ role: 'user', content: 'test' }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toBe('Fallback works');
    });

    test('TC-17: handles very large input', async () => {
      const largeInput = 'a'.repeat(20000);

      mockGenerate.mockResolvedValue({ text: 'Handled large input' });

      const req = createRequest({
        messages: [{ role: 'user', content: largeInput }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toBe('Handled large input');
    });

    test('TC-18: handles special characters safely', async () => {
      mockGenerate.mockResolvedValue({ text: 'ok' });

      const req = createRequest({
        messages: [{ role: 'user', content: '!@#$%^&*()_+' }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toBe('ok');
    });

    test('TC-19: cleans markdown and emojis from output', async () => {
      mockGenerate.mockResolvedValue({
        text: '**Hello** ## World 🎯',
      });

      const req = createRequest({
        messages: [{ role: 'user', content: 'test' }],
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.content).toBe('Hello  World');
    });

    test('TC-20: stops retry after max attempts', async () => {
      mockGenerate.mockRejectedValue({ status: 429 });

      const req = createRequest({
        messages: [{ role: 'user', content: 'retry fail' }],
      });

      const resPromise = POST(req);

      await vi.runAllTimersAsync();

      const res = await resPromise;
      const data = await res.json();

      expect(data.content).toContain(expectedErrorMessage);
    });

    test('TC-21: ignores assistant/system messages', async () => {
      mockGenerate.mockResolvedValue({ text: 'ok' });

      const req = createRequest({
        messages: [
          { role: 'assistant', content: 'ignore this' },
          { role: 'user', content: 'real input' },
        ],
      });

      await POST(req);

      expect(mockGenerate).toHaveBeenCalledWith(
        expect.objectContaining({
          contents: expect.stringContaining('real input'),
        }),
      );
    });
  });

  describe('Failure Handling', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test('TC-22: retries on 429', async () => {
      mockGenerate
        .mockRejectedValueOnce({ status: 429 })
        .mockResolvedValueOnce({ text: 'Recovered' });

      const req = createRequest({
        messages: [{ role: 'user', content: 'retry test' }],
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();

      const res = await resPromise;

      const data = await res.json();

      expect(mockGenerate).toHaveBeenCalledTimes(2);
      expect(data.content).toBe('Recovered');
    });

    test('TC-23: retries on 503', async () => {
      mockGenerate
        .mockRejectedValueOnce({ status: 503 })
        .mockResolvedValueOnce({ text: 'Recovered 503' });

      const req = createRequest({
        messages: [{ role: 'user', content: 'test' }],
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(mockGenerate).toHaveBeenCalledTimes(2);
      expect(data.content).toBe('Recovered 503');
    });

    test('TC-24: retries on AbortError', async () => {
      const error = new Error('timeout');
      error.name = 'AbortError';

      mockGenerate
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({ text: 'Recovered timeout' });

      const req = createRequest({
        messages: [{ role: 'user', content: 'timeout test' }],
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(mockGenerate).toHaveBeenCalledTimes(2);
      expect(data.content).toBe('Recovered timeout');
    });

    test('TC-25: stops after max retries', async () => {
      mockGenerate.mockRejectedValue({ status: 429 });

      const req = createRequest({
        messages: [{ role: 'user', content: 'max retry' }],
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(mockGenerate).toHaveBeenCalled(); // count depends on MAX_RETRIES
      expect(data.content).toContain(expectedErrorMessage);
    });

    test('TC-26: falls back to next model', async () => {
      mockGenerate
        .mockRejectedValueOnce({ status: 503 })
        .mockResolvedValueOnce({ text: 'Second model works' });

      const req = createRequest({
        messages: [{ role: 'user', content: 'fallback' }],
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(data.content).toBe('Second model works');
    });

    test('TC-27: uses next model if response is empty', async () => {
      mockGenerate
        .mockResolvedValueOnce({ text: '' })
        .mockResolvedValueOnce({ text: 'Fallback response' });

      const req = createRequest({
        messages: [{ role: 'user', content: 'empty test' }],
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(data.content).toBe('Fallback response');
    });

    test('TC-28: returns fallback if all models fail', async () => {
      mockGenerate.mockRejectedValue({ status: 503 });

      const req = createRequest({
        messages: [{ role: 'user', content: 'fail all' }],
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(data.content).toContain(expectedErrorMessage);
    });

    test('TC-29: does not retry on non-retryable error', async () => {
      mockGenerate.mockRejectedValue({ status: 400 });

      const req = createRequest({
        messages: [{ role: 'user', content: 'bad request' }],
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(mockGenerate).toHaveBeenCalledTimes(2);
      expect(data.content).toContain(expectedErrorMessage);
    });

    test('TC-30: handles unexpected error gracefully', async () => {
      mockGenerate.mockImplementation(() => {
        throw new Error('Unexpected');
      });

      const req = createRequest({
        messages: [{ role: 'user', content: 'crash' }],
      });

      const resPromise = POST(req);
      await vi.runAllTimersAsync();
      const res = await resPromise;

      const data = await res.json();

      expect(data.content).toContain('High demand right now');
    });
  });
});
