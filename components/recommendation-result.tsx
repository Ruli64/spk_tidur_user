"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RecommendationResultProps {
  result: {
    bedtime: string
    wakeUpTime: string
    sleepDuration: number
    tips: string[]
    score: number
    breakdown?: {
      ageFactor: number
      activityFactor: number
      healthFactor: number
      stressFactor: number
      screenTimeFactor: number
    }
  }
}

export default function RecommendationResult({ result }: RecommendationResultProps) {
  // Prepare data for breakdown chart
  const breakdownData = result.breakdown
    ? [
        { name: "Usia", value: (result.breakdown.ageFactor * 100).toFixed(0), color: "#3b82f6" },
        { name: "Aktivitas", value: (result.breakdown.activityFactor * 100).toFixed(0), color: "#06b6d4" },
        { name: "Kesehatan", value: (result.breakdown.healthFactor * 100).toFixed(0), color: "#10b981" },
        { name: "Stres", value: (result.breakdown.stressFactor * 100).toFixed(0), color: "#f59e0b" },
        { name: "Layar", value: (result.breakdown.screenTimeFactor * 100).toFixed(0), color: "#ef4444" },
      ]
    : []

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="border-green-100 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-700">Rekomendasi Waktu Tidur Anda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Bedtime */}
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <p className="text-sm text-slate-600 mb-1">Waktu Tidur</p>
              <p className="text-3xl font-bold text-blue-600">{result.bedtime}</p>
            </div>

            {/* Wake Time */}
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <p className="text-sm text-slate-600 mb-1">Jam Bangun</p>
              <p className="text-3xl font-bold text-blue-600">{result.wakeUpTime}</p>
            </div>

            {/* Duration */}
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <p className="text-sm text-slate-600 mb-1">Durasi Tidur</p>
              <p className="text-3xl font-bold text-blue-600">{result.sleepDuration} jam</p>
            </div>
          </div>

          {/* Score */}
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Skor Rekomendasi</span>
              <span className="text-2xl font-bold text-green-600">{(result.score * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                style={{ width: `${result.score * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom CSS Bar Chart */}
      {breakdownData.length > 0 && (
        <Card className="border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-700">Analisis Faktor Kriteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {breakdownData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                    <span className="text-sm font-bold text-slate-600">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-4 rounded-full transition-all"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Card */}
      <Card className="border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-700">Tips Tidur Sehat</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.tips.map((tip, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-slate-700">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
