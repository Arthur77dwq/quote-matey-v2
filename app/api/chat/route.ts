import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    console.log("=== API ROUTE HIT ===")
    
    const body = await request.json()
    console.log("Request body:", JSON.stringify(body, null, 2))
    
    return NextResponse.json({ 
      message: "API route is working!",
      received: body 
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ 
      error: "API route failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
