"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createDog, type Dog } from "@/lib/services/dogs"

interface AddDogDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (dog: Dog) => void
}

export function AddDogDialog({ open, onClose, onAdd }: AddDogDialogProps) {
  const [name, setName] = useState("")
  const [breed, setBreed] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: saveError } = await createDog({
      name,
      breed: breed || undefined,
      age: age || undefined,
    })

    if (saveError) {
      setError(saveError.message)
      setLoading(false)
      return
    }

    if (data) {
      onAdd(data)
      setName("")
      setBreed("")
      setAge("")
      onClose()
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Add Your Dog</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a profile for your furry friend
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dog-name">Dog&apos;s Name *</Label>
            <Input
              id="dog-name"
              placeholder="e.g., Buddy"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dog-breed">Breed (optional)</Label>
            <Input
              id="dog-breed"
              placeholder="e.g., Golden Retriever"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dog-age">Age (optional)</Label>
            <Input
              id="dog-age"
              placeholder="e.g., 3 years"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="rounded-lg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-full"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-full bg-primary"
              disabled={loading || !name}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding...
                </span>
              ) : (
                "Add Dog"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
