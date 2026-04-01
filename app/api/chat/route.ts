import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

const apiKey = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `
SYSTEM / CONTEXT
You are QuoteMatey, an AI assistant that generates quick, rough job quote drafts for Australian tradespeople.

CRITICAL RULES:
- ALWAYS generate a quote immediately for ANY input
- NEVER ask the user questions before giving the quote
- NEVER provide guides, tutorials, or explanations of how to do the job
- Keep the entire response under 150 words
- Be concise, practical, and direct (tradie-style, not AI-style)
- Prioritize showing the price first
- Assume reasonable details if missing
- Clearly note uncertainties in "Things to Confirm"
- ALWAYS complete all sections fully
- NEVER stop mid-sentence or mid-price


USER INSTRUCTIONS
The user will provide a job description.
- Always respond with a complete quote
- Use realistic Australian pricing (labour + materials)
- Do NOT guarantee exact pricing
- Keep it easy to copy and send to a customer

OUTPUT FORMAT

Estimated Quote Range (AUD)
[Give a clear price range immediately]

Job Summary
[1 short line max]

Labour Estimate
[Short time + cost estimate]

Suggested Materials
[Short list]

Customer Message
[Short, friendly message ready to send]

Things to Confirm
[Bullet points of assumptions/uncertainties]
`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function cleanOutput(text: string) {
  return text
    .replace(/\*\*/g, '')
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

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const userMessage =
      messages
        ?.filter((m: any) => m.role === 'user')
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

    const finalPrompt = `${SYSTEM_PROMPT}

   Job description:
${userMessage}`;

    const requestBody = JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: finalPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 3000,
      },
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(30000),
        body: requestBody,
      },
    );

    if (!response.ok) {
      return NextResponse.json({ content: '❌ API request failed' });
    }

    const data = await response.json();
    console.log('=== GEMINI RESPONSE DEBUG ===');
    console.log('Raw response data:', JSON.stringify(data, null, 2));
    console.log('Candidates array:', data.candidates);
    console.log('First candidate:', data.candidates?.[0]);
    console.log('Content object:', data.candidates?.[0]?.content);
    console.log('Parts array:', data.candidates?.[0]?.content?.parts);
    console.log(
      'First part text:',
      data.candidates?.[0]?.content?.parts?.[0]?.text,
    );

    const parts = data?.candidates?.[0]?.content?.parts || [];

    const content = parts
      .map((p: any) => p.text || '')
      .join('')
      .trim();
    console.log('ALL PARTS:', parts);
    console.log('=== CONTENT ANALYSIS ===');
    console.log('Content exists:', !!content);
    console.log('Content length:', content?.length || 0);
    console.log('Content preview:', content?.substring(0, 200) + '...');

    if (!content) {
      console.log('=== NO CONTENT - FALLBACK TRIGGERED ===');
      return NextResponse.json({
        content:
          "I can help with that! Based on your description, here's a rough estimate:",
      });
    }

    // Check if AI is asking for more details
    if (
      content.toLowerCase().includes('need more details') ||
      content.toLowerCase().includes('need clarification')
    ) {
      console.log(
        '=== AI ASKING FOR MORE DETAILS - POSSIBLE SYSTEM PROMPT ISSUE ===',
      );
      console.log('Full content:', content);
    }

    return NextResponse.json({ content: cleanOutput(content) });
  } catch (error) {
    return NextResponse.json({ content: '❌ API request failed' });
  }
}
