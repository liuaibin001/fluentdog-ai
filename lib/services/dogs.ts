import { createClient } from "@/lib/supabase/client"

export interface Dog {
  id: string
  user_id: string
  name: string
  breed: string | null
  age: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface CreateDogInput {
  name: string
  breed?: string
  age?: string
  image_url?: string
}

export interface UpdateDogInput {
  name?: string
  breed?: string
  age?: string
  image_url?: string
}

export async function getDogs(): Promise<{ data: Dog[] | null; error: Error | null }> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("dogs")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data, error: null }
}

export async function getDogById(id: string): Promise<{ data: Dog | null; error: Error | null }> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("dogs")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data, error: null }
}

export async function createDog(input: CreateDogInput): Promise<{ data: Dog | null; error: Error | null }> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: new Error("User not authenticated") }
  }

  const { data, error } = await supabase
    .from("dogs")
    .insert({
      user_id: user.id,
      name: input.name,
      breed: input.breed || null,
      age: input.age || null,
      image_url: input.image_url || null,
    })
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data, error: null }
}

export async function updateDog(id: string, input: UpdateDogInput): Promise<{ data: Dog | null; error: Error | null }> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("dogs")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data, error: null }
}

export async function deleteDog(id: string): Promise<{ error: Error | null }> {
  const supabase = createClient()

  const { error } = await supabase
    .from("dogs")
    .delete()
    .eq("id", id)

  if (error) {
    return { error: new Error(error.message) }
  }

  return { error: null }
}
