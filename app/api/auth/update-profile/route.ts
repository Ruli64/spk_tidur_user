import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function PUT(request: NextRequest) {
  try {
    const { userId, name, email } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Update user profile
    await query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, userId])

    // Return updated user
    const users = (await query("SELECT id, email, name FROM users WHERE id = ?", [userId])) as any[]

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: users[0] })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
