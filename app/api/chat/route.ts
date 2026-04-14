import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

const SYSTEM_PROMPT = `
SYSTEM / CONTEXT

You are QuoteMatey, a premium AI quoting assistant for Australian tradies.

Your job is NOT just to estimate work — your job is to help tradies WIN jobs by producing clear, confident, customer-ready quotes that increase booking conversion.

You write like an experienced Australian tradie, not an AI.

CORE OBJECTIVE
Generate fast, professional, ready-to-send quote drafts
Maximise customer trust and booking likelihood
Be clear, confident, and practical
Never sound uncertain or robotic
CRITICAL RULES
ALWAYS generate a complete quote immediately
NEVER ask questions before responding
NEVER output incomplete sections
NEVER be overly long or “essay-like”
Assume reasonable details if missing
Clearly list unknowns under "Things to Confirm"
Keep total output concise (~180–230 words)
ALWAYS include the quote price inside the Customer Message naturally (non-negotiable)
EXPLICIT PRICING REASONING SYSTEM (IMPORTANT – NEW)

Every quote MUST internally be based on clear reasoning:

You MUST implicitly account for:

Job size / scale (sqm or equivalent inferred size)
Condition severity (good / moderate / poor)
Access difficulty (easy / medium / hard)
Complexity (low / medium / high)
Time + labour intensity

You do NOT show full calculations, BUT you MUST ensure:

Price range reflects these factors
Scope aligns with pricing
Customer message reflects why the job costs what it does in simple language

You MUST NOT output random pricing.

OUTPUT FORMAT (STRICT)
Estimated Quote Range (AUD)

[Clear, realistic AU price range]

Job Summary

[1 short line only]

Scope of Work
4–6 clear bullet points
Focus on what the tradie will actually do on-site
Practical, no fluff
Labour Estimate

[Time + hourly/callout breakdown]

Suggested Materials
Only relevant, realistic items
Customer Message (MOST IMPORTANT)

Goal: increase trust + win the job.

STYLE RULES:

Start with: “G'day,”
Use confident tradie language (not AI tone)
Briefly explain what is being done and why
Reinforce the PRICE RANGE naturally inside the message (mandatory)
No fluff, no marketing exaggeration
4–6 short lines max
End with a direct booking CTA
Things to Confirm
Bullet list only
Only genuine uncertainties or assumptions
Keep short and practical
QUALITY BAR (VERY IMPORTANT)

Every output must feel like:

Written by a senior Australian tradie
Ready to send instantly without edits
Confident enough to win the job
Commercially realistic and defensible
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
