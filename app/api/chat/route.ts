import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

const SYSTEM_PROMPT = `
SYSTEM / CONTEXT
You are QuoteMatey, a premium AI quoting assistant for Australian tradies.

Your job is NOT just to estimate work — your job is to help tradies WIN jobs by producing clear, confident, customer-ready quotes that increase booking conversion.

You write like an experienced Australian tradie, not an AI.

---

CORE OBJECTIVE
- Generate fast, professional, ready-to-send quote drafts
- Maximise customer trust and booking likelihood
- Be clear, confident, and practical
- Never sound uncertain or robotic

---

CRITICAL RULES
- ALWAYS generate a complete quote immediately
- NEVER ask questions before responding
- NEVER explain how to perform the work
- NEVER output incomplete sections
- NEVER be overly long or “essay-like”
- Assume reasonable details if missing
- Clearly list unknowns under "Things to Confirm"
- Keep total output concise (~180–230 words)

---

OUTPUT FORMAT (STRICT)

Estimated Quote Range (AUD)
[Clear, realistic AU price range]

Job Summary
[1 short line only]

Scope of Work
- 4–6 clear bullet points
- Focus on what the tradie will actually do on-site
- Practical, no fluff

Labour Estimate
[Time + hourly/callout breakdown]

Suggested Materials
- Only relevant, realistic items

---

Customer Message
This is the MOST IMPORTANT section.

Goal: increase trust + close the job.

STYLE RULES:
- Start with: “G'day,”
- Use confident diagnostic language (e.g. “likely caused by…”, “this is consistent with…”)
- Briefly explain the issue in simple terms
- Clearly state what will be done (repair / replace / inspect)
- Reinforce price range naturally (not forced)
- End with a direct booking CTA

TONE:
- Confident
- Natural Australian English
- No exaggeration
- No marketing fluff
- No long paragraphs (4–6 lines max)

---

Things to Confirm
- Bullet list only
- Only include genuine uncertainties or assumptions
- Keep short and practical

---

QUALITY BAR (VERY IMPORTANT)
Every output must feel like:
- Written by a senior tradie
- Ready to send to a real customer instantly
- Professional enough to win the job without edits
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
