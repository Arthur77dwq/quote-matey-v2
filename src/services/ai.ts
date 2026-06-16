import { MODELS } from '@/constant/ai';
import { GoogleAI, OpenAIGenAI } from '@/lib/ai/ai';
import { serverLogger } from '@/lib/logger';
import { ApiError, Message } from '@/types/chat';

export const maxDuration = 60;

const RETRY_DELAY = 1500;
const MAX_RETRIES = 2;

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
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

type StreamChunk = {
  text?: string;
};

// Handle single model with retry
async function* generateWithRetry(
  ai: GoogleAI | OpenAIGenAI,
  model: string,
  maxOutputTokens: number,
  abortTimeout: number,
  temperature: number,
  messages: Message[],
): AsyncGenerator<StreamChunk, null> {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      yield* ai.generate(
        model,
        maxOutputTokens,
        abortTimeout,
        temperature,
        messages,
      );
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

function getModel() {
  return [...MODELS].sort((a, b) => a.priority - b.priority);
}

const aiInstances = new Map<string, GoogleAI | OpenAIGenAI>();

function getAI(compatibility: string) {
  const existing = aiInstances.get(compatibility);

  if (existing) {
    return existing;
  }

  let ai: GoogleAI | OpenAIGenAI;

  switch (compatibility) {
    case 'google':
      ai = new GoogleAI();
      break;

    case 'openai':
      ai = new OpenAIGenAI();
      break;

    default:
      serverLogger.error('No compatible AI model found.');
      throw new Error('No compatible AI model found.');
  }

  aiInstances.set(compatibility, ai);

  return ai;
}

// Try all models
async function* tryModels(messages: Message[]): AsyncGenerator<StreamChunk> {
  for (const {
    // priority,
    // id,
    model,
    maxOutputTokens,
    temperature,
    abortTimeout,
    compatibility,
  } of getModel()) {
    const ai = getAI(compatibility);

    const stream = generateWithRetry(
      ai,
      model,
      maxOutputTokens,
      abortTimeout,
      temperature,
      messages,
    );

    const chunks: StreamChunk[] = [];
    let hasText = false;

    for await (const chunk of stream) {
      chunks.push(chunk);

      if (chunk.text?.trim()) {
        hasText = true;
      }
    }

    if (hasText) {
      yield* chunks;
      break;
    }
  }
}

export async function* QuoteAI(messages: Message[]) {
  yield* tryModels(messages);
}
