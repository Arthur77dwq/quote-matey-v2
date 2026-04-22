import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

import { MODELS, SYSTEM_PROMPT } from '@/constant/ai';
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

function getApiKey(): string | null {
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

  if (error instanceof Error) {
    return error.name === 'AbortError'; // timeout
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const userMessage =
      messages
        ?.filter((m: Message) => m.role === 'user')
        .pop()
        ?.content?.trim() || '';

    if (!userMessage) {
      return NextResponse.json({
        content: 'Need more details to provide a quote.',
      });
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      return NextResponse.json({
        content: 'No API key available',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const finalPrompt = `${SYSTEM_PROMPT}

Job description:
${userMessage}`;

    for (const { model, maxOutputTokens } of MODELS) {
      let attempt = 0;

      while (attempt <= MAX_RETRIES) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: finalPrompt,
            config: {
              temperature: 0.7,
              maxOutputTokens,
              abortSignal: AbortSignal.timeout(30000),
            },
          });

          const text = cleanOutput(response?.text);

          if (text && text.length > 0) {
            return NextResponse.json({ content: text });
          }

          // empty response > try next model
          break;
        } catch (error) {
          if (!isRetryable(error)) {
            break; // move to next model
          }

          attempt++;

          if (attempt > MAX_RETRIES) break;

          await sleep(RETRY_DELAY * attempt);
        }
      }
    }

    return NextResponse.json({
      content: '⚠️ High demand right now. Try again in a few seconds.',
    });
  } catch {
    return NextResponse.json({
      content: '❌ Something went wrong. Please try again.',
    });
  }
}
