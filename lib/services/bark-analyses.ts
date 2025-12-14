import { createClient } from "@/lib/supabase/client"

export interface TriggerCandidate {
  trigger: string
  confidence: number
  rationale: string
}

export interface BarkAnalysis {
  id: string
  user_id: string
  dog_id: string
  is_dog_bark: boolean
  dog_bark_confidence: number | null
  non_bark_sound: string | null
  emotion_type: "alert" | "anxiety" | "playful" | "attention" | "boredom" | null
  emotion_confidence: number | null
  anxiety_score: number | null
  anxiety_rationale: string | null
  trigger_candidates: TriggerCandidate[]
  needs_more_context: boolean
  follow_up_questions: string[]
  duration: number | null
  audio_url: string | null
  reviewed: boolean
  reviewed_at: string | null
  created_at: string
  updated_at: string
}

export interface CreateBarkAnalysisInput {
  dog_id: string
  is_dog_bark: boolean
  dog_bark_confidence?: number
  non_bark_sound?: string | null
  emotion_type?: "alert" | "anxiety" | "playful" | "attention" | "boredom" | null
  emotion_confidence?: number | null
  anxiety_score?: number | null
  anxiety_rationale?: string | null
  trigger_candidates?: TriggerCandidate[]
  needs_more_context?: boolean
  follow_up_questions?: string[]
  duration?: number
  audio_url?: string
}

// Create a new bark analysis
export async function createBarkAnalysis(input: CreateBarkAnalysisInput) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { data: null, error: new Error("Not authenticated") }
  }

  const { data, error } = await supabase
    .from("bark_analyses")
    .insert({
      user_id: user.id,
      dog_id: input.dog_id,
      is_dog_bark: input.is_dog_bark,
      dog_bark_confidence: input.dog_bark_confidence,
      non_bark_sound: input.non_bark_sound,
      emotion_type: input.emotion_type,
      emotion_confidence: input.emotion_confidence,
      anxiety_score: input.anxiety_score,
      anxiety_rationale: input.anxiety_rationale,
      trigger_candidates: input.trigger_candidates || [],
      needs_more_context: input.needs_more_context || false,
      follow_up_questions: input.follow_up_questions || [],
      duration: input.duration,
      audio_url: input.audio_url,
    })
    .select()
    .single()

  return { data: data as BarkAnalysis | null, error }
}

// Get all bark analyses for current user
export async function getBarkAnalyses(dogId?: string) {
  const supabase = createClient()

  let query = supabase
    .from("bark_analyses")
    .select("*")
    .order("created_at", { ascending: false })

  if (dogId) {
    query = query.eq("dog_id", dogId)
  }

  const { data, error } = await query

  return { data: data as BarkAnalysis[] | null, error }
}

// Get a single bark analysis
export async function getBarkAnalysis(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("bark_analyses")
    .select("*")
    .eq("id", id)
    .single()

  return { data: data as BarkAnalysis | null, error }
}

// Mark analysis as reviewed
export async function markAsReviewed(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("bark_analyses")
    .update({
      reviewed: true,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  return { data: data as BarkAnalysis | null, error }
}

// Delete a bark analysis
export async function deleteBarkAnalysis(id: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from("bark_analyses")
    .delete()
    .eq("id", id)

  return { error }
}

// Get analysis stats for a dog
export async function getDogAnalysisStats(dogId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("bark_analyses")
    .select("emotion_type, anxiety_score, created_at")
    .eq("dog_id", dogId)
    .eq("is_dog_bark", true)

  if (error || !data) {
    return { data: null, error }
  }

  // Calculate stats
  const totalAnalyses = data.length
  const emotionCounts: Record<string, number> = {}
  let totalAnxiety = 0
  let anxietyCount = 0

  data.forEach((analysis) => {
    if (analysis.emotion_type) {
      emotionCounts[analysis.emotion_type] = (emotionCounts[analysis.emotion_type] || 0) + 1
    }
    if (analysis.anxiety_score) {
      totalAnxiety += analysis.anxiety_score
      anxietyCount++
    }
  })

  return {
    data: {
      totalAnalyses,
      emotionCounts,
      averageAnxiety: anxietyCount > 0 ? totalAnxiety / anxietyCount : 0,
    },
    error: null,
  }
}
