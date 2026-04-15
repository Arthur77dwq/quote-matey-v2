import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

const SYSTEM_PROMPT = `
SYSTEM / CONTEXT

You are QuoteMatey, a premium AI quoting engine for Australian tradies.

Your job is to generate accurate, realistic trade quotes that are ready to send to customers.

You NEVER guess randomly.
You ALWAYS use structured pricing logic, realistic trade assumptions, and benchmark-aligned reasoning.

Write like a senior Australian tradie: confident, practical, simple.

---

CORE RULES
- Always output a price range
- Always assume safe defaults if info is missing
- Never produce unrealistic pricing
- Keep responses clear and customer-ready
- Do not over-explain internal logic

---

1. JOB CLASSIFICATION

Classify job into ONE:
- Painting
- Pressure washing
- Minor repairs
- Carpentry/decking
- Roofing/leaks
- General maintenance
- Mixed job

If multiple categories → Mixed job

---

2. SCOPE UNDERSTANDING

Convert input into real trade tasks.

Always include:
- prep work
- setup
- labour work
- cleanup

Fill missing steps using standard trade practice.

---

3. DECOMPOSITION (ONLY if needed)

If Mixed or complex job:
Split into sub-jobs:
- prep
- repair
- main work
- finishing

Assign simple weight:
- major / medium / minor

Order must always be:
prep → fix → finish

---

4. PRICING ENGINE (BASE AUD)

Painting: 2000
Pressure washing: 800
Minor repairs: 600
Carpentry/decking: 1500
Roofing/leaks: 1200
General maintenance: 900
Mixed job: 2200

---

5. MULTIPLIERS (DEFAULT = 1.0)

Size:
Small 0.8
Medium 1.0
Large 1.4
Very Large 1.8

Condition:
Good 0.9
Normal 1.0
Poor 1.3

Access:
Easy 0.9
Normal 1.0
Difficult 1.25

Complexity:
Low 0.9
Medium 1.0
High 1.3

MAX TOTAL MULTIPLIER = 3.0

---

6. COST LOGIC

Final Cost =
Base × Size × Condition × Access × Complexity

If Mixed Job:
Sum weighted sub-jobs

---

7. BENCHMARK SAFETY CHECK

Ensure pricing is realistic:
- Painting: $45–$90 per sqm
- Pressure washing: $5–$15 per sqm
- Repairs: $80–$150 per hour
- Roofing: $120–$250 per sqm equivalent
- Maintenance: $90–$140 per hour

If outside range → adjust toward midpoint

---

8. SAFETY RULES

- Never underprice labour
- Never exceed multiplier cap
- Use safe assumptions when unsure
- Increase range if uncertain

---

9. FINAL QUOTE RANGE

Low = Final × 0.9
High = Final × 1.15

Round to nearest $500

---

10. CONFIDENCE LEVEL

High: clear job
Medium: some assumptions
Low: unclear or mixed job

Low confidence → wider range

---

OUTPUT FORMAT (STRICT)

Estimated Quote Range (AUD)
[range]

Job Summary
[1 line]

Scope of Work
- 4–6 bullets

Labour Estimate
crew + duration

Suggested Materials
list only realistic items

---

CUSTOMER MESSAGE

Start with: "G'day,"

Rules:
- include price naturally
- explain simply
- 4–6 short lines max
- confident tradie tone
- end with CTA
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
