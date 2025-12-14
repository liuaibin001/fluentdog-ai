"use client"

import { Badge } from "@/components/ui/badge"
import type { BarkAnalysisResult } from "./bark-upload"

interface BarkAnalysisCardProps {
  analysis: BarkAnalysisResult
}

const emotionConfig = {
  alert: {
    label: "Alert",
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    description: "Warning or alarm bark - your dog detected something",
  },
  anxiety: {
    label: "Anxiety",
    color: "bg-red-500/10 text-red-600 border-red-500/20",
    description: "Stress or separation anxiety bark",
  },
  playful: {
    label: "Playful",
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    description: "Happy, excited play bark",
  },
  attention: {
    label: "Attention",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    description: "Seeking your attention or interaction",
  },
  boredom: {
    label: "Boredom",
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    description: "Understimulated or monotonous bark",
  },
}

export function BarkAnalysisCard({ analysis }: BarkAnalysisCardProps) {
  const emotion = emotionConfig[analysis.emotionType]
  const anxietyLevel = analysis.anxietyScore <= 3 ? "Low" : analysis.anxietyScore <= 6 ? "Medium" : "High"
  const anxietyColor = analysis.anxietyScore <= 3 ? "text-green-600" : analysis.anxietyScore <= 6 ? "text-yellow-600" : "text-red-600"

  return (
    <div className="rounded-lg border border-border/40 bg-card p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {analysis.timestamp.toLocaleString()}
            </p>
            <Badge className={emotion.color}>{emotion.label}</Badge>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-muted-foreground">Anxiety Score</div>
          <div className={`text-2xl font-bold ${anxietyColor}`}>
            {analysis.anxietyScore}/10
          </div>
          <div className={`text-xs ${anxietyColor}`}>{anxietyLevel}</div>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{emotion.description}</p>

      <div className="mt-4 flex items-center gap-4 border-t border-border/40 pt-4 text-sm">
        <div>
          <span className="text-muted-foreground">Duration:</span>{" "}
          <span className="font-medium">{analysis.duration}s</span>
        </div>
      </div>
    </div>
  )
}
