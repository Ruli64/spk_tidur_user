"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardNavProps {
  user: {
    id: number
    email: string
    name: string
  }
  onLogout: () => void
}

export default function DashboardNav({ user, onLogout }: DashboardNavProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    onLogout()
    router.push("/login")
  }

  const handleProfileClick = () => {
    router.push("/profile")
  }

  return (
    <nav className="bg-white border-b border-blue-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
          Sleep Advisor
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm font-medium hover:bg-gray-50 focus:outline-none"
          >
            {user.name}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="px-3 py-2 text-xs text-slate-500 border-b break-all">
                {user.email}
              </div>
              <button
                onClick={() => {
                  setOpen(false)
                  handleProfileClick()
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profil Saya
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  handleLogout()
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
