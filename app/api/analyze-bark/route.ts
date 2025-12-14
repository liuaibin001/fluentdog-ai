import { NextRequest, NextResponse } from "next/server"
import { OpenRouter } from "@openrouter/sdk"

const BARK_ANALYSIS_PROMPT = `You are a Dog Bark Analyst. Based on the provided audio (and optional context information), you will detect and analyze dog barks, outputting results that can be parsed by programs.

## Task
1) Determine whether there is a **dog bark** in the audio.
2) If a dog bark exists: Classify the main bark segment's **emotion (5 types)**, assign an **anxiety score (1-10)**, and infer the **bark trigger**.
3) If no dog bark exists: Clearly state "not a dog bark" and indicate the most likely sound source category.

## Output Requirements (Very Important)
- **Output JSON only** (no Markdown, no code blocks, no additional explanatory text).
- All fields must be complete; use null, empty array [], or lower confidence when uncertain - do not fabricate facts.
- anxietyScore must be an **integer from 1-10**.
- emotionType must be one of these 5 types:
  - "alert": Alert/guarding/startled warning
  - "anxiety": Anxious/fearful/separation stress
  - "playful": Excited/play invitation
  - "attention": Seeking attention/requesting interaction
  - "boredom": Bored/repetitive barking from lack of stimulation

## Anxiety Scoring (1-10) Reference:
- 1-2: Calm, occasional, moderate volume, no obvious stress signals
- 3-4: Mild tension, occasional rapid pace or increased frequency
- 5-6: Moderate stress, frequent repetition, rapid rhythm or accompanied by whining/panting
- 7-8: Obvious anxiety, more persistent, difficulty self-soothing, high-frequency screaming/whining mix
- 9-10: Near panic, intense and persistent, extremely difficult to interrupt

## Required JSON Output Structure (output ONLY this JSON, nothing else):
{
  "isDogBark": boolean,
  "dogBarkConfidence": number (0-1),
  "nonBarkSound": string | null,
  "emotionType": "alert" | "anxiety" | "playful" | "attention" | "boredom" | null,
  "emotionConfidence": number (0-1) | null,
  "anxietyScore": number (1-10) | null,
  "anxietyRationale": string | null,
  "triggerCandidates": [{ "trigger": string, "confidence": number, "rationale": string }],
  "needsMoreContext": boolean,
  "followUpQuestions": string[]
}

When isDogBark=false: emotionType=null, emotionConfidence=null, anxietyScore=null, anxietyRationale=null, triggerCandidates=[]
When isDogBark=true: nonBarkSound=null, provide 1-3 trigger candidates

Now analyze the provided audio:`

export interface BarkAnalysisAPIResponse {
  isDogBark: boolean
  dogBarkConfidence: number
  nonBarkSound: string | null
  emotionType: "alert" | "anxiety" | "playful" | "attention" | "boredom" | null
  emotionConfidence: number | null
  anxietyScore: number | null
  anxietyRationale: string | null
  triggerCandidates: Array<{
    trigger: string
    confidence: number
    rationale: string
  }>
  needsMoreContext: boolean
  followUpQuestions: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { audioBase64, mimeType, context } = await request.json()

    if (!audioBase64) {
      return NextResponse.json(
        { error: "No audio data provided" },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      )
    }

    const openrouter = new OpenRouter({ apiKey })

    // Build the prompt with optional context
    let fullPrompt = BARK_ANALYSIS_PROMPT
    if (context) {
      fullPrompt += `\n\nAdditional context: ${context}`
    }

    // Determine audio format
    let audioFormat = "wav"
    if (mimeType?.includes("mp3") || mimeType?.includes("mpeg")) {
      audioFormat = "mp3"
    } else if (mimeType?.includes("webm")) {
      audioFormat = "webm"
    }

    // Call OpenRouter with Gemini model using chat.send()
    const result = await openrouter.chat.send({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: fullPrompt,
            },
            {
              type: "input_audio",
              inputAudio: {
                data: audioBase64,
                format: audioFormat,
              },
            },
          ],
        },
      ],
    })

    // Extract content from response
    const content = result.choices?.[0]?.message?.content
    if (!content) {
      return NextResponse.json(
        { error: "No response from AI model" },
        { status: 500 }
      )
    }

    // Parse the JSON response
    let analysisResult: BarkAnalysisAPIResponse
    try {
      // Clean the response - remove any markdown code blocks if present
      let cleanedContent = typeof content === "string" ? content.trim() : JSON.stringify(content)
      if (cleanedContent.startsWith("```json")) {
        cleanedContent = cleanedContent.slice(7)
      } else if (cleanedContent.startsWith("```")) {
        cleanedContent = cleanedContent.slice(3)
      }
      if (cleanedContent.endsWith("```")) {
        cleanedContent = cleanedContent.slice(0, -3)
      }
      cleanedContent = cleanedContent.trim()

      analysisResult = JSON.parse(cleanedContent)
    } catch {
      console.error("Failed to parse AI response:", content)
      return NextResponse.json(
        { error: "Failed to parse AI response", rawResponse: content },
        { status: 500 }
      )
    }

    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error("Bark analysis error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    )
  }
}
