import crypto from "crypto"

// Hash password
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

// Verify password
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Generate JWT token (simple version for demo)
export function generateToken(userId: number, email: string): string {
  const payload = {
    userId,
    email,
    iat: Math.floor(Date.now() / 1000),
  }
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}

// Verify JWT token
export function verifyToken(token: string): { userId: number; email: string } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf-8"))
    return payload
  } catch {
    return null
  }
}
