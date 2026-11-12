import { Message } from '@/types/chat';

import { Api } from './api';

export async function Chat({
  messages,
}: {
  messages: Message;
}): Promise<Message> {
  try {
    const { body } = await Api('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [messages],
      }),
    });

    if (body !== null) {
      const reader = body.getReader();
      const decoder = new TextDecoder();

      let buffer = '';
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, {
          stream: true,
        });

        const lines = buffer.split('\n');

        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.trim()) continue;

          const data = JSON.parse(line);
          if (data) accumulatedText += data.parts[0].text;

          if (accumulatedText) {
            return {
              id: data.id,
              role: data.role,
              parts: [
                {
                  text: accumulatedText,
                },
              ],
            };
          }
        }
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      let errorMessage: Message = {
        ...JSON.parse((error as Error).message),
      };

      if (error.message.includes('Failed to fetch')) {
        errorMessage = {
          role: 'assistant',
          parts: [
            {
              text: 'Network error. Please check your connection and try again.',
            },
          ],
        };
      }
      return errorMessage;
    }
  }

  return {
    role: 'assistant',
    parts: [
      {
        text: '❌ Something went wrong. Please try again.',
      },
    ],
  };
}
