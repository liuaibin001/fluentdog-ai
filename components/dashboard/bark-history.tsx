"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import type { BarkAnalysisResult } from "./bark-upload"

interface BarkHistoryProps {
  analyses: BarkAnalysisResult[]
  dogName?: string
}

type ViewMode = "timeline" | "calendar"

const emotionConfig = {
  alert: {
    label: "Alert",
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
  },
  anxiety: {
    label: "Anxiety",
    color: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
  playful: {
    label: "Playful",
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  attention: {
    label: "Attention",
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  boredom: {
    label: "Boredom",
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export function BarkHistory({ analyses, dogName }: BarkHistoryProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Group analyses by date for timeline view
  const groupedByDate = useMemo(() => {
    const groups: { [key: string]: BarkAnalysisResult[] } = {}
    analyses.forEach((analysis) => {
      const dateKey = new Date(analysis.timestamp).toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(analysis)
    })
    // Sort by date descending
    return Object.entries(groups).sort(
      (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
    )
  }, [analyses])

  // Get analyses count by date for calendar view
  const analysesByDate = useMemo(() => {
    const counts: { [key: string]: { count: number; emotions: BarkAnalysisResult["emotionType"][] } } = {}
    analyses.forEach((analysis) => {
      const dateKey = new Date(analysis.timestamp).toDateString()
      if (!counts[dateKey]) {
        counts[dateKey] = { count: 0, emotions: [] }
      }
      counts[dateKey].count++
      counts[dateKey].emotions.push(analysis.emotionType)
    })
    return counts
  }, [analyses])

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days: (Date | null)[] = []

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }, [currentMonth])

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1))
  }

  const getSelectedDateAnalyses = () => {
    if (!selectedDate) return []
    return analyses.filter(
      (a) => new Date(a.timestamp).toDateString() === selectedDate.toDateString()
    )
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <div>
          <h2 className="text-lg font-semibold">Bark History</h2>
          <p className="text-sm text-gray-500">
            {analyses.length} recordings {dogName ? `for ${dogName}` : ""}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex rounded-full bg-gray-100 p-1">
          <button
            onClick={() => setViewMode("timeline")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "timeline"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Timeline
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "calendar"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Calendar
          </button>
        </div>
      </div>

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <div className="max-h-[600px] overflow-y-auto p-4">
          {groupedByDate.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">No bark recordings yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload or record your dog&apos;s barking to see the analysis here
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedByDate.map(([dateStr, dayAnalyses]) => (
                <div key={dateStr}>
                  {/* Date Header */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatDate(dateStr)}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      {dayAnalyses.length} bark{dayAnalyses.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Timeline Items */}
                  <div className="relative ml-3 border-l-2 border-gray-200 pl-6">
                    {dayAnalyses
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((analysis, idx) => {
                        const emotion = emotionConfig[analysis.emotionType]
                        return (
                          <div
                            key={analysis.id}
                            className={`relative pb-6 ${idx === dayAnalyses.length - 1 ? "pb-0" : ""}`}
                          >
                            {/* Timeline Dot */}
                            <div
                              className={`absolute -left-[31px] h-4 w-4 rounded-full border-2 border-white ${emotion.color}`}
                            />

                            {/* Card */}
                            <div className={`rounded-xl border p-4 ${emotion.bgColor} ${emotion.borderColor}`}>
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Badge className={`${emotion.bgColor} ${emotion.textColor} border ${emotion.borderColor}`}>
                                      {emotion.label}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      {formatTime(analysis.timestamp)}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-sm text-gray-600">
                                    Duration: {analysis.duration}s
                                  </p>
                                </div>

                                {/* Anxiety Score */}
                                <div className="text-right">
                                  <div className="text-xs text-gray-500">Anxiety</div>
                                  <div
                                    className={`text-xl font-bold ${
                                      analysis.anxietyScore <= 3
                                        ? "text-green-600"
                                        : analysis.anxietyScore <= 6
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {analysis.anxietyScore}/10
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <div className="p-4">
          {/* Month Navigation */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => navigateMonth(-1)}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={() => navigateMonth(1)}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-2 text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} className="aspect-square" />
              }

              const dateKey = day.toDateString()
              const dayData = analysesByDate[dateKey]
              const isToday = day.toDateString() === new Date().toDateString()
              const isSelected = selectedDate?.toDateString() === dateKey
              const hasData = dayData && dayData.count > 0

              // Get dominant emotion for the day
              let dominantColor = ""
              if (hasData) {
                const emotionCounts: { [key: string]: number } = {}
                dayData.emotions.forEach((e) => {
                  emotionCounts[e] = (emotionCounts[e] || 0) + 1
                })
                const dominant = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof emotionConfig
                dominantColor = emotionConfig[dominant].color
              }

              return (
                <button
                  key={dateKey}
                  onClick={() => setSelectedDate(hasData ? day : null)}
                  className={`relative aspect-square rounded-lg p-1 text-sm transition-all ${
                    isSelected
                      ? "bg-primary text-white ring-2 ring-primary ring-offset-2"
                      : isToday
                      ? "bg-gray-100 font-semibold"
                      : "hover:bg-gray-50"
                  } ${hasData ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span className="block">{day.getDate()}</span>
                  {hasData && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                      <div className={`h-1.5 w-1.5 rounded-full ${dominantColor}`} />
                    </div>
                  )}
                  {hasData && dayData.count > 1 && (
                    <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">
                      {dayData.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Selected Date Details */}
          {selectedDate && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <h4 className="mb-3 font-semibold">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
              <div className="max-h-48 space-y-2 overflow-y-auto">
                {getSelectedDateAnalyses().map((analysis) => {
                  const emotion = emotionConfig[analysis.emotionType]
                  return (
                    <div
                      key={analysis.id}
                      className={`flex items-center justify-between rounded-lg border p-3 ${emotion.bgColor} ${emotion.borderColor}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${emotion.color}`} />
                        <span className="text-sm font-medium">{emotion.label}</span>
                        <span className="text-xs text-gray-500">
                          {formatTime(analysis.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm font-semibold">
                        Anxiety: {analysis.anxietyScore}/10
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-3 border-t border-gray-100 pt-4">
            {Object.entries(emotionConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={`h-2.5 w-2.5 rounded-full ${config.color}`} />
                <span className="text-xs text-gray-600">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
