"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { calculateSleepRecommendation } from "@/lib/sleep-calculator"

interface RecommendationFormProps {
  onResult: (result: any) => void
}

export default function RecommendationForm({ onResult }: RecommendationFormProps) {
  const { user } = useAuth()
  const [age, setAge] = useState("")
  const [wakeUpTime, setWakeUpTime] = useState("07:00")
  const [activityLevel, setActivityLevel] = useState("medium")
  const [healthStatus, setHealthStatus] = useState("fit")
  const [stressLevel, setStressLevel] = useState("medium")
  const [screenTime, setScreenTime] = useState("moderate")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!age) {
        throw new Error("Usia harus diisi")
      }

      const ageNum = Number.parseInt(age)
      if (ageNum < 1 || ageNum > 120) {
        throw new Error("Usia harus antara 1-120 tahun")
      }

      const result = calculateSleepRecommendation({
        age: ageNum,
        wakeUpTime,
        activityLevel,
        healthStatus,
        stressLevel: stressLevel as "low" | "medium" | "high",
        screenTime: screenTime as "minimal" | "moderate" | "high",
      })

      if (user) {
        const response = await fetch("/api/recommendations/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            age: ageNum,
            wakeUpTime,
            activityLevel,
            healthStatus,
            stressLevel,
            screenTime,
          }),
        })

        if (!response.ok) {
          console.error("Failed to save recommendation to database")
        }
      }

      onResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle>Profil Kesehatan Anda</CardTitle>
        <CardDescription>Isi informasi di bawah untuk mendapatkan rekomendasi jam tidur ideal</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900">Informasi Dasar</h3>

            <div className="space-y-2">
              <Label htmlFor="age" className="font-semibold text-slate-700">
                Usia Anda
              </Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Masukkan usia Anda"
                required
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wakeUpTime" className="font-semibold text-slate-700">
                Jam Bangun yang Diinginkan
              </Label>
              <Input
                id="wakeUpTime"
                type="time"
                value={wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Section 2: Lifestyle */}
          <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900">Gaya Hidup</h3>

            <div className="space-y-2">
              <Label htmlFor="activityLevel" className="font-semibold text-slate-700">
                Tingkat Aktivitas Harian
              </Label>
              <select
                id="activityLevel"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="low">Rendah (Pekerjaan santai, sedikit gerakan)</option>
                <option value="medium">Sedang (Pekerjaan kantor standar)</option>
                <option value="high">Tinggi (Olahraga/pekerjaan fisik berat)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stressLevel" className="font-semibold text-slate-700">
                Tingkat Stres
              </Label>
              <select
                id="stressLevel"
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="low">Rendah</option>
                <option value="medium">Sedang</option>
                <option value="high">Tinggi</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="screenTime" className="font-semibold text-slate-700">
                Penggunaan Layar Sebelum Tidur
              </Label>
              <select
                id="screenTime"
                value={screenTime}
                onChange={(e) => setScreenTime(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="minimal">Minimal (Tidak menggunakan sebelum tidur)</option>
                <option value="moderate">Sedang (Menggunakan 1 jam sebelum tidur)</option>
                <option value="high">Banyak (Menggunakan langsung sebelum tidur)</option>
              </select>
            </div>
          </div>

          {/* Section 3: Health */}
          <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900">Kesehatan</h3>

            <div className="space-y-2">
              <Label htmlFor="healthStatus" className="font-semibold text-slate-700">
                Status Kesehatan
              </Label>
              <select
                id="healthStatus"
                value={healthStatus}
                onChange={(e) => setHealthStatus(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="fit">Fit (Kondisi kesehatan baik)</option>
                <option value="unfit">Kurang Fit (Kondisi kesehatan perlu perhatian)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!age || loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            {loading ? "Menghitung..." : "Dapatkan Rekomendasi"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
