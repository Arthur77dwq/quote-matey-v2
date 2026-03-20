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
    const { messages } = JSON.parse(event.body);
    
    if (!messages?.length) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Messages array is required" })
      };
    }
    
    const userMessage = messages.filter(m => m.role === "user").pop()?.content;
    if (!userMessage?.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "User message is required" })
      };
    }
    
    // Simple Gemini API call
    const apiKey = process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY_BACKUP;
    
    console.log("Environment check:", {
      hasPrimaryKey: !!process.env.GEMINI_API_KEY,
      hasBackupKey: !!process.env.GEMINI_API_KEY_BACKUP,
      apiKeyPresent: !!apiKey,
      allEnvVars: Object.keys(process.env).filter(k => k.includes('GEMINI'))
    });
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "API key not configured. Check environment variables." })
      };
    }
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `Job description:\n${userMessage}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500
        }
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText
      });
      
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: `API error: ${response.statusText}` })
      };
    }
    
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Invalid JSON response from API" })
      };
    }
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!content) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "No content generated" })
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ content })
    };
    
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || "Internal server error" 
      })
    };
  }
};

module.exports = { handler };
