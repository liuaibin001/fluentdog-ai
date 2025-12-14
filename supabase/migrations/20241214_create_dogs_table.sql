-- Create dogs table
CREATE TABLE IF NOT EXISTS dogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  age VARCHAR(50),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_dogs_user_id ON dogs(user_id);

-- Enable Row Level Security
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only view their own dogs
CREATE POLICY "Users can view own dogs"
  ON dogs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own dogs
CREATE POLICY "Users can insert own dogs"
  ON dogs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own dogs
CREATE POLICY "Users can update own dogs"
  ON dogs
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can delete their own dogs
CREATE POLICY "Users can delete own dogs"
  ON dogs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_dogs_updated_at
  BEFORE UPDATE ON dogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
