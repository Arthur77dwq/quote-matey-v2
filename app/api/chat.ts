export const maxDuration = 30

export async function POST(request: Request) {
  try {
    console.log("=== API ROUTE HIT ===")
    
    const body = await request.json()
    console.log("Request body:", JSON.stringify(body, null, 2))
    
    return Response.json({ 
      message: "API route is working!",
      received: body 
    })
  } catch (error) {
    console.error("API Error:", error)
    return Response.json({ 
      error: "API route failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
