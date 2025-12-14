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

const AGE_OPTIONS = [
  { value: "0-6months", label: "Younger than 6 months", icon: "puppy" },
  { value: "6-12months", label: "6-12 months", icon: "young" },
  { value: "1-2years", label: "1-2 years", icon: "adult" },
  { value: "2-7years", label: "2-7 years", icon: "mature" },
  { value: "7+years", label: "More than 7 years", icon: "senior" },
]

const POPULAR_BREEDS = [
  "Mixed Breed",
  "Golden Retriever",
  "Labrador Retriever",
  "German Shepherd",
  "French Bulldog",
  "Chihuahua",
  "Border Collie",
  "Siberian Husky",
  "Yorkshire Terrier",
  "Shih Tzu",
  "Poodle",
  "Beagle",
  "Pembroke Welsh Corgi",
]

export function AddDogDialog({ open, onClose, onAdd }: AddDogDialogProps) {
  const [step, setStep] = useState(1)
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [age, setAge] = useState("")
  const [breed, setBreed] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Please enter your dog's name")
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: saveError } = await createDog({
      name: name.trim(),
      gender: gender || undefined,
      age: age || undefined,
      breed: breed || undefined,
    })

    if (saveError) {
      setError(saveError.message)
      setLoading(false)
      return
    }

    if (data) {
      onAdd(data)
      // Reset form
      setStep(1)
      setGender(null)
      setAge("")
      setBreed("")
      setName("")
      onClose()
    }

    setLoading(false)
  }

  const handleClose = () => {
    setStep(1)
    setGender(null)
    setAge("")
    setBreed("")
    setName("")
    setError(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <p className="mb-2 text-center text-sm font-medium text-primary">
            Dog&apos;s personality {step}/3
          </p>
          <div className="flex gap-1">
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-gray-200"}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-green-400" : "bg-gray-200"}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 3 ? "bg-blue-400" : "bg-gray-200"}`} />
          </div>
        </div>

        {/* Step 1: Gender */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">
              PERSONALIZED<br />DOG TRAINING PLAN
            </h2>
            <p className="mb-8 text-gray-500">BASED ON YOUR DOG BEHAVIOR</p>

            <h3 className="mb-6 text-xl font-semibold text-gray-700">Your dog is:</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Girl Card */}
              <button
                onClick={() => {
                  setGender("female")
                  handleNext()
                }}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all ${
                  gender === "female" ? "border-pink-400 ring-4 ring-pink-100" : "border-gray-200 hover:border-pink-300"
                }`}
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-b from-pink-50 to-white p-4">
                  <svg viewBox="0 0 100 100" className="h-32 w-32">
                    {/* Simple dog silhouette - female (lighter color) */}
                    <ellipse cx="50" cy="60" rx="25" ry="30" fill="#F5D6B8" />
                    <circle cx="50" cy="35" r="18" fill="#F5D6B8" />
                    <ellipse cx="38" cy="25" rx="8" ry="12" fill="#E8C4A0" />
                    <ellipse cx="62" cy="25" rx="8" ry="12" fill="#E8C4A0" />
                    <circle cx="44" cy="33" r="3" fill="#333" />
                    <circle cx="56" cy="33" r="3" fill="#333" />
                    <ellipse cx="50" cy="40" rx="4" ry="3" fill="#333" />
                    {/* Pink collar */}
                    <rect x="35" y="50" width="30" height="6" rx="3" fill="#F472B6" />
                    <circle cx="50" cy="56" r="4" fill="#EC4899" />
                  </svg>
                </div>
                <div className="flex items-center justify-between bg-pink-300 px-4 py-3 text-white">
                  <span className="text-lg font-semibold">Girl</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Boy Card */}
              <button
                onClick={() => {
                  setGender("male")
                  handleNext()
                }}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all ${
                  gender === "male" ? "border-blue-400 ring-4 ring-blue-100" : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
                  <svg viewBox="0 0 100 100" className="h-32 w-32">
                    {/* Simple dog silhouette - male (brown color) */}
                    <ellipse cx="50" cy="60" rx="25" ry="30" fill="#8B6F4E" />
                    <ellipse cx="50" cy="65" rx="15" ry="20" fill="#F5E6D3" />
                    <circle cx="50" cy="35" r="18" fill="#8B6F4E" />
                    <ellipse cx="38" cy="22" rx="7" ry="10" fill="#6B5344" />
                    <ellipse cx="62" cy="22" rx="7" ry="10" fill="#6B5344" />
                    <circle cx="44" cy="33" r="3" fill="#333" />
                    <circle cx="56" cy="33" r="3" fill="#333" />
                    <ellipse cx="50" cy="40" rx="4" ry="3" fill="#333" />
                    {/* Blue collar */}
                    <rect x="35" y="50" width="30" height="6" rx="3" fill="#60A5FA" />
                    <circle cx="50" cy="56" r="4" fill="#3B82F6" />
                  </svg>
                </div>
                <div className="flex items-center justify-between bg-blue-400 px-4 py-3 text-white">
                  <span className="text-lg font-semibold">Boy</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Age */}
        {step === 2 && (
          <div>
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
              Choose your dog&apos;s age
            </h2>

            <div className="space-y-3">
              {AGE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setAge(option.value)
                    handleNext()
                  }}
                  className={`flex w-full items-center gap-4 rounded-full border-2 px-6 py-4 text-left transition-all ${
                    age === option.value
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center">
                    <svg viewBox="0 0 40 40" className="h-8 w-8">
                      <circle cx="20" cy="20" r="15" fill="#333" />
                      <circle cx="14" cy="17" r="2" fill="#FFF" />
                      <circle cx="26" cy="17" r="2" fill="#FFF" />
                      <ellipse cx="20" cy="24" rx="3" ry="2" fill="#FFF" />
                      {/* Ears */}
                      <ellipse cx="8" cy="12" rx="5" ry="8" fill="#333" />
                      <ellipse cx="32" cy="12" rx="5" ry="8" fill="#333" />
                      {/* Collar */}
                      <rect x="12" y="32" width="16" height="4" rx="2" fill="#F59E0B" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-700">{option.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleBack}
              className="mt-6 w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
              Back
            </button>
          </div>
        )}

        {/* Step 3: Breed & Name */}
        {step === 3 && (
          <div>
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              What breed is your dog?
            </h2>

            {/* Breed Quick Picks */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {POPULAR_BREEDS.map((breedOption) => (
                <button
                  key={breedOption}
                  onClick={() => setBreed(breedOption)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    breed === breedOption
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {breedOption}
                </button>
              ))}
            </div>

            {/* Name Input */}
            <div className="mt-8 space-y-2">
              <Label htmlFor="dog-name" className="text-base font-medium">
                What&apos;s your dog&apos;s name? *
              </Label>
              <Input
                id="dog-name"
                placeholder="Enter your dog's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl text-lg"
                autoFocus
              />
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full py-6"
                onClick={handleBack}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 rounded-full bg-green-500 py-6 text-lg hover:bg-green-600"
                disabled={loading || !name.trim()}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Continue
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
