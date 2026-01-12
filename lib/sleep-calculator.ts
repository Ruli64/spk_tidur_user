// SAW (Simple Additive Weighting) Method untuk rekomendasi jam tidur ideal

interface SleepInput {
  age: number
  wakeUpTime: string
  activityLevel: "low" | "medium" | "high"
  healthStatus: "fit" | "unfit"
  stressLevel?: "low" | "medium" | "high"
  screenTime?: "minimal" | "moderate" | "high"
}

interface SleepRecommendation {
  bedtime: string
  wakeUpTime: string
  sleepDuration: number
  tips: string[]
  score: number
  breakdown: {
    ageFactor: number
    activityFactor: number
    healthFactor: number
    stressFactor: number
    screenTimeFactor: number
  }
}

const WEIGHTS = {
  ageFactor: 0.25,
  activityFactor: 0.25,
  healthFactor: 0.25,
  stressFactor: 0.15,
  screenTimeFactor: 0.1,
}

// Normalisasi score (0-1)
function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min)
}

// Hitung skor berdasarkan usia
function getAgeScore(age: number): number {
  if (age < 8) return 0.3
  if (age < 13) return 0.5
  if (age < 18) return 0.7
  if (age < 65) return 1.0
  if (age < 80) return 0.8
  return 0.6
}

// Hitung skor berdasarkan aktivitas
function getActivityScore(level: "low" | "medium" | "high"): number {
  const scores = {
    low: 0.7,
    medium: 1.0,
    high: 0.9,
  }
  return scores[level]
}

// Hitung skor berdasarkan status kesehatan
function getHealthScore(status: "fit" | "unfit"): number {
  return status === "fit" ? 1.0 : 0.7
}

function getStressScore(level: "low" | "medium" | "high"): number {
  const scores = {
    low: 1.0, // Optimal, normal sleep
    medium: 0.85, // Perlu tidur sedikit lebih lama
    high: 0.7, // Perlu banyak tidur untuk recovery
  }
  return scores[level]
}

function getScreenTimeScore(screenTime: "minimal" | "moderate" | "high"): number {
  const scores = {
    minimal: 1.0, // Optimal sleep quality
    moderate: 0.9, // Sedikit mengurangi kualitas
    high: 0.75, // Signifikan mengurangi kualitas tidur
  }
  return scores[screenTime]
}

// Hitung durasi tidur ideal
function calculateSleepDuration(age: number, activityLevel: string, healthStatus: string): number {
  let baseDuration = 7.5

  if (age < 13) baseDuration = 9.5
  else if (age < 18) baseDuration = 8.5
  else if (age < 65) baseDuration = 7.5
  else baseDuration = 7

  if (activityLevel === "high") baseDuration += 0.5
  if (activityLevel === "low") baseDuration -= 0.3

  if (healthStatus === "unfit") baseDuration += 0.5

  return Math.round(baseDuration * 2) / 2
}

// Parse waktu
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

// Convert menit ke format HH:MM
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60) % 24
  const mins = minutes % 60
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
}

// Generate tips berdasarkan profil
function generateTips(
  age: number,
  sleepDuration: number,
  healthStatus: string,
  stressLevel?: string,
  screenTime?: string,
): string[] {
  const tips = []

  // Tips umum
  tips.push("Ciptakan rutinitas tidur yang konsisten - tidur dan bangun pada waktu yang sama setiap hari.")

  if (sleepDuration >= 8) {
    tips.push("Durasi tidur Anda cukup panjang, pastikan kamar tidur gelap, sejuk, dan tenang.")
  } else {
    tips.push("Optimalkan kualitas tidur dengan menghindari gadget 1 jam sebelum tidur.")
  }

  if (age < 18) {
    tips.push("Sebagai remaja, tidur berkualitas sangat penting untuk perkembangan dan pembelajaran.")
  } else if (age > 65) {
    tips.push("Jaga kesehatan dan aktivitas fisik teratur untuk meningkatkan kualitas tidur.")
  }

  if (healthStatus === "unfit") {
    tips.push("Konsultasikan dengan dokter jika mengalami gangguan tidur atau insomnia.")
    tips.push("Hindari kafein dan alkohol minimal 4 jam sebelum tidur.")
  } else {
    tips.push("Lakukan olahraga ringan atau meditasi sebelum tidur untuk relaksasi.")
  }

  if (stressLevel === "high") {
    tips.push(
      "Tingkat stres tinggi Anda membutuhkan tidur lebih banyak. Coba teknik relaksasi seperti deep breathing atau yoga.",
    )
    tips.push("Hindari pekerjaan atau hal yang menimbulkan stres minimal 2 jam sebelum tidur.")
  }

  if (screenTime === "high") {
    tips.push(
      "Penggunaan layar banyak sebelum tidur mengganggu produksi melatonin. Mulai kurangi 1-2 jam sebelum tidur.",
    )
    tips.push("Gunakan mode malam (night mode) atau filter cahaya biru jika harus menggunakan layar.")
  } else if (screenTime === "moderate") {
    tips.push("Coba kurangi penggunaan layar 30 menit sebelum tidur untuk meningkatkan kualitas tidur.")
  }

  return tips
}

export function calculateSleepRecommendation(input: SleepInput): SleepRecommendation {
  // 1. Hitung skor untuk setiap kriteria
  const ageScore = getAgeScore(input.age)
  const activityScore = getActivityScore(input.activityLevel)
  const healthScore = getHealthScore(input.healthStatus)
  const stressScore = getStressScore(input.stressLevel || "medium")
  const screenTimeScore = getScreenTimeScore(input.screenTime || "moderate")

  // 2. Hitung skor total dengan SAW (weighted sum)
  const totalScore =
    ageScore * WEIGHTS.ageFactor +
    activityScore * WEIGHTS.activityFactor +
    healthScore * WEIGHTS.healthFactor +
    stressScore * WEIGHTS.stressFactor +
    screenTimeScore * WEIGHTS.screenTimeFactor

  // 3. Hitung durasi tidur
  const sleepDuration = calculateSleepDuration(input.age, input.activityLevel, input.healthStatus)

  // 4. Hitung waktu tidur (bedtime)
  const wakeUpMinutes = timeToMinutes(input.wakeUpTime)
  const sleepMinutes = sleepDuration * 60
  const bedtimeMinutes = wakeUpMinutes - sleepMinutes

  const bedtime = minutesToTime(bedtimeMinutes < 0 ? bedtimeMinutes + 24 * 60 : bedtimeMinutes)

  // 5. Generate tips
  const tips = generateTips(input.age, sleepDuration, input.healthStatus, input.stressLevel, input.screenTime)

  return {
    bedtime,
    wakeUpTime: input.wakeUpTime,
    sleepDuration,
    tips,
    score: totalScore,
    breakdown: {
      ageFactor: ageScore,
      activityFactor: activityScore,
      healthFactor: healthScore,
      stressFactor: stressScore,
      screenTimeFactor: screenTimeScore,
    },
  }
}
