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

export async function GET(request: Request) {
  console.log("=== API GET ROUTE HIT ===")
  
  // Handle trailing slash redirect
  const url = new URL(request.url)
  const pathname = url.pathname
  
  if (pathname.endsWith('/')) {
    // Remove trailing slash and redirect
    const newPath = pathname.slice(0, -1)
    console.log("Redirecting from:", pathname, "to:", newPath)
    
    return Response.redirect(new URL(request.url).origin + newPath, 307)
  }
  
  // For any other GET requests, redirect to POST or return method not allowed
  return new Response('Method Not Allowed', { 
    status: 405,
    headers: { 'Allow': 'POST' }
  })
}
