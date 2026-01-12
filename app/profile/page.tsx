"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DashboardNav from "@/components/dashboard-nav"

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user, isLoading, router])

  const handleUpdateProfile = async () => {
    setError("")
    setSuccess("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          name,
          email,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Gagal memperbarui profil")
      }

      const data = await response.json()
      setSuccess("Profil berhasil diperbarui")
      setIsEditing(false)

      // Update local user state
      localStorage.setItem("user", JSON.stringify(data.user))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Gagal menghapus akun")
      }

      setDeleteSuccess(true)

      setTimeout(() => {
        logout()
        router.push("/login")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus akun")
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-slate-600">Memuat...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardNav user={user} onLogout={logout} />

      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Profil Saya</h1>

        {deleteSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Akun berhasil dihapus. Anda akan dialihkan ke halaman login...
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Profile Information Card */}
        <Card className="border-blue-100 shadow-lg mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle>Informasi Profil</CardTitle>
            <CardDescription>Kelola informasi akun Anda</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {!isEditing ? (
              <div className="space-y-4">
                <div className="pb-4 border-b border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Nama</p>
                  <p className="text-lg font-semibold text-slate-900">{user.name}</p>
                </div>
                <div className="pb-4 border-b border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Email</p>
                  <p className="text-lg font-semibold text-slate-900">{user.email}</p>
                </div>
                <div className="pb-4 border-b border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">ID Pengguna</p>
                  <p className="text-sm text-slate-600 font-mono">{user.id}</p>
                </div>
                <Button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Edit Profil
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold text-slate-700">
                    Nama
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-slate-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan"}
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Batal
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Settings Card */}
        <Card className="border-red-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
            <CardTitle className="text-red-700">Pengaturan Akun</CardTitle>
            <CardDescription>Kelola pengaturan akun dan privasi Anda</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="pb-4 border-b border-slate-200">
                <p className="text-sm text-slate-700 mb-3">
                  Menghapus akun Anda akan menghapus semua data yang terkait dengan akun ini secara permanen.
                </p>
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  variant="destructive"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Hapus Akun
                </Button>
              </div>

              {showDeleteConfirm && (
                <Alert variant="destructive">
                  <AlertDescription className="space-y-3">
                    <p className="font-semibold">Apakah Anda yakin ingin menghapus akun ini?</p>
                    <p className="text-sm">Tindakan ini tidak dapat dibatalkan.</p>
                    <div className="flex gap-2">
                      <Button onClick={handleDeleteAccount} variant="destructive" size="sm" disabled={isSubmitting}>
                        {isSubmitting ? "Menghapus..." : "Ya, Hapus Akun"}
                      </Button>
                      <Button
                        onClick={() => setShowDeleteConfirm(false)}
                        variant="outline"
                        size="sm"
                        disabled={isSubmitting}
                      >
                        Batal
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
