"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CriteriaInfo() {
  const criteria = [
    {
      title: "Usia",
      description:
        "Kebutuhan tidur bervariasi berdasarkan usia. Anak-anak membutuhkan tidur lebih lama dibanding orang dewasa.",
      details: [
        "Anak-anak (8-13 tahun): 9-12 jam",
        "Remaja (13-18 tahun): 8-10 jam",
        "Dewasa (18-65 tahun): 7-9 jam",
        "Lansia (65+ tahun): 7-8 jam",
      ],
    },
    {
      title: "Tingkat Aktivitas",
      description: "Aktivitas fisik yang lebih tinggi memerlukan waktu pemulihan yang lebih lama melalui tidur.",
      details: [
        "Rendah: Pekerjaan santai, sedikit gerakan - Butuh tidur lebih sedikit",
        "Sedang: Pekerjaan kantor standar - Keseimbangan optimal",
        "Tinggi: Olahraga/kerja fisik - Butuh tidur lebih banyak",
      ],
    },
    {
      title: "Status Kesehatan",
      description: "Kondisi kesehatan yang kurang prima memerlukan tidur yang lebih banyak untuk pemulihan.",
      details: [
        "Fit: Kondisi kesehatan baik - Durasi tidur normal",
        "Kurang Fit: Gangguan kesehatan - Butuh tidur lebih banyak",
      ],
    },
    {
      title: "Stres dan Layar",
      description:
        "Tingkat stres dan penggunaan layar elektronik mempengaruhi kualitas dan durasi tidur yang dibutuhkan.",
      details: [
        "Stres tinggi mengurangi kualitas tidur",
        "Cahaya biru dari layar mengganggu produksi melatonin",
        "Hindari layar 1 jam sebelum tidur",
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Kriteria Rekomendasi Tidur</h2>
        <p className="text-slate-600">Pahami faktor-faktor yang mempengaruhi kebutuhan tidur ideal Anda</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {criteria.map((criterion, index) => (
          <Card key={index} className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-600">{criterion.title}</CardTitle>
              <CardDescription>{criterion.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {criterion.details.map((detail, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-blue-500">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
