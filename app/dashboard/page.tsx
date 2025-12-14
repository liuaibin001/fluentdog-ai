"use client"

import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { AddDogDialog } from "@/components/dashboard/add-dog-dialog"
import { BarkUpload, type BarkAnalysisResult } from "@/components/dashboard/bark-upload"
import { BarkAnalysisCard } from "@/components/dashboard/bark-analysis-card"
import { DailySummary } from "@/components/dashboard/daily-summary"
import { WeeklyReport } from "@/components/dashboard/weekly-report"
import { ContextEvents } from "@/components/dashboard/context-events"
import { TrainingPlan } from "@/components/dashboard/training-plan"

interface Dog {
  id: string
  name: string
  breed: string
  age: string
}

interface ContextEvent {
  id: string
  name: string
  time: string
  recurring: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [dogs, setDogs] = useState<Dog[]>([])
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null)
  const [showAddDog, setShowAddDog] = useState(false)
  const [analyses, setAnalyses] = useState<BarkAnalysisResult[]>([])
  const [contextEvents, setContextEvents] = useState<ContextEvent[]>([])
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "reports">("overview")

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = "/login"
        return
      }

      setUser({ email: user.email || "" })
      setLoading(false)
    }

    checkUser()
  }, [])

  const handleAddDog = (dog: { name: string; breed: string; age: string }) => {
    const newDog = { ...dog, id: Math.random().toString(36).substr(2, 9) }
    setDogs([...dogs, newDog])
    setSelectedDog(newDog)
  }

  const handleUploadComplete = (result: BarkAnalysisResult) => {
    setAnalyses([result, ...analyses])
  }

  const handleAddEvent = (event: Omit<ContextEvent, "id">) => {
    setContextEvents([
      ...contextEvents,
      { ...event, id: Math.random().toString(36).substr(2, 9) },
    ])
  }

  const handleRemoveEvent = (id: string) => {
    setContextEvents(contextEvents.filter((e) => e.id !== id))
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // Today's analyses
  const today = new Date()
  const todayAnalyses = analyses.filter((a) => {
    const analysisDate = new Date(a.timestamp)
    return (
      analysisDate.getDate() === today.getDate() &&
      analysisDate.getMonth() === today.getMonth() &&
      analysisDate.getFullYear() === today.getFullYear()
    )
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary-foreground"
              >
                <path d="M12 2a3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 3-3" />
                <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2" />
                <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2" />
              </svg>
            </div>
            <span className="text-xl font-bold">FluentDog</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Dog selector / Add dog */}
        {dogs.length === 0 ? (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-semibold">Add Your First Dog</h2>
              <p className="mt-2 text-muted-foreground">
                Create a profile for your furry friend to start tracking their barks
              </p>
              <Button className="mt-6" onClick={() => setShowAddDog(true)}>
                Add Dog
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Dog selector header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{selectedDog?.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {selectedDog?.breed} {selectedDog?.age && `• ${selectedDog.age}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {dogs.length > 1 && (
                  <select
                    value={selectedDog?.id}
                    onChange={(e) =>
                      setSelectedDog(dogs.find((d) => d.id === e.target.value) || null)
                    }
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    {dogs.map((dog) => (
                      <option key={dog.id} value={dog.id}>
                        {dog.name}
                      </option>
                    ))}
                  </select>
                )}
                <Button variant="outline" size="sm" onClick={() => setShowAddDog(true)}>
                  Add Another Dog
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-1 rounded-lg border border-border/40 bg-muted/50 p-1">
              {[
                { id: "overview", label: "Overview" },
                { id: "history", label: "Bark History" },
                { id: "reports", label: "Reports" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                  {/* Daily Summary */}
                  <DailySummary analyses={todayAnalyses} />

                  {/* Upload / Record */}
                  <BarkUpload
                    dogId={selectedDog?.id || ""}
                    onUploadComplete={handleUploadComplete}
                  />

                  {/* Recent Analysis */}
                  {analyses.slice(0, 3).map((analysis) => (
                    <BarkAnalysisCard key={analysis.id} analysis={analysis} />
                  ))}
                </div>

                <div className="space-y-6">
                  {/* Context Events */}
                  <ContextEvents
                    events={contextEvents}
                    onAddEvent={handleAddEvent}
                    onRemoveEvent={handleRemoveEvent}
                  />

                  {/* Training Plan */}
                  <TrainingPlan analyses={analyses} isPremium={true} />
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">All Bark Recordings</h2>
                {analyses.length === 0 ? (
                  <p className="text-muted-foreground">
                    No recordings yet. Upload or record your first bark!
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {analyses.map((analysis) => (
                      <BarkAnalysisCard key={analysis.id} analysis={analysis} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === "reports" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <WeeklyReport analyses={analyses} />
                <div className="space-y-6">
                  <div className="rounded-lg border border-border/40 bg-card p-6">
                    <h3 className="font-semibold">Export Reports</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Generate professional reports to share with your veterinarian
                    </p>
                    <div className="mt-4 flex gap-3">
                      <Button variant="outline" size="sm" disabled={analyses.length === 0}>
                        Export PDF
                      </Button>
                      <Button variant="outline" size="sm" disabled={analyses.length === 0}>
                        Export CSV
                      </Button>
                    </div>
                  </div>
                  <TrainingPlan analyses={analyses} isPremium={true} />
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <AddDogDialog
        open={showAddDog}
        onClose={() => setShowAddDog(false)}
        onAdd={handleAddDog}
      />
    </div>
  )
}
