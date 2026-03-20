// Netlify Function - Root level for better compatibility
const handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log("=== API FUNCTION STARTED ===");
    console.log("Event:", JSON.stringify(event, null, 2));
    
    const { messages } = JSON.parse(event.body);
    console.log("Messages received:", messages);
    
    if (!messages?.length) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Messages array is required" })
      };
    }
    
    const userMessage = messages.filter(m => m.role === "user").pop()?.content;
    console.log("User message:", userMessage);
    
    if (!userMessage?.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "User message is required" })
      };
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
    
    console.log("=== API FUNCTION COMPLETED ===");
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };
    
  } catch (error) {
    console.error("=== API FUNCTION ERROR ===");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || "Internal server error",
        timestamp: new Date().toISOString()
      })
    };
  }
};

export default handler;
