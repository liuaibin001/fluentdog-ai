-- Create bark_analyses table to store bark analysis results
CREATE TABLE IF NOT EXISTS bark_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,

  -- Core analysis fields
  is_dog_bark BOOLEAN NOT NULL DEFAULT true,
  dog_bark_confidence DECIMAL(3,2),
  non_bark_sound VARCHAR(100),

  -- Emotion classification
  emotion_type VARCHAR(20) CHECK (emotion_type IN ('alert', 'anxiety', 'playful', 'attention', 'boredom')),
  emotion_confidence DECIMAL(3,2),

  -- Anxiety assessment
  anxiety_score INTEGER CHECK (anxiety_score >= 1 AND anxiety_score <= 10),
  anxiety_rationale TEXT,

  -- Triggers (stored as JSONB array)
  trigger_candidates JSONB DEFAULT '[]',

  -- Follow-up
  needs_more_context BOOLEAN DEFAULT false,
  follow_up_questions JSONB DEFAULT '[]',

  -- Recording metadata
  duration INTEGER, -- in seconds
  audio_url TEXT,

  -- Review status
  reviewed BOOLEAN DEFAULT false,
  reviewed_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_bark_analyses_user_id ON bark_analyses(user_id);
CREATE INDEX idx_bark_analyses_dog_id ON bark_analyses(dog_id);
CREATE INDEX idx_bark_analyses_created_at ON bark_analyses(created_at DESC);
CREATE INDEX idx_bark_analyses_emotion_type ON bark_analyses(emotion_type);

-- Enable Row Level Security
ALTER TABLE bark_analyses ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own analyses
CREATE POLICY "Users can view own bark analyses"
  ON bark_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bark analyses"
  ON bark_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bark analyses"
  ON bark_analyses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bark analyses"
  ON bark_analyses FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_bark_analyses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER trigger_bark_analyses_updated_at
  BEFORE UPDATE ON bark_analyses
  FOR EACH ROW
  EXECUTE FUNCTION update_bark_analyses_updated_at();
