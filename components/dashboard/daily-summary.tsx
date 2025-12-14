"use client"

import type { BarkAnalysisResult } from "./bark-upload"

interface DailySummaryProps {
  analyses: BarkAnalysisResult[]
  date?: Date
}

export function DailySummary({ analyses, date = new Date() }: DailySummaryProps) {
  const totalBarks = analyses.length
  const avgAnxiety = analyses.length > 0
    ? (analyses.reduce((sum, a) => sum + a.anxietyScore, 0) / analyses.length).toFixed(1)
    : 0

  const emotionCounts = analyses.reduce((acc, a) => {
    acc[a.emotionType] = (acc[a.emotionType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]

  const emotionLabels = {
    alert: "Alert",
    anxiety: "Anxiety",
    playful: "Playful",
    attention: "Attention-seeking",
    boredom: "Boredom",
  }

  return (
    <div className="rounded-lg border border-border/40 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Daily Summary</h3>
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
        </span>
      </div>

      {analyses.length === 0 ? (
        <p className="mt-4 text-center text-muted-foreground">
          No bark recordings today. Upload or record a bark to get started!
        </p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-background/50 p-3 text-center">
              <div className="text-2xl font-bold text-primary">{totalBarks}</div>
              <div className="text-xs text-muted-foreground">Total Barks</div>
            </div>
            <div className="rounded-lg bg-background/50 p-3 text-center">
              <div className="text-2xl font-bold text-primary">{avgAnxiety}</div>
              <div className="text-xs text-muted-foreground">Avg Anxiety</div>
            </div>
            <div className="rounded-lg bg-background/50 p-3 text-center">
              <div className="text-2xl font-bold text-primary">
                {topEmotion ? topEmotion[1] : 0}
              </div>
              <div className="text-xs text-muted-foreground">
                {topEmotion ? emotionLabels[topEmotion[0] as keyof typeof emotionLabels] : "N/A"}
              </div>
            </div>
          </div>

          {topEmotion && (
            <div className="mt-4 rounded-lg bg-background/50 p-4">
              <p className="text-sm">
                <span className="font-medium">Today&apos;s insight:</span>{" "}
                Your dog barked <strong>{totalBarks}</strong> times. The most common type was{" "}
                <strong>{emotionLabels[topEmotion[0] as keyof typeof emotionLabels]}</strong> ({topEmotion[1]} times).
                {Number(avgAnxiety) > 6 && (
                  <span className="text-yellow-600">
                    {" "}Average anxiety is elevated - consider reviewing triggers.
                  </span>
                )}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
