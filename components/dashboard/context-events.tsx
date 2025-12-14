"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ContextEvent {
  id: string
  name: string
  time: string
  recurring: boolean
}

interface ContextEventsProps {
  events: ContextEvent[]
  onAddEvent: (event: Omit<ContextEvent, "id">) => void
  onRemoveEvent: (id: string) => void
}

export function ContextEvents({ events, onAddEvent, onRemoveEvent }: ContextEventsProps) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [time, setTime] = useState("")
  const [recurring, setRecurring] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddEvent({ name, time, recurring })
    setName("")
    setTime("")
    setRecurring(false)
    setShowForm(false)
  }

  const presetEvents = [
    { name: "Owner leaves home", icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" },
    { name: "Owner returns home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Visitor arrives", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
    { name: "Mealtime", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  ]

  return (
    <div className="rounded-lg border border-border/40 bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Context Events</h3>
          <p className="text-sm text-muted-foreground">
            Track triggers to correlate with barking patterns
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Event"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 rounded-lg border border-border/40 bg-muted/50 p-4">
          <div className="space-y-2">
            <Label htmlFor="event-name">Event Name</Label>
            <Input
              id="event-name"
              placeholder="e.g., Mail delivery"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-time">Typical Time</Label>
            <Input
              id="event-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="recurring"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            <Label htmlFor="recurring" className="text-sm font-normal">
              Recurring daily
            </Label>
          </div>
          <Button type="submit" size="sm">
            Save Event
          </Button>
        </form>
      )}

      {events.length === 0 && !showForm && (
        <div className="mt-4">
          <p className="mb-3 text-sm text-muted-foreground">Quick add common triggers:</p>
          <div className="flex flex-wrap gap-2">
            {presetEvents.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => onAddEvent({ name: preset.name, time: "", recurring: true })}
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div className="mt-4 space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">{event.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.time || "Any time"} {event.recurring && "• Daily"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveEvent(event.id)}
              >
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
