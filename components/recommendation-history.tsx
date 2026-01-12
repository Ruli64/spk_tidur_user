"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface HistoryItem {
  id: number
  age: number
  wake_up_time: string
  activity_level: string
  health_status: string
  stress_level: string
  screen_time: string
  bedtime: string
  sleep_duration: number
  score: number
  created_at: string
}

export default function RecommendationHistory() {
  const { user } = useAuth()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) return

    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/recommendations/user?userId=${user.id}`)
        if (!response.ok) throw new Error("Failed to fetch history")

        const data = await response.json()
        setHistory(data.recommendations || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat riwayat")
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [user])

  if (!user) return null
  if (loading) return <div className="text-center py-8">Memuat riwayat...</div>
  if (error)
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Rekomendasi</CardTitle>
        <CardDescription>Rekomendasi jam tidur Anda sebelumnya</CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-slate-500">Belum ada riwayat rekomendasi</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">Usia: {item.age} tahun</p>
                    <p className="text-sm text-slate-500">{new Date(item.created_at).toLocaleDateString("id-ID")}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Skor: {(item.score * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-slate-600">Jam Bangun</p>
                    <p className="font-semibold text-slate-900">{item.wake_up_time}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Waktu Tidur</p>
                    <p className="font-semibold text-slate-900">{item.bedtime}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Durasi Tidur</p>
                    <p className="font-semibold text-slate-900">{item.sleep_duration} jam</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Aktivitas</p>
                    <p className="font-semibold text-slate-900 capitalize">{item.activity_level}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
