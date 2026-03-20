// Vercel Serverless Function
export async function POST(request) {
  console.log("=== Vercel API FUNCTION STARTED ===");
  
  try {
    // Enable CORS
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Content-Type': 'application/json'
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response('', { status: 200, headers });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers
      });
    }

    console.log("Parsing request body...");
    const body = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2));
    
    const { messages } = body;
    console.log("Messages received:", messages);
    
    if (!messages?.length) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers
      });
    }
    
    const userMessage = messages.filter(m => m.role === "user").pop()?.content;
    console.log("User message:", userMessage);
    
    if (!userMessage?.trim()) {
      return new Response(JSON.stringify({ error: "User message is required" }), {
        status: 400,
        headers
      });
    }
    
    // Check environment variables
    console.log("Environment check:", {
      hasPrimaryKey: !!process.env.GEMINI_API_KEY,
      hasBackupKey: !!process.env.GEMINI_API_KEY_BACKUP,
      apiKeyPresent: !!(process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY_BACKUP)
    });
    
    // Get API key
    const apiKey = process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY_BACKUP;
    
    if (!apiKey) {
      console.error("No API keys found in environment");
      return new Response(JSON.stringify({ 
        error: "API key not configured. Please check environment variables.",
        debug: {
          hasPrimaryKey: !!process.env.GEMINI_API_KEY,
          hasBackupKey: !!process.env.GEMINI_API_KEY_BACKUP,
          envVars: Object.keys(process.env).filter(k => k.includes('GEMINI'))
        }
      }), {
        status: 500,
        headers
      });
    }
    
    console.log("Making Gemini API call...");
    
    try {
      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(30000), // 30 second timeout
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ 
                text: `You are QuoteMatey, an AI assistant that helps Australian tradespeople create professional quotes. Based on this job description, provide a detailed quote with materials, labor, and pricing.

Job: ${userMessage}

Please provide a professional quote in this EXACT format:

### **QUOTE: [Trade Type] Services**

**Job Description:**
[Brief description of the work]

---

#### **1. Materials Estimate**
[Material 1]: [Description] - $[Price]
[Material 2]: [Description] - $[Price]
[Material 3]: [Description] - $[Price]
**Total Materials:** $[Total]

---

#### **2. Labor & Call-Out**
Call-Out Fee: Standard travel and initial assessment - $[Amount]
Labor: Estimated [X] hours @ $[Rate]/hr - $[Amount]
**Total Labor:** $[Total]

---

#### **3. Quote Summary**
Materials Total: $[Amount]
Labor Total: $[Amount]
Subtotal: $[Amount]
GST (10%): $[Amount]
TOTAL QUOTE: $[Amount]

---

#### **4. Important Notes & Considerations**
Access: [Important detail]
Restoration: [Important detail]
Water Shut-off: [Important detail]
Validity: This quote is valid for 14 days.

---

**Acceptance:**
To go ahead with this repair, please reply to this message or call [Your Phone Number].

**QuoteMatey Tip:** *[Helpful tip for the tradesperson]*
Copy Quote

IMPORTANT: 
- Use realistic Australian pricing
- Be specific about materials and labor
- Include GST calculations
- Keep formatting exactly as shown above
- Use clean text format, not markdown tables
- Do not add any extra text outside this format` 
              }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500
          }
        })
      });
      
      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error("Gemini API error:", {
          status: geminiResponse.status,
          statusText: geminiResponse.statusText,
          errorBody: errorText
        });
        
        return new Response(JSON.stringify({ 
          error: "AI service temporarily unavailable. Please try again.",
          details: geminiResponse.statusText
        }), {
          status: 503,
          headers
        });
      }
      
      const data = await geminiResponse.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!content) {
        return new Response(JSON.stringify({ 
          error: "Unable to generate quote. Please try again." 
        }), {
          status: 500,
          headers
        });
      }
      
      console.log("=== Gemini API SUCCESS ===");
      
      return new Response(JSON.stringify({ content }), {
        status: 200,
        headers
      });
      
    } catch (apiError) {
      console.error("Gemini API call failed:", apiError);
      
      // Fallback to test response if API fails
      const fallbackResponse = {
        content: `QuoteMatey AI Response for "${userMessage}":\n\nBased on your job description, here's a preliminary estimate:\n\n**Materials**: $X (depending on specific requirements)\n**Labor**: $Y (estimated hours at $Z/hour)\n**Total**: $X + $Y\n\n*This is a basic estimate. A detailed quote will be provided after site inspection.*\n\n*Note: AI service temporarily unavailable - showing fallback response*`,
        fallback: true
      };
      
      return new Response(JSON.stringify(fallbackResponse), {
        status: 200,
        headers
      });
    }
    
  } catch (error) {
    console.error("=== Vercel API FUNCTION ERROR ===");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      error: error.message || "Internal server error",
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  }
}
