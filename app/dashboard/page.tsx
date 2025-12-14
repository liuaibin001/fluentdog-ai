"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
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
  image?: string
}

interface ContextEvent {
  id: string
  name: string
  time: string
  recurring: boolean
}

type Tab = "home" | "dogs" | "reports"
type ActionTab = "new_analysis" | "pending_review" | "weekly_summary" | "training"

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string; name?: string; avatar?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [dogs, setDogs] = useState<Dog[]>([])
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null)
  const [showAddDog, setShowAddDog] = useState(false)
  const [analyses, setAnalyses] = useState<BarkAnalysisResult[]>([])
  const [contextEvents, setContextEvents] = useState<ContextEvent[]>([])
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [activeAction, setActiveAction] = useState<ActionTab>("new_analysis")
  const [userPlan, setUserPlan] = useState<"free" | "premium" | "coach">("premium") // Mock plan

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = "/login"
        return
      }

      setUser({
        email: user.email || "",
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
        avatar: user.user_metadata?.avatar_url
      })
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
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
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

  const pendingReviews = analyses.filter(a => !a.reviewed).length

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons8-guide-dog-48.png"
              alt="FluentDog"
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="text-xl font-bold">FluentDog</span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1">
            {[
              { id: "home", label: "Home", icon: (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              )},
              { id: "dogs", label: "My Dogs", icon: (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )},
              { id: "reports", label: "Reports", icon: (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )},
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Sign out
            </button>
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
              {user?.avatar ? (
                <Image src={user.avatar} alt="Avatar" width={40} height={40} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Promo Banner */}
        {userPlan === "free" && (
          <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-gray-100 px-3 py-2">
                <span className="text-lg font-bold">$19.9</span>
                <span className="text-xs text-gray-500 block">per month</span>
              </div>
              <p className="font-medium text-gray-900">
                Upgrade to Premium and unlock AI emotion classification
              </p>
            </div>
            <Button className="rounded-full bg-gray-900 px-6 hover:bg-gray-800">
              Upgrade now
            </Button>
          </div>
        )}

        {/* Home Tab */}
        {activeTab === "home" && (
          <>
            {/* Welcome Section */}
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold">
                Welcome back! 👋
              </h1>
              <Button
                onClick={() => setShowAddDog(true)}
                className="rounded-full bg-primary px-6 hover:bg-primary/90"
              >
                Add a dog
              </Button>
            </div>

            {/* Quick Actions Card */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Quick actions</h2>

              {/* Action Tabs */}
              <div className="mb-6 flex flex-wrap gap-2">
                {[
                  { id: "new_analysis", label: "New Analysis", count: 0, active: true },
                  { id: "pending_review", label: "Pending Review", count: pendingReviews },
                  { id: "weekly_summary", label: "Weekly Summary", count: 0 },
                  { id: "training", label: "Training Plan", count: 0 },
                ].map((action) => (
                  <button
                    key={action.id}
                    onClick={() => setActiveAction(action.id as ActionTab)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      activeAction === action.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {action.label} ({action.count})
                  </button>
                ))}
              </div>

              {/* AI Assistant Tip */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Image
                    src="/icons8-guide-dog-48.png"
                    alt="FluentDog AI"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  <span className="font-semibold">FluentDog AI</span>
                  <span className="text-sm text-gray-500">Your 24/7 bark analysis assistant</span>
                </div>
                <p className="text-sm text-gray-600">
                  {activeAction === "new_analysis" && "Upload or record your dog's barking to analyze emotions and identify triggers. Regular analysis helps track patterns."}
                  {activeAction === "pending_review" && pendingReviews > 0
                    ? `You have ${pendingReviews} bark analyses waiting for your review. Reviewing helps improve accuracy.`
                    : "No pending reviews. Great job staying on top of your dog's bark analysis!"}
                  {activeAction === "weekly_summary" && "Weekly summaries help you understand your dog's barking patterns over time. Check back on Sundays!"}
                  {activeAction === "training" && "Based on your dog's bark patterns, we'll create a personalized training plan to reduce excessive barking."}
                </p>
              </div>

              {/* Action Content */}
              {activeAction === "new_analysis" && selectedDog && (
                <div className="mt-6">
                  <BarkUpload
                    dogId={selectedDog.id}
                    onUploadComplete={handleUploadComplete}
                  />
                </div>
              )}
            </div>

            {/* Recent Analyses */}
            {analyses.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-semibold">Recent analyses</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {analyses.slice(0, 3).map((analysis) => (
                    <BarkAnalysisCard key={analysis.id} analysis={analysis} />
                  ))}
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <DailySummary analyses={todayAnalyses} />

              {userPlan !== "free" && (
                <ContextEvents
                  events={contextEvents}
                  onAddEvent={handleAddEvent}
                  onRemoveEvent={handleRemoveEvent}
                />
              )}

              {userPlan === "coach" && (
                <TrainingPlan analyses={analyses} isPremium={true} />
              )}
            </div>
          </>
        )}

        {/* My Dogs Tab */}
        {activeTab === "dogs" && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold">My Dogs</h1>
              <Button
                onClick={() => setShowAddDog(true)}
                className="rounded-full bg-primary px-6 hover:bg-primary/90"
              >
                Add a dog
              </Button>
            </div>

            {/* Dog Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dogs.map((dog) => (
                <div
                  key={dog.id}
                  onClick={() => {
                    setSelectedDog(dog)
                    setActiveTab("home")
                  }}
                  className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-primary hover:shadow-md"
                >
                  {/* Dog Image Placeholder */}
                  <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-xl bg-gray-100">
                    {dog.image ? (
                      <Image src={dog.image} alt={dog.name} width={96} height={96} className="h-full w-full rounded-xl object-cover" />
                    ) : (
                      <svg className="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold">{dog.name}</h3>
                  <p className="text-sm text-gray-500">{dog.breed}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Active
                    </span>
                    <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Dog Card */}
              <button
                onClick={() => setShowAddDog(true)}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-6 text-gray-400 transition-all hover:border-primary hover:text-primary"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="font-medium">Add a dog</span>
              </button>
            </div>
          </>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold">Reports</h1>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-full" disabled={analyses.length === 0}>
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export PDF
                </Button>
                <Button variant="outline" className="rounded-full" disabled={analyses.length === 0}>
                  Export CSV
                </Button>
              </div>
            </div>

            {userPlan === "free" ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Unlock Reports</h2>
                <p className="mt-2 text-gray-500">
                  Upgrade to Premium to access weekly reports, emotion trends, and vet-grade exports.
                </p>
                <Button className="mt-6 rounded-full bg-primary px-8">
                  Upgrade to Premium
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                <WeeklyReport analyses={analyses} />

                <div className="space-y-6">
                  {/* Emotion Distribution */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <h3 className="mb-4 font-semibold">Emotion Distribution</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Alert", percentage: 32, color: "bg-yellow-500" },
                        { label: "Anxiety", percentage: 18, color: "bg-red-500" },
                        { label: "Playful", percentage: 25, color: "bg-green-500" },
                        { label: "Attention", percentage: 15, color: "bg-blue-500" },
                        { label: "Boredom", percentage: 10, color: "bg-gray-400" },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="mb-1 flex justify-between text-sm">
                            <span>{item.label}</span>
                            <span className="font-medium">{item.percentage}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-100">
                            <div
                              className={`h-full rounded-full ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Anxiety Trend */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <h3 className="mb-4 font-semibold">Anxiety Score Trend</h3>
                    <div className="flex items-end justify-between gap-2" style={{ height: '120px' }}>
                      {[4.2, 3.8, 5.1, 4.5, 3.2, 3.9, 3.5].map((score, i) => (
                        <div key={i} className="flex flex-1 flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t bg-primary/70"
                            style={{ height: `${score * 10}%` }}
                          />
                          <span className="text-xs text-gray-500">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                      Average anxiety score this week: <span className="font-semibold text-primary">3.9</span> (down 12% from last week)
                    </p>
                  </div>
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
