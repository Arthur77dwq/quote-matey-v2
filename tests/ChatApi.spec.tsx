import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { extractUserMessage, POST } from '@/app/api/chat/route';
import { Message } from '@/types/chat';

describe('Chat API', () => {
  describe('Core Functionality', () => {
    test('TC-01: Should extract user message.', () => {
      const mockMessages: Message[] = [
        { role: 'user', content: 'leaking tap' },
      ];
      const userMessage = extractUserMessage(mockMessages);
      expect(userMessage).toBe('leaking tap');
    });
    test('TC-02: Should fetch api key from environment variables.', () => {});
    test('TC-03: Should build prompt which contains user message.', () => {});
    test('TC-04: Should call ai model to generate quote.', () => {});
    test('TC-05: Should provide response.', () => {});
  });

  describe('Invalid Inputs', () => {
    const expectedErrorMessage = 'Need more details to provide a quote.';

    beforeEach(() => {
      vi.clearAllMocks();
      process.env.GEMINI_API_KEY = 'test-key';
    });

    function createRequest<T>(body: T): NextRequest {
      return {
        json: async () => body,
      } as unknown as NextRequest;
    }

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

  //   describe('Edge Cases', () => {});

  //   describe('Failure Handling', () => {});

  //   describe('Security', () => {});
});
