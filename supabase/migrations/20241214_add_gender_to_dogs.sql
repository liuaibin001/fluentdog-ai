-- Add gender column to dogs table
ALTER TABLE dogs ADD COLUMN IF NOT EXISTS gender VARCHAR(10);
