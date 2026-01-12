"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecommendationForm from "@/components/recommendation-form"
import RecommendationResult from "@/components/recommendation-result"
import RecommendationHistory from "@/components/recommendation-history"
import CriteriaInfo from "@/components/criteria-info"
import DashboardNav from "@/components/dashboard-nav"

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

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

      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Sleep Advisor</h1>
          <p className="text-lg text-slate-600">Selamat datang, {user.name}!</p>
          <p className="text-slate-600 mt-2">Temukan waktu tidur ideal Anda berdasarkan profil kesehatan Anda</p>
        </div>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="form">Hitung Rekomendasi</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
            <TabsTrigger value="info">Tentang Kriteria</TabsTrigger>
          </TabsList>

          {/* Form Tab */}
          <TabsContent value="form" className="space-y-8">
            {!result ? (
              <RecommendationForm onResult={setResult} />
            ) : (
              <>
                <RecommendationResult result={result} />
                <Button onClick={() => setResult(null)} variant="outline" className="w-full">
                  Hitung Ulang
                </Button>
              </>
            )}
          </TabsContent>

          <TabsContent value="history">
            <RecommendationHistory />
          </TabsContent>

          {/* Information Tab */}
          <TabsContent value="info">
            <CriteriaInfo />
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-blue-100 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-2">Tentang Sistem Ini</h3>
          <p className="text-sm text-slate-600">
            Sistem rekomendasi tidur ini menggunakan metode Simple Additive Weighting (SAW) untuk menganalisis profil
            kesehatan dan gaya hidup Anda. Hasil yang diberikan adalah rekomendasi umum dan bukan pengganti konsultasi
            medis profesional.
          </p>
        </div>
      </div>
    </main>
  )
}
