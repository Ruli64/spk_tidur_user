import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyPassword, generateToken } from "@/lib/auth"
export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const users = (await query("SELECT id, name, password FROM users WHERE email = ?", [email])) as any[]

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 })
    }

    const user = users[0]

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 })
    }

    // Generate token
    const token = generateToken(user.id, email)

    return NextResponse.json({
      user: {
        id: user.id,
        email,
        name: user.name,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
