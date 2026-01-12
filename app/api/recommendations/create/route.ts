import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { calculateSleepRecommendation } from "@/lib/sleep-calculator"

export async function POST(request: NextRequest) {
  try {
    const { userId, age, wakeUpTime, activityLevel, healthStatus, stressLevel, screenTime } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Calculate recommendation using SAW algorithm
    const recommendation = calculateSleepRecommendation({
      age,
      wakeUpTime,
      activityLevel,
      healthStatus,
      stressLevel,
      screenTime,
    })

    // Save to database
    const result = await query(
      `INSERT INTO recommendations 
       (user_id, age, wake_up_time, activity_level, health_status, stress_level, screen_time, bedtime, sleep_duration, score)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        age,
        wakeUpTime,
        activityLevel,
        healthStatus,
        stressLevel || null,
        screenTime || null,
        recommendation.bedtime,
        recommendation.sleepDuration,
        recommendation.score,
      ],
    )

    return NextResponse.json({
      id: (result as any).insertId,
      ...recommendation,
    })
  } catch (error) {
    console.error("Create recommendation error:", error)
    return NextResponse.json({ error: "Failed to create recommendation" }, { status: 500 })
  }
}
