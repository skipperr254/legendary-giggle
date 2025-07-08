-- Create styled_videos table from storage bucket styledmyhome.videos
CREATE TABLE IF NOT EXISTS styled_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  bucket_name TEXT NOT NULL DEFAULT 'styledmyhome.videos',
  file_size BIGINT,
  content_type TEXT,
  duration_seconds INTEGER,
  video_quality TEXT, -- '720p', '1080p', '4K', etc.
  style_category TEXT, -- 'Modern', 'Traditional', 'Minimalist', etc.
  room_type TEXT, -- 'Living Room', 'Bedroom', 'Kitchen', etc.
  tags TEXT[], -- Array of tags for categorization
  description TEXT,
  thumbnail_url TEXT, -- URL to video thumbnail
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_styled_videos_style_category ON styled_videos(style_category);
CREATE INDEX IF NOT EXISTS idx_styled_videos_room_type ON styled_videos(room_type);
CREATE INDEX IF NOT EXISTS idx_styled_videos_is_featured ON styled_videos(is_featured);
CREATE INDEX IF NOT EXISTS idx_styled_videos_created_at ON styled_videos(created_at);
CREATE INDEX IF NOT EXISTS idx_styled_videos_bucket_name ON styled_videos(bucket_name);

-- Enable Row Level Security
ALTER TABLE styled_videos ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Allow public read access" ON styled_videos
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert" ON styled_videos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update" ON styled_videos
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_styled_videos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_styled_videos_updated_at_trigger
  BEFORE UPDATE ON styled_videos
  FOR EACH ROW
  EXECUTE FUNCTION update_styled_videos_updated_at();