// Vercel Serverless Function
export default async function handler(request) {
  console.log("=== MINIMAL FUNCTION STARTED ===");
  
  return new Response(JSON.stringify({ 
    message: "Function is working!",
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
