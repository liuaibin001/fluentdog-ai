"use client"

import { Button } from "@/components/ui/button"
import type { BarkAnalysisResult } from "./bark-upload"

interface TrainingPlanProps {
  analyses: BarkAnalysisResult[]
  isPremium?: boolean
}

const trainingPlans = {
  anxiety: {
    title: "Progressive Separation Training",
    description: "Gradually build your dog's confidence when alone",
    steps: [
      "Start with short absences (1-2 minutes)",
      "Practice calm departures without fanfare",
      "Gradually increase separation time",
      "Use calming music or white noise",
      "Reward calm behavior upon return",
    ],
    duration: "4-6 weeks",
  },
  attention: {
    title: "Attention-Seeking Behavior Modification",
    description: "Teach your dog appropriate ways to communicate",
    steps: [
      "Ignore barking for attention",
      "Reward quiet behavior immediately",
      "Establish a 'quiet' command",
      "Provide structured attention times",
      "Redirect to appropriate activities",
    ],
    duration: "2-3 weeks",
  },
  alert: {
    title: "Alert Bark Management",
    description: "Acknowledge alerts while preventing excessive barking",
    steps: [
      "Thank your dog with 'good alert'",
      "Use a 'quiet' or 'enough' command",
      "Redirect attention after acknowledgment",
      "Desensitize to common triggers",
      "Practice controlled exposures",
    ],
    duration: "2-4 weeks",
  },
  boredom: {
    title: "Enrichment & Stimulation Program",
    description: "Keep your dog mentally and physically engaged",
    steps: [
      "Increase daily exercise (30+ minutes)",
      "Introduce puzzle feeders",
      "Rotate toys to maintain interest",
      "Practice training sessions daily",
      "Provide safe chewing outlets",
    ],
    duration: "Ongoing",
  },
  playful: {
    title: "Play Bark Boundaries",
    description: "Channel excitement appropriately",
    steps: [
      "Teach 'settle' command during play",
      "Use play breaks to practice calm",
      "Reward quiet play periods",
      "End play if barking intensifies",
      "Resume when calm",
    ],
    duration: "1-2 weeks",
  },
}

export function TrainingPlan({ analyses, isPremium = false }: TrainingPlanProps) {
  // Determine primary bark type
  const emotionCounts = analyses.reduce((acc, a) => {
    acc[a.emotionType] = (acc[a.emotionType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const primaryEmotion = Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] as keyof typeof trainingPlans | undefined

  const plan = primaryEmotion ? trainingPlans[primaryEmotion] : null

  if (!isPremium) {
    return (
      <div className="rounded-lg border border-border/40 bg-card p-6">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">AI Training Coach</h3>
            <p className="text-sm text-muted-foreground">Personalized training plans</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Upgrade to Coach plan to unlock personalized training courses based on your dog&apos;s specific barking patterns.
        </p>
        <Button className="mt-4" variant="outline" asChild>
          <a href="/#pricing">Upgrade to Coach</a>
        </Button>
      </div>
    )
  }

  if (!plan || analyses.length === 0) {
    return (
      <div className="rounded-lg border border-border/40 bg-card p-6">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">AI Training Coach</h3>
            <p className="text-sm text-muted-foreground">Upload barks to get your personalized plan</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Record or upload your dog&apos;s barking to generate a customized training program.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border/40 bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
            <svg
              className="h-5 w-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">{plan.title}</h3>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {plan.duration}
        </span>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium">Training Steps</h4>
        <ol className="mt-3 space-y-2">
          {plan.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {index + 1}
              </span>
              <span className="text-sm text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 rounded-lg bg-primary/5 p-4">
        <p className="text-sm">
          <span className="font-medium">AI Recommendation:</span> Based on your dog&apos;s{" "}
          {emotionCounts[primaryEmotion]} {primaryEmotion} barks, focus on steps 1-2 this week.
          Track progress daily for best results.
        </p>
      </div>
    </div>
  )
}
