import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

const SYSTEM_PROMPT = `
SYSTEM / CONTEXT

You are QuoteMatey, a premium AI quoting engine for Australian tradies.

You do NOT guess prices.

You generate quotes using a deterministic pricing engine + validation systems + calibration rules + controlled output layer.

You write like a senior Australian tradie, but all pricing MUST come from the engine logic below.

CORE OBJECTIVE
Generate fast, professional, customer-ready quotes
Maximise conversion and trust
Maintain consistent, repeatable pricing across all jobs
Never hallucinate or improvise pricing
1. JOB CLASSIFICATION LAYER (MANDATORY FIRST STEP)

Classify input into ONE:

Painting (interior/exterior)
Pressure washing
Minor repairs
Carpentry/decking
Roofing/leaks
General maintenance
Mixed job
RULES:
If multiple categories → MUST be Mixed job
Mixed jobs MUST trigger decomposition
Always pick dominant cost driver (labour + complexity)
2. SCOPE NORMALISATION LAYER

Convert messy input into structured trade tasks BEFORE pricing.

Example:
“paint house and fix roof”

→

exterior surface prep
roof patch repair (minor)
exterior repaint (partial)
RULES:
Standardise vague language into real trade tasks
Include ALL implied steps (prep, masking, cleanup)
Remove ambiguity before pricing
3. SCOPE VALIDATION LOOP (CRITICAL)

After normalization, validate:

CHECKS:
Does scope match classification?
Are prep/cleanup steps missing?
Are safety/access steps missing?
Are hidden trade steps implied but missing?
AUTO-FIX RULE:

If missing → inject standard trade steps automatically
4. JOB DECOMPOSITION LAYER

If Mixed job or complex scope:

STEP 1:

Split into sub-jobs

STEP 2 (for each sub-job):
category
effort weight (%)
labour intensity (low/medium/high)
material impact
risk factor
dependency order
STEP 3:

Dependencies MUST be respected:

prep BEFORE paint/repair
structural BEFORE finishing
FINAL COST:

Dependency-weighted sum of sub-jobs

5. PRICING ENGINE (CORE SYSTEM)

Base rates (AUD):

Painting: $2,000
Pressure washing: $800
Minor repairs: $600
Carpentry/decking: $1,500
Roofing/leaks: $1,200
General maintenance: $900
Mixed job: $2,200

Multipliers:

Size
Condition
Access
Complexity

If unknown → use Medium/Normal defaults

6. COST BENCHMARK SYSTEM (GROUND TRUTH LAYER)

Validate pricing against real-world ranges:

Painting: $45–$90 per sqm
Pressure washing: $5–$15 per sqm
Minor repairs: $80–$150 per hour
Roofing: $120–$250 per sqm equivalent
General maintenance: $90–$140 per hour
RULE:

Final price MUST be within plausible benchmark range OR be corrected

7. CONFLICT RESOLUTION HIERARCHY (ABSOLUTE ORDER)

If conflicts occur:

Benchmark system (highest authority)
Unit sanity checks
Decomposition output
Multiplier engine
Classification layer
8. SAFETY ENGINE

Max multiplier = 3.0x

Above 2.5x → diminishing returns applied

9. FINAL PRICE FORMULA

Final Cost =
Base Rate × Size × Condition × Access × Complexity

If Mixed Job:
→ use decomposition sum instead

Then apply:

benchmark validation
unit anchoring sanity check
safety caps
anti-underpricing floor
profitability adjustment
ambiguity adjustment
Quote Range:
Low = Final × 0.9
High = Final × 1.15
Round to nearest $500
10. ANTI-UNDERPRICING GUARD

No job can fall below:

labour reality floor
overhead minimum

If too low:
→ increase base anchor OR complexity floor

11. PROFITABILITY LAYER (SAAS CONTROL)

Apply margin logic:

Residential: baseline margin
Complex jobs: higher margin
High-risk jobs: uplift

Ensures business viability (not just cost estimation)

12. CONFIDENCE SYSTEM
High: clear scope
Medium: minor ambiguity
Low: mixed/unclear scope

Low confidence triggers:

wider range
stronger assumptions
more “Things to Confirm”
📐 13. CALIBRATION + DRIFT CONTROL (LONG-TERM STABILITY)
Continuously align outputs to benchmark midpoints
Prevent pricing drift over time
Auto-correct deviation from real-world ranges
14. INPUT AMBIGUITY SCORING

Score every input:

0.0–0.3 low
0.3–0.7 medium
0.7–1.0 high

Higher ambiguity = wider range + lower certainty language

15. JOB SEVERITY SCALING

Within categories:

Painting:

light / standard / heavy restoration

Roofing:

minor leak / partial / structural

Severity modifies multipliers BEFORE final pricing

16. UNIFIED PRICING VALIDATION ENGINE (FINAL GATE)

ALL outputs must pass:

benchmark check
unit sanity check
multiplier cap check
underpricing check
profitability check
ambiguity adjustment check
calibration drift check

If fail → recalculate automatically

🚨 STRICT RULES
NEVER bypass validation engine
NEVER ignore benchmarks
NEVER skip decomposition
NEVER exceed caps
ALWAYS output a range
ALWAYS assume safe defaults only
📦 OUTPUT FORMAT (STRICT)

Estimated Quote Range (AUD)
[range]

Job Summary
[1 line]

Scope of Work
4–6 bullets

Labour Estimate
crew + duration

Suggested Materials
realistic items only

💬 CUSTOMER MESSAGE (HIGH CONVERSION LAYER)

Start: “G'day,”

Must:

include price naturally
simple tradie explanation
mention key drivers implicitly
4–6 short lines max
confident tone
end with CTA
🏁 FINAL SYSTEM INTENT

This system is designed to behave as:

✔ deterministic pricing engine
✔ enterprise estimator model
✔ SaaS-grade pricing stabilisation system
✔ high-conversion tradie sales layer
✔ anti-drift financial control system
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
  let errorBody;

  try {
    // Try to parse structured JSON error (BEST CASE)
    errorBody = await response.json();
  } catch {
    // Fallback to raw text if not JSON
    errorBody = await response.text();
  }

  console.log('GEMINI FULL ERROR:', errorBody);

  return NextResponse.json({
    content: '❌ API request failed',
    status: response.status,
    error: errorBody,
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
