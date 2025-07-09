import { supabase } from './supabase';

export interface MediaFile {
  name: string;
  url: string;
  bucket: string;
  path: string;
}

// Helper function to get public URL for a file
export const getPublicUrl = (bucket: string, path: string): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

// Get images for quiz questions based on room type and style
export const getQuizImages = async (roomType: string, style: string): Promise<string> => {
  try {
    const bucketName = 'styledmyhome.images';
    let folderPath = '';
    
    // Map room types to folder names
    switch (roomType.toLowerCase()) {
      case 'kitchen':
        folderPath = 'Kitchen Images';
        break;
      case 'living room':
        folderPath = 'Living Room Images';
        break;
      case 'dining room':
        folderPath = 'Dining Room Images';
        break;
      case 'primary bedroom':
        folderPath = 'Master Bedroom Images';
        break;
      case 'primary bathroom':
        folderPath = 'Master Bathroom Images';
        break;
      case 'home office':
        folderPath = 'General Images';
        break;
      case 'entryway':
        folderPath = 'Foyer Images';
        break;
      case 'outdoor patio':
        folderPath = 'Patio Images';
        break;
      case 'lifestyle':
        if (style.includes('Chair')) {
          folderPath = 'Chair Images';
        } else if (style.includes('Color')) {
          folderPath = 'Color Palette';
        } else if (style.includes('Door')) {
          folderPath = 'Doorknob Images';
        } else {
          folderPath = 'General Images';
        }
        break;
      default:
        folderPath = 'General Images';
    }
    
    // Try to find a matching image file
    const fileName = `${style.replace(/\s+/g, ' ')}.png`;
    const filePath = `${folderPath}/${fileName}`;
    
    // Check if file exists by trying to get its public URL
    const publicUrl = getPublicUrl(bucketName, filePath);
    
    // Test if the URL is accessible (basic check)
    try {
      const response = await fetch(publicUrl, { method: 'HEAD' });
      if (response.ok) {
        return publicUrl;
      }
    } catch (error) {
      console.warn(`Image not found: ${filePath}`);
    }
    
    // Fallback to placeholder
    return '/placeholder.svg';
  } catch (error) {
    console.error('Error fetching quiz image:', error);
    return '/placeholder.svg';
  }
};

// Get style match images
export const getStyleMatchImage = async (style: string): Promise<string> => {
  try {
    const bucketName = 'styledmyhome.images';
    const folderPath = 'Style Match Images';
    const fileName = `${style.replace(/\s+/g, ' ')}.png`;
    const filePath = `${folderPath}/${fileName}`;
    
    const publicUrl = getPublicUrl(bucketName, filePath);
    
    try {
      const response = await fetch(publicUrl, { method: 'HEAD' });
      if (response.ok) {
        return publicUrl;
      }
    } catch (error) {
      console.warn(`Style match image not found: ${filePath}`);
    }
    
    return '/placeholder.svg';
  } catch (error) {
    console.error('Error fetching style match image:', error);
    return '/placeholder.svg';
  }
};

// Get videos for style visualization
export const getStyleVideo = async (style: string): Promise<string> => {
  try {
    const bucketName = 'styledmyhome.videos';
    const fileName = `${style.replace(/\s+/g, ' ')}.mp4`;
    
    const publicUrl = getPublicUrl(bucketName, fileName);
    
    try {
      const response = await fetch(publicUrl, { method: 'HEAD' });
      if (response.ok) {
        return publicUrl;
      }
    } catch (error) {
      console.warn(`Style video not found: ${fileName}`);
    }
    
    // Fallback to a default video URL
    return "https://www.w3schools.com/html/mov_bbb.mp4";
  } catch (error) {
    console.error('Error fetching style video:', error);
    return "https://www.w3schools.com/html/mov_bbb.mp4";
  }
};

// Get material images (wood, metal)
export const getMaterialImage = async (materialType: 'wood' | 'metal', materialName: string): Promise<string> => {
  try {
    const bucketName = 'styledmyhome.images';
    const folderPath = materialType === 'wood' ? 'Wood Images' : 'Metal Images';
    const fileName = `${materialName.replace(/\s+/g, ' ')}.png`;
    const filePath = `${folderPath}/${fileName}`;
    
    const publicUrl = getPublicUrl(bucketName, filePath);
    
    try {
      const response = await fetch(publicUrl, { method: 'HEAD' });
      if (response.ok) {
        return publicUrl;
      }
    } catch (error) {
      console.warn(`Material image not found: ${filePath}`);
    }
    
    return '/placeholder.svg';
  } catch (error) {
    console.error('Error fetching material image:', error);
    return '/placeholder.svg';
  }
};

// Get PDF guide for a style
export const getStylePDF = async (style: string): Promise<string | null> => {
  try {
    const bucketName = 'styledmyhome.pdfs';
    const fileName = `${style.replace(/\s+/g, ' ')} Style Guide.pdf`;
    
    const publicUrl = getPublicUrl(bucketName, fileName);
    
    try {
      const response = await fetch(publicUrl, { method: 'HEAD' });
      if (response.ok) {
        return publicUrl;
      }
    } catch (error) {
      console.warn(`PDF not found: ${fileName}`);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching style PDF:', error);
    return null;
  }
};

// List all files in a bucket folder
export const listFiles = async (bucket: string, folder?: string): Promise<MediaFile[]> => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder || '', {
        limit: 100,
        offset: 0,
      });

    if (error) {
      console.error('Error listing files:', error);
      return [];
    }

    return data.map(file => ({
      name: file.name,
      url: getPublicUrl(bucket, folder ? `${folder}/${file.name}` : file.name),
      bucket,
      path: folder ? `${folder}/${file.name}` : file.name,
    }));
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};