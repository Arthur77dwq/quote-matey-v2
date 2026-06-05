import { GoogleGenAI } from '@google/genai';
import { OpenAI } from 'openai';
import type {
  ChatCompletionAssistantMessageParam,
  ChatCompletionContentPart,
  ChatCompletionMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/chat/completions';

import { Message, TextPart } from '@/types/chat';

import { cleanOutput } from '../utils';

export class ValueNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValueNotFound';
  }
}

export class OpenAIGenAI {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.NURRIC_API_KEY?.trim();
    const baseURL = process.env.NURRIC_BASE_URL?.trim();

    if (!apiKey || apiKey === 'false' || apiKey === 'undefined') {
      throw new ValueNotFound(
        'Nurric API key is not set in environment variables.',
      );
    }

    if (!baseURL || baseURL === 'false' || baseURL === 'undefined') {
      throw new ValueNotFound(
        'Nurric base URL is not set in environment variables.',
      );
    }

    this.client = new OpenAI({ apiKey, baseURL });
  }

  private parseMessages(messages: Message[]): ChatCompletionMessageParam[] {
    return messages.map((msg): ChatCompletionMessageParam => {
      if (msg.role === 'model' || msg.role === 'assistant') {
        return {
          role: 'assistant',
          content: msg.parts
            .filter((part): part is TextPart => 'text' in part)
            .map((part) => part.text)
            .join('\n'),
        } satisfies ChatCompletionAssistantMessageParam;
      }

      // User message
      const content: ChatCompletionContentPart[] = msg.parts.map((part) => {
        if ('text' in part) {
          return {
            type: 'text',
            text: part.text,
          };
        }

        return {
          type: 'image_url',
          image_url: {
            url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
          },
        };
      });

      return {
        role: 'user',
        content,
      } satisfies ChatCompletionUserMessageParam;
    });
  }

  public async *generate(
    model: string,
    maxOutputTokens: number,
    abortTimeout: number,
    temperature: number,
    messages: Message[],
  ) {
    const stream = await this.client.chat.completions.create(
      {
        model,
        max_tokens: maxOutputTokens,
        temperature,
        messages: await this.parseMessages(messages),
        stream: true,
      },
      {
        signal: AbortSignal.timeout(abortTimeout),
      },
    );

    for await (const chunk of stream) {
      if (
        chunk.choices &&
        chunk.choices[0]?.delta &&
        chunk.choices[0].delta?.content
      ) {
        yield {
          text: cleanOutput(chunk.choices[0]?.delta?.content),
        };
      }
    }
  }
}

export class GoogleAI {
  private client: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY?.trim() || '';

    if (!apiKey || apiKey === 'false' || apiKey === 'undefined') {
      throw new ValueNotFound(
        'Gemini API key is not set in environment variables.',
      );
    }
    this.client = new GoogleGenAI({ apiKey });
  }

  public async *generate(
    model: string,
    maxOutputTokens: number,
    abortTimeout: number,
    temperature: number,
    messages: Message[],
  ) {
    const stream = await this.client.models.generateContentStream({
      model,
      contents: messages,
      config: {
        temperature,
        maxOutputTokens,
        abortSignal: AbortSignal.timeout(abortTimeout),
      },
    });

    for await (const response of stream) {
      const text = cleanOutput(response?.text);
      if (text) yield { text };
    }
  }
}
