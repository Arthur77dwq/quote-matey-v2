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
    
    // Return a simple response for now to test
    const response = {
      content: `QuoteMatey Test Response: "${userMessage}" - This is a test to verify the API is working. The real Gemini API integration will be added next.`,
      timestamp: new Date().toISOString()
    };
    
    console.log("=== Vercel API FUNCTION COMPLETED ===");
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers
    });
    
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
