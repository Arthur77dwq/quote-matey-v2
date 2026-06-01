import { GoogleGenAI } from '@google/genai';

import { MODELS } from '@/constant/ai';
import { OpenAIGenAI } from '@/lib/nurric/ai';
import { ApiError, Message } from '@/types/chat';

export const maxDuration = 60;

const RETRY_DELAY = 1500;
const MAX_RETRIES = 2;

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function cleanOutput(text?: string) {
  return text
    ?.replace(/\*\*/g, '')
    .replace(/#{2,}/g, '')
    .replace(/🎯|✅|🔥/g, '')
    .trim();
}

export function getApiKey(): string | null {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (key && key !== 'false' && key !== 'undefined') return key;

  const backupKey = process.env.GEMINI_API_KEY_BACKUP?.trim();
  if (backupKey && backupKey !== 'false' && backupKey !== 'undefined')
    return backupKey;

  return null;
}

function hasStatus(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

function isRetryable(error: unknown) {
  if (hasStatus(error)) {
    return error.status === 429 || error.status === 503;
  }
  return error instanceof Error && error.name === 'AbortError';
}

// Handle single model with retry
async function generateWithRetry(
  ai: GoogleGenAI,
  model: string,
  maxOutputTokens: number,
  messages: Message[],
): Promise<string | null> {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: messages,
        config: {
          temperature: 0.7,
          maxOutputTokens,
          abortSignal: AbortSignal.timeout(30000),
        },
      });

      const text = cleanOutput(response?.text);
      if (text) return text;

      return null; // empty > try next model
    } catch (error) {
      if (!isRetryable(error)) return null;

      attempt++;
      if (attempt > MAX_RETRIES) return null;

      await sleep(RETRY_DELAY * attempt);
    }
  }

  return null;
}

// Try all models
async function tryModels(
  ai: GoogleGenAI,
  messages: Message[],
): Promise<string | null> {
  for (const { model, maxOutputTokens } of MODELS) {
    const result = await generateWithRetry(
      ai,
      model,
      maxOutputTokens,
      messages,
    );

    if (result) return result;
  }

  return null;
}

export async function quoteMateyAi(message: Message[]) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      role: 'assistant',
      parts: [
        {
          text: 'Something went wrong, Try again after some time.',
        },
      ],
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  return await tryModels(ai, message);
}

export async function* nurricAi(message: Message[]) {
  try {
    const ai = new OpenAIGenAI({
      model: 'gpt-3.5-turbo',
      stream: true,
      max_tokens: 1024,
    });

    for await (const chunk of ai.generate(message)) {
      yield chunk;
    }
  } catch {
    // } catch (ValueNotFound) {
    yield {
      text: 'Something went wrong, Try again after some time.',
    };
  }
}
