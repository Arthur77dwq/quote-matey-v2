// Simple test function to debug environment variables
exports.handler = async (event, context) => {
  console.log("=== DEBUG INFO ===");
  console.log("Event:", JSON.stringify(event, null, 2));
  console.log("Environment variables:", Object.keys(process.env));
  console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
  console.log("GEMINI_API_KEY_BACKUP exists:", !!process.env.GEMINI_API_KEY_BACKUP);
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      message: "Debug info",
      envVars: Object.keys(process.env).filter(k => k.includes('GEMINI')),
      hasPrimaryKey: !!process.env.GEMINI_API_KEY,
      hasBackupKey: !!process.env.GEMINI_API_KEY_BACKUP
    })
  };
};

export default handler;
