/*
  # Media Management Database Schema

  1. New Tables
    - `media_files` - Stores all media files (images, videos, PDFs) with metadata
    - `design_styles` - Master list of design styles with descriptions
    - `room_types` - Master list of room types
    - `quiz_questions` - Quiz questions with proper structure
    - `quiz_options` - Quiz options linked to questions and media
    - `style_materials` - Materials (wood, metal) linked to styles
    - `style_color_palettes` - Color palettes for each style

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for public read access
    - Add policies for authenticated admin access

  3. Indexes
    - Add indexes for better query performance
*/

-- Media Files Table
CREATE TABLE IF NOT EXISTS media_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  original_filename text NOT NULL,
  file_path text NOT NULL UNIQUE,
  bucket_name text NOT NULL,
  file_type text NOT NULL CHECK (file_type IN ('image', 'video', 'pdf')),
  mime_type text NOT NULL,
  file_size bigint,
  width integer,
  height integer,
  duration_seconds integer, -- for videos
  alt_text text,
  description text,
  tags text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Design Styles Table
CREATE TABLE IF NOT EXISTS design_styles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  characteristics text[] NOT NULL DEFAULT '{}',
  design_tips text[] NOT NULL DEFAULT '{}',
  color_palette text[] NOT NULL DEFAULT '{}',
  hero_image_id uuid REFERENCES media_files(id),
  video_id uuid REFERENCES media_files(id),
  pdf_guide_id uuid REFERENCES media_files(id),
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Room Types Table
CREATE TABLE IF NOT EXISTS room_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  room_type_id uuid REFERENCES room_types(id),
  question_type text NOT NULL DEFAULT 'style_preference' CHECK (question_type IN ('style_preference', 'material_preference', 'color_preference')),
  sort_order integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quiz Options Table
CREATE TABLE IF NOT EXISTS quiz_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_letter text NOT NULL CHECK (option_letter IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H')),
  style_id uuid REFERENCES design_styles(id),
  image_id uuid REFERENCES media_files(id),
  option_text text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(question_id, option_letter)
);

-- Style Materials Table (Wood and Metal finishes)
CREATE TABLE IF NOT EXISTS style_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  style_id uuid NOT NULL REFERENCES design_styles(id) ON DELETE CASCADE,
  material_type text NOT NULL CHECK (material_type IN ('wood', 'metal')),
  material_name text NOT NULL,
  image_id uuid REFERENCES media_files(id),
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_media_files_file_type ON media_files(file_type);
CREATE INDEX IF NOT EXISTS idx_media_files_bucket_name ON media_files(bucket_name);
CREATE INDEX IF NOT EXISTS idx_media_files_is_active ON media_files(is_active);
CREATE INDEX IF NOT EXISTS idx_design_styles_slug ON design_styles(slug);
CREATE INDEX IF NOT EXISTS idx_design_styles_is_active ON design_styles(is_active);
CREATE INDEX IF NOT EXISTS idx_room_types_slug ON room_types(slug);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_sort_order ON quiz_questions(sort_order);
CREATE INDEX IF NOT EXISTS idx_quiz_options_question_id ON quiz_options(question_id);
CREATE INDEX IF NOT EXISTS idx_style_materials_style_id ON style_materials(style_id);
CREATE INDEX IF NOT EXISTS idx_style_materials_material_type ON style_materials(material_type);

-- Enable Row Level Security
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE style_materials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to active media files" ON media_files
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to active design styles" ON design_styles
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to active room types" ON room_types
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to active quiz questions" ON quiz_questions
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to active quiz options" ON quiz_options
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to style materials" ON style_materials
  FOR SELECT USING (true);

-- Create policies for authenticated admin access
CREATE POLICY "Allow authenticated users to manage media files" ON media_files
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage design styles" ON design_styles
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage room types" ON room_types
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage quiz questions" ON quiz_questions
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage quiz options" ON quiz_options
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage style materials" ON style_materials
  FOR ALL USING (auth.role() = 'authenticated');

-- Create triggers to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_media_files_updated_at
  BEFORE UPDATE ON media_files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_design_styles_updated_at
  BEFORE UPDATE ON design_styles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_questions_updated_at
  BEFORE UPDATE ON quiz_questions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();