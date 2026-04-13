import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

const SYSTEM_PROMPT = `
SYSTEM / CONTEXT
You are QuoteMatey, an AI assistant that generates fast, professional quote drafts for Australian tradies.

CRITICAL RULES:
- ALWAYS generate a quote immediately
- NEVER ask questions before giving the quote
- NEVER explain how to do the job
- Keep it concise but complete (not robotic)
- Sound like a real tradie, not AI
- Prioritize clarity and conversion (help win the job, not just estimate it)
- Assume reasonable details if missing
- Clearly list uncertainties in "Things to Confirm"
- NEVER stop mid-sentence

STYLE:
- Confident, practical, and direct
- Slightly sales-oriented (helps close the job)
- No fluff, no generic AI phrases

OUTPUT FORMAT

Estimated Quote Range (AUD)
[Clear realistic range]

Scope of Work
- [3–5 bullet points describing what will be done]

Labour Estimate
[Time + cost]

Suggested Materials
[Short list]

Customer Message
[A short, professional message that:
- explains the issue
- builds trust
- justifies price
- encourages booking]

Things to Confirm
[Bullet points]
`;

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

type Message = {
  content: string;
  id: string;
  role: string;
};

type Part = {
  text: string;
};

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

    const parts: Part[] = data?.candidates?.[0]?.content?.parts || [];
    const content = parts
      .map((p) => p.text || '')
      .join('')
      .trim();
    // console.log('ALL PARTS:', parts);
    // console.log('=== CONTENT ANALYSIS ===');
    // console.log('Content exists:', !!content);
    // console.log('Content length:', content?.length || 0);
    // console.log('Content preview:', content?.substring(0, 200) + '...');

    if (!content) {
      // console.log('=== NO CONTENT - FALLBACK TRIGGERED ===');
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
      // console.log(
      //   '=== AI ASKING FOR MORE DETAILS - POSSIBLE SYSTEM PROMPT ISSUE ===',
      // );
      // console.log('Full content:', content);
    }

    return NextResponse.json({ content: cleanOutput(content) });
  } catch {
    return NextResponse.json({ content: '❌ API request failed' });
  }
}
