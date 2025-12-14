"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

interface BarkUploadProps {
  dogId: string
  onUploadComplete: (result: BarkAnalysisResult) => void
}

export interface BarkAnalysisResult {
  id: string
  timestamp: Date
  emotionType: "alert" | "anxiety" | "playful" | "attention" | "boredom"
  anxietyScore: number
  duration: number
  audioUrl?: string
  videoUrl?: string
}

export function BarkUpload({ dogId, onUploadComplete }: BarkUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [recording, setRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    // Simulate AI analysis (in production, this would call your bark classification API)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockResult: BarkAnalysisResult = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      emotionType: ["alert", "anxiety", "playful", "attention", "boredom"][Math.floor(Math.random() * 5)] as BarkAnalysisResult["emotionType"],
      anxietyScore: Math.floor(Math.random() * 10) + 1,
      duration: Math.floor(Math.random() * 30) + 5,
    }

    onUploadComplete(mockResult)
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (videoInputRef.current) videoInputRef.current.value = ""
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      recorder.ondataavailable = (e) => chunks.push(e.data)
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" })
        // In production, upload blob to storage and analyze
        setUploading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const mockResult: BarkAnalysisResult = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          emotionType: ["alert", "anxiety", "playful", "attention", "boredom"][Math.floor(Math.random() * 5)] as BarkAnalysisResult["emotionType"],
          anxietyScore: Math.floor(Math.random() * 10) + 1,
          duration: Math.floor(Math.random() * 30) + 5,
        }

        onUploadComplete(mockResult)
        setUploading(false)
        stream.getTracks().forEach((track) => track.stop())
      }

      recorder.start()
      setMediaRecorder(recorder)
      setRecording(true)
    } catch (err) {
      console.error("Failed to start recording:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setRecording(false)
      setMediaRecorder(null)
    }
  }

  return (
    <div className="rounded-lg border border-dashed border-border p-6">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </div>

        <h3 className="mt-4 text-lg font-semibold">Upload or Record Bark</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Capture your dog&apos;s barking for AI analysis
        </p>

        {uploading ? (
          <div className="mt-6">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-2 text-sm text-muted-foreground">Analyzing bark...</p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload Audio
            </Button>

            <Button
              variant="outline"
              onClick={() => videoInputRef.current?.click()}
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Upload Video
            </Button>

            {recording ? (
              <Button variant="destructive" onClick={stopRecording}>
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="6" width="12" height="12" rx="1" />
                </svg>
                Stop Recording
              </Button>
            ) : (
              <Button onClick={startRecording}>
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
                Record Now
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
