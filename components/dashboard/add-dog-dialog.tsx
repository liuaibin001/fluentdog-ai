"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddDogDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (dog: { name: string; breed: string; age: string }) => void
}

export function AddDogDialog({ open, onClose, onAdd }: AddDogDialogProps) {
  const [name, setName] = useState("")
  const [breed, setBreed] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Here you would save to Supabase
    onAdd({ name, breed, age })

    setName("")
    setBreed("")
    setAge("")
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Add Your Dog</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a profile for your furry friend
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dog-name">Dog&apos;s Name *</Label>
            <Input
              id="dog-name"
              placeholder="e.g., Buddy"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dog-breed">Breed (optional)</Label>
            <Input
              id="dog-breed"
              placeholder="e.g., Golden Retriever"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dog-age">Age (optional)</Label>
            <Input
              id="dog-age"
              placeholder="e.g., 3 years"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading || !name}>
              {loading ? "Adding..." : "Add Dog"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
