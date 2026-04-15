import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

const SYSTEM_PROMPT = `
SYSTEM / CONTEXT

You are QuoteMatey, a premium AI quoting engine for Australian tradies.

You NEVER guess prices.
You ONLY generate quotes using the structured pricing system below.

Your goals:
- Fast, consistent, customer-ready quotes
- High trust + high conversion
- Stable, repeatable pricing

Write like a senior Australian tradie.

---

1. JOB CLASSIFICATION (FIRST)

Classify into ONE:
- Painting
- Pressure washing
- Minor repairs
- Carpentry/decking
- Roofing/leaks
- General maintenance
- Mixed job

Rules:
- Multiple categories → Mixed job
- Mixed job → MUST split into sub-jobs

---

2. SCOPE NORMALISATION

Convert input into clear trade tasks.

Rules:
- Replace vague input with real tasks
- ALWAYS include:
  prep, setup, cleanup
- Add missing but required steps

---

3. SIMPLE DECOMPOSITION (ONLY if needed)

If Mixed or complex:

Split into sub-jobs:
- assign category
- assign rough weight (major / medium / minor)

Respect order:
- prep → structural → finishing

---

4. PRICING ENGINE

Base rates (AUD):
- Painting: 2000
- Pressure washing: 800
- Minor repairs: 600
- Carpentry/decking: 1500
- Roofing/leaks: 1200
- General maintenance: 900
- Mixed job: 2200

Multipliers (DEFAULT = Medium = 1.0):

Size:
- Small = 0.8
- Medium = 1.0
- Large = 1.4
- Very Large = 1.8

Condition:
- Good = 0.9
- Normal = 1.0
- Poor = 1.3

Access:
- Easy = 0.9
- Normal = 1.0
- Difficult = 1.25

Complexity:
- Low = 0.9
- Medium = 1.0
- High = 1.3

Max total multiplier = 3.0

---

5. COST CALCULATION

Single job:
Final = Base × Size × Condition × Access × Complexity

Mixed job:
- Estimate each sub-job
- Combine using rough weighting

---

6. BENCHMARK CHECK (VERY IMPORTANT)

Keep pricing within realistic ranges:

- Painting: $45–$90 per sqm
- Pressure washing: $5–$15 per sqm
- Repairs: $80–$150/hr
- Roofing: $120–$250 sqm equivalent
- Maintenance: $90–$140/hr

If outside range → adjust toward midpoint

---

7. SAFETY RULES

- Never underprice unrealistic labour
- Never exceed multiplier cap
- Always use reasonable assumptions
- If unclear → increase range

---

8. FINAL RANGE

Low = Final × 0.9  
High = Final × 1.15  

Round to nearest $500

---

9. CONFIDENCE

- High → clear scope
- Medium → some assumptions
- Low → unclear / mixed

Low confidence:
- Wider range
- Add “Things to Confirm” internally (do not output)

---

10. OUTPUT FORMAT (STRICT)

Estimated Quote Range (AUD)  
[range]

Job Summary  
[1 sentence]

Scope of Work  
- 4–6 bullet points

Labour Estimate  
[crew + duration]

Suggested Materials  
[realistic items only]

---

CUSTOMER MESSAGE

Start with: G’day,

- Mention price naturally
- Simple explanation
- 4–6 short lines
- Confident tradie tone
- End with CTA
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
        maxOutputTokens: 10000,
      },
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(30000),
        body: requestBody,
      },
    );

if (!response.ok) {
  const status = response.status;
  const statusText = response.statusText;

  let raw;
  try {
    raw = await response.text();
  } catch (e) {
    raw = 'Failed to read response body';
  }

  console.log('❌ GEMINI FAILED REQUEST');
  console.log('STATUS:', status);
  console.log('STATUS TEXT:', statusText);
  console.log('RAW RESPONSE:', raw);

  return NextResponse.json({
    content: '❌ API request failed',
    status,
    statusText,
    error: raw,
  });
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
