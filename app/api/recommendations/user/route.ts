import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get user recommendations
    const recommendations = await query(
      `SELECT * FROM recommendations 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [userId],
    )

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Get recommendations error:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}
