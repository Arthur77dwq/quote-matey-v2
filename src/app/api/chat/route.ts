import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

import { MODELS,SYSTEM_PROMPT } from '@/constant/ai';
import { ApiError, Message } from '@/types/chat';

export const maxDuration = 60;

function cleanOutput(text: string | undefined) {
  if (text) {
    return text
      .replace(/\*\*/g, '')
      .replace(/#{2,}/g, '')
      .replace(/🎯|✅|🔥/g, '')
      .trim();
  }
  return text;
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

export async function POST(request: NextRequest) {
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
    return NextResponse.json({ content: 'No API key available' });
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  const finalPrompt = `${SYSTEM_PROMPT}

   Job description:
    ${userMessage}`;

  for (const { model, maxOutputTokens } of MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: finalPrompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: maxOutputTokens,
          abortSignal: AbortSignal.timeout(30000),
        },
      });

      return NextResponse.json({ content: cleanOutput(response.text) });
    } catch (error) {
      if (!hasStatus(error) || error.status !== 503) {
        return NextResponse.json({ content: '❌ API request failed' });
      }
    }
  }

  return NextResponse.json({
    content:
      '⚠️ High demand right now. Try again in a few seconds - it should work.',
  });

  // console.log('=== GEMINI RESPONSE DEBUG ===');
  // console.log('Raw response data:', JSON.stringify(data, null, 2));
  // console.log('Candidates array:', data.candidates);
  // console.log('First candidate:', data.candidates?.[0]);
  // console.log('Content object:', data.candidates?.[0]?.content);
  // console.log('Parts array:', data.candidates?.[0]?.content?.parts);
  // console.log(
  //   'First part text:',
  //   data.candidates?.[0]?.content?.parts?.[0]?.text,
  // );

  //   const parts: Part[] = data?.candidates?.[0]?.content?.parts || [];
  //   const content = parts
  //     .map((p) => p.text || '')
  //     .join('')
  //     .trim();
  //   // console.log('ALL PARTS:', parts);
  //   // console.log('=== CONTENT ANALYSIS ===');
  //   // console.log('Content exists:', !!content);
  //   // console.log('Content length:', content?.length || 0);
  //   // console.log('Content preview:', content?.substring(0, 200) + '...');

  //   if (!content) {
  //     // console.log('=== NO CONTENT - FALLBACK TRIGGERED ===');
  return NextResponse.json({
    content:
      "I can help with that! Based on your description, here's a rough estimate:",
  });
  //   }

  //   // Check if AI is asking for more details
  //   if (
  //     content.toLowerCase().includes('need more details') ||
  //     content.toLowerCase().includes('need clarification')
  //   ) {
  //     // console.log(
  //     //   '=== AI ASKING FOR MORE DETAILS - POSSIBLE SYSTEM PROMPT ISSUE ===',
  //     // );
  //     // console.log('Full content:', content);
  //   }

  //   return NextResponse.json({ content: cleanOutput(content) });
  // } catch {
  //   return NextResponse.json({ content: '❌ API request failed' });
  // }
}
