"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { BarkAnalysisResult } from "./bark-upload"

interface BarkAnalysisCardProps {
  analysis: BarkAnalysisResult
}

const emotionConfig = {
  alert: {
    label: "Alert",
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    bgColor: "bg-yellow-50",
    description: "Warning or alarm bark - your dog detected something",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  anxiety: {
    label: "Anxiety",
    color: "bg-red-500/10 text-red-600 border-red-500/20",
    bgColor: "bg-red-50",
    description: "Stress or separation anxiety bark",
    icon: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  playful: {
    label: "Playful",
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    bgColor: "bg-green-50",
    description: "Happy, excited play bark",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  attention: {
    label: "Attention",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    bgColor: "bg-blue-50",
    description: "Seeking your attention or interaction",
    icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  },
  boredom: {
    label: "Boredom",
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    bgColor: "bg-purple-50",
    description: "Understimulated or monotonous bark",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
}

export function BarkAnalysisCard({ analysis }: BarkAnalysisCardProps) {
  const [expanded, setExpanded] = useState(false)

  // Handle non-dog bark case
  if (analysis.isDogBark === false) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Not a Dog Bark</h3>
            <p className="text-sm text-gray-500">
              Detected: {analysis.nonBarkSound?.replace(/_/g, " ") || "Unknown sound"}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <span>Confidence: {Math.round((analysis.dogBarkConfidence || 0) * 100)}%</span>
          <span>|</span>
          <span>{new Date(analysis.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    )
  }

  const emotion = emotionConfig[analysis.emotionType]
  const anxietyLevel = analysis.anxietyScore <= 3 ? "Low" : analysis.anxietyScore <= 6 ? "Medium" : "High"
  const anxietyColor = analysis.anxietyScore <= 3 ? "text-green-600" : analysis.anxietyScore <= 6 ? "text-yellow-600" : "text-red-600"
  const anxietyBgColor = analysis.anxietyScore <= 3 ? "bg-green-500" : analysis.anxietyScore <= 6 ? "bg-yellow-500" : "bg-red-500"

  return (
    <div className={`rounded-xl border border-gray-200 bg-white overflow-hidden`}>
      {/* Header */}
      <div className={`${emotion.bgColor} px-5 py-4`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80">
              <svg className={`h-6 w-6 ${emotion.color.split(" ")[1]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={emotion.icon} />
              </svg>
            </div>
            <div>
              <Badge className={`${emotion.color} text-sm`}>{emotion.label}</Badge>
              <p className="mt-1 text-sm text-gray-600">{emotion.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {/* Anxiety Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Anxiety Level</span>
            <span className={`text-lg font-bold ${anxietyColor}`}>{analysis.anxietyScore}/10 ({anxietyLevel})</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded-full ${anxietyBgColor} transition-all`}
              style={{ width: `${analysis.anxietyScore * 10}%` }}
            />
          </div>
          {analysis.anxietyRationale && (
            <p className="mt-2 text-sm text-gray-500">{analysis.anxietyRationale}</p>
          )}
        </div>

        {/* Confidence & Duration */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">Detection</div>
            <div className="font-semibold text-gray-900">{Math.round((analysis.dogBarkConfidence || 0.9) * 100)}%</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">Emotion</div>
            <div className="font-semibold text-gray-900">{Math.round((analysis.emotionConfidence || 0.8) * 100)}%</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">Duration</div>
            <div className="font-semibold text-gray-900">{analysis.duration}s</div>
          </div>
        </div>

        {/* Triggers */}
        {analysis.triggerCandidates && analysis.triggerCandidates.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Possible Triggers</h4>
            <div className="space-y-2">
              {analysis.triggerCandidates.map((trigger, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${trigger.confidence > 0.7 ? 'bg-green-500' : trigger.confidence > 0.4 ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                    <span className="text-sm text-gray-700 capitalize">{trigger.trigger.replace(/_/g, " ")}</span>
                  </div>
                  <span className="text-xs text-gray-500">{Math.round(trigger.confidence * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expandable Details */}
        {(analysis.followUpQuestions && analysis.followUpQuestions.length > 0) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {expanded ? "Show less" : "Show recommendations"}
            <svg className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {expanded && analysis.followUpQuestions && analysis.followUpQuestions.length > 0 && (
          <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Consider These Questions</h4>
            <ul className="space-y-1">
              {analysis.followUpQuestions.map((question, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-blue-700">
                  <span className="text-blue-400">•</span>
                  {question}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Timestamp */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
          Analyzed at {new Date(analysis.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
