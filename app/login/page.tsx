"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // login should send raw password to server/api which does hashing & verification
      const result = await login(email, password) || {}

      // jika login mengembalikan objek user dengan is_admin, redirect ke /admin
      const isAdmin = typeof result === "object" && "is_admin" in result ? (result as any).is_admin : false
      if (!result || typeof result !== "object") {
        throw new Error("Invalid login response");
      }
      router.push(isAdmin ? "/admin" : "/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 text-center">
            <CardTitle className="text-2xl">Masuk</CardTitle>
            <CardDescription>Masuk ke akun Sleep Advisor Anda</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-slate-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="masukkan@email.com"
                  required
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-semibold text-slate-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="masukkan password"
                  required
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                disabled={!email || !password || loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2"
              >
                {loading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-slate-600">
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-600 hover:underline font-semibold">
                Daftar di sini
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
