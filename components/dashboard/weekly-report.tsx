"use client"

import type { BarkAnalysisResult } from "./bark-upload"

interface WeeklyReportProps {
  analyses: BarkAnalysisResult[]
  previousWeekAnalyses?: BarkAnalysisResult[]
}

export function WeeklyReport({ analyses, previousWeekAnalyses = [] }: WeeklyReportProps) {
  const totalBarks = analyses.length
  const prevTotalBarks = previousWeekAnalyses.length
  const barkChange = prevTotalBarks > 0
    ? ((totalBarks - prevTotalBarks) / prevTotalBarks * 100).toFixed(0)
    : 0

  const avgAnxiety = analyses.length > 0
    ? analyses.reduce((sum, a) => sum + a.anxietyScore, 0) / analyses.length
    : 0

  const prevAvgAnxiety = previousWeekAnalyses.length > 0
    ? previousWeekAnalyses.reduce((sum, a) => sum + a.anxietyScore, 0) / previousWeekAnalyses.length
    : 0

  const anxietyChange = prevAvgAnxiety > 0
    ? ((avgAnxiety - prevAvgAnxiety) / prevAvgAnxiety * 100).toFixed(0)
    : 0

  const emotionCounts = analyses.reduce((acc, a) => {
    acc[a.emotionType] = (acc[a.emotionType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const emotionData = [
    { type: "alert", label: "Alert", color: "#eab308", count: emotionCounts.alert || 0 },
    { type: "anxiety", label: "Anxiety", color: "#ef4444", count: emotionCounts.anxiety || 0 },
    { type: "playful", label: "Playful", color: "#22c55e", count: emotionCounts.playful || 0 },
    { type: "attention", label: "Attention", color: "#3b82f6", count: emotionCounts.attention || 0 },
    { type: "boredom", label: "Boredom", color: "#a855f7", count: emotionCounts.boredom || 0 },
  ].filter(e => e.count > 0)

  const total = emotionData.reduce((sum, e) => sum + e.count, 0)

  return (
    <div className="rounded-lg border border-border/40 bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Weekly Report</h3>
        <span className="text-sm text-muted-foreground">Last 7 days</span>
      </div>

      {analyses.length === 0 ? (
        <p className="mt-4 text-center text-muted-foreground">
          No data yet. Start recording barks to generate your weekly report!
        </p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="text-sm text-muted-foreground">Total Barks</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold">{totalBarks}</span>
                {Number(barkChange) !== 0 && (
                  <span className={`text-sm ${Number(barkChange) < 0 ? "text-green-600" : "text-red-600"}`}>
                    {Number(barkChange) > 0 ? "+" : ""}{barkChange}%
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="text-sm text-muted-foreground">Avg Anxiety Score</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold">{avgAnxiety.toFixed(1)}</span>
                {Number(anxietyChange) !== 0 && (
                  <span className={`text-sm ${Number(anxietyChange) < 0 ? "text-green-600" : "text-red-600"}`}>
                    {Number(anxietyChange) > 0 ? "+" : ""}{anxietyChange}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Simple bar chart representation */}
          <div className="mt-6">
            <h4 className="mb-3 text-sm font-medium">Bark Type Distribution</h4>
            <div className="space-y-2">
              {emotionData.map((emotion) => (
                <div key={emotion.type} className="flex items-center gap-3">
                  <div className="w-20 text-sm text-muted-foreground">{emotion.label}</div>
                  <div className="flex-1">
                    <div className="h-6 rounded-full bg-muted">
                      <div
                        className="h-6 rounded-full"
                        style={{
                          width: `${(emotion.count / total) * 100}%`,
                          backgroundColor: emotion.color,
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-right text-sm font-medium">
                    {((emotion.count / total) * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Context insights */}
          <div className="mt-6 rounded-lg bg-primary/5 p-4">
            <h4 className="font-medium">Key Insights</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {emotionData[0] && (
                <li>
                  Most common bark type: <strong>{emotionData[0].label}</strong> ({emotionData[0].count} times)
                </li>
              )}
              {avgAnxiety > 6 && (
                <li className="text-yellow-600">
                  Anxiety levels are elevated. Consider reviewing triggers and calming techniques.
                </li>
              )}
              {Number(barkChange) < -10 && (
                <li className="text-green-600">
                  Great progress! Barking has decreased by {Math.abs(Number(barkChange))}% this week.
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
