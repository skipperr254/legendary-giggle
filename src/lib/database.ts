import { supabase } from './supabase';

export interface MediaFile {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  bucket_name: string;
  file_type: 'image' | 'video' | 'pdf';
  mime_type: string;
  file_size?: number;
  width?: number;
  height?: number;
  duration_seconds?: number;
  alt_text?: string;
  description?: string;
  tags?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DesignStyle {
  id: string;
  name: string;
  slug: string;
  description: string;
  characteristics: string[];
  design_tips: string[];
  color_palette: string[];
  hero_image?: MediaFile;
  video?: MediaFile;
  pdf_guide?: MediaFile;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface RoomType {
  id: string;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  question_text: string;
  room_type: RoomType;
  question_type: string;
  sort_order: number;
  is_active: boolean;
  options: QuizOption[];
  created_at: string;
  updated_at: string;
}

export interface QuizOption {
  id: string;
  question_id: string;
  option_letter: string;
  style?: DesignStyle;
  image?: MediaFile;
  option_text?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface StyleMaterial {
  id: string;
  style_id: string;
  material_type: 'wood' | 'metal';
  material_name: string;
  image?: MediaFile;
  description?: string;
  sort_order: number;
  created_at: string;
}

// Helper function to get public URL for media files
export const getMediaUrl = (mediaFile: MediaFile | null): string => {
  if (!mediaFile) return '/placeholder.svg';
  
  const { data } = supabase.storage
    .from(mediaFile.bucket_name)
    .getPublicUrl(mediaFile.file_path);
  
  return data.publicUrl;
};

// Fetch all design styles with their associated media
export const getDesignStyles = async (): Promise<DesignStyle[]> => {
  const { data, error } = await supabase
    .from('design_styles')
    .select(`
      *,
      hero_image:hero_image_id(
        id, filename, file_path, bucket_name, file_type, alt_text, description
      ),
      video:video_id(
        id, filename, file_path, bucket_name, file_type, duration_seconds, description
      ),
      pdf_guide:pdf_guide_id(
        id, filename, file_path, bucket_name, file_type, description
      )
    `)
    .eq('is_active', true)
    .order('sort_order');

  if (error) {
    console.error('Error fetching design styles:', error);
    return [];
  }

  return data || [];
};

// Fetch a single design style by slug
export const getDesignStyleBySlug = async (slug: string): Promise<DesignStyle | null> => {
  const { data, error } = await supabase
    .from('design_styles')
    .select(`
      *,
      hero_image:hero_image_id(
        id, filename, file_path, bucket_name, file_type, alt_text, description
      ),
      video:video_id(
        id, filename, file_path, bucket_name, file_type, duration_seconds, description
      ),
      pdf_guide:pdf_guide_id(
        id, filename, file_path, bucket_name, file_type, description
      )
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching design style:', error);
    return null;
  }

  return data;
};

// Fetch quiz questions with options and media
export const getQuizQuestions = async (): Promise<QuizQuestion[]> => {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select(`
      *,
      room_type:room_type_id(
        id, name, slug, description
      ),
      options:quiz_options(
        id,
        option_letter,
        option_text,
        sort_order,
        style:style_id(
          id, name, slug, description
        ),
        image:image_id(
          id, filename, file_path, bucket_name, file_type, alt_text, description
        )
      )
    `)
    .eq('is_active', true)
    .order('sort_order');

  if (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }

  // Sort options by sort_order
  const questionsWithSortedOptions = data?.map(question => ({
    ...question,
    options: question.options?.sort((a: QuizOption, b: QuizOption) => a.sort_order - b.sort_order) || []
  })) || [];

  return questionsWithSortedOptions;
};

// Fetch materials for a specific style
export const getStyleMaterials = async (styleId: string): Promise<{
  wood: StyleMaterial[];
  metal: StyleMaterial[];
}> => {
  const { data, error } = await supabase
    .from('style_materials')
    .select(`
      *,
      image:image_id(
        id, filename, file_path, bucket_name, file_type, alt_text, description
      )
    `)
    .eq('style_id', styleId)
    .order('material_type')
    .order('sort_order');

  if (error) {
    console.error('Error fetching style materials:', error);
    return { wood: [], metal: [] };
  }

  const materials = data || [];
  
  return {
    wood: materials.filter(m => m.material_type === 'wood'),
    metal: materials.filter(m => m.material_type === 'metal')
  };
};

// Calculate quiz results based on answers
export const calculateQuizResult = async (answers: string[]): Promise<DesignStyle | null> => {
  try {
    // Get all quiz questions with options
    const questions = await getQuizQuestions();
    
    // Count style occurrences
    const styleScores: Record<string, number> = {};
    
    answers.forEach((letter, questionIndex) => {
      const question = questions[questionIndex];
      if (!question) return;
      
      const option = question.options.find(opt => opt.option_letter === letter);
      if (option?.style) {
        const styleName = option.style.name;
        styleScores[styleName] = (styleScores[styleName] || 0) + 1;
      }
    });
    
    // Find the style with the highest score
    const topStyleName = Object.entries(styleScores).reduce((a, b) => 
      styleScores[a[0]] > styleScores[b[0]] ? a : b
    )[0];
    
    if (!topStyleName) return null;
    
    // Get the full style data
    const styles = await getDesignStyles();
    return styles.find(style => style.name === topStyleName) || null;
    
  } catch (error) {
    console.error('Error calculating quiz result:', error);
    return null;
  }
};

// Search media files
export const searchMediaFiles = async (
  fileType?: 'image' | 'video' | 'pdf',
  tags?: string[],
  limit: number = 50
): Promise<MediaFile[]> => {
  let query = supabase
    .from('media_files')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (fileType) {
    query = query.eq('file_type', fileType);
  }

  if (tags && tags.length > 0) {
    query = query.overlaps('tags', tags);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error searching media files:', error);
    return [];
  }

  return data || [];
};