"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: number
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  token: string | null
  login: (email: string, password: string) => Promise<User>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken")
    const savedUser = localStorage.getItem("user")

    if (savedToken && savedUser) {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse stored data:", error)
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Login failed")
  }

  setUser(data.user)
  setToken(data.token)
  localStorage.setItem("authToken", data.token)
  localStorage.setItem("user", JSON.stringify(data.user))

  return data.user   // 🔥 INI PENTING
}



  const register = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error("All fields are required")
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters")
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Registration failed")
      }

      const data = await response.json()

      setUser(data.user)
      setToken(data.token)
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, token, login, register, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

