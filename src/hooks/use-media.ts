import { useState, useEffect } from 'react';
import { getQuizImages, getStyleMatchImage, getStyleVideo, getMaterialImage } from '@/lib/supabase-storage';

// Hook for quiz images
export const useQuizImage = (roomType: string, style: string) => {
  const [imageUrl, setImageUrl] = useState<string>('/placeholder.svg');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const url = await getQuizImages(roomType, style);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading quiz image:', error);
        setImageUrl('/placeholder.svg');
      } finally {
        setLoading(false);
      }
    };

    if (roomType && style) {
      fetchImage();
    }
  }, [roomType, style]);

  return { imageUrl, loading };
};

// Hook for style match images
export const useStyleMatchImage = (style: string) => {
  const [imageUrl, setImageUrl] = useState<string>('/placeholder.svg');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const url = await getStyleMatchImage(style);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading style match image:', error);
        setImageUrl('/placeholder.svg');
      } finally {
        setLoading(false);
      }
    };

    if (style) {
      fetchImage();
    }
  }, [style]);

  return { imageUrl, loading };
};

// Hook for style videos
export const useStyleVideo = (style: string) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const url = await getStyleVideo(style);
        setVideoUrl(url);
      } catch (error) {
        console.error('Error loading style video:', error);
        setVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4");
      } finally {
        setLoading(false);
      }
    };

    if (style) {
      fetchVideo();
    }
  }, [style]);

  return { videoUrl, loading };
};

// Hook for material images
export const useMaterialImage = (materialType: 'wood' | 'metal', materialName: string) => {
  const [imageUrl, setImageUrl] = useState<string>('/placeholder.svg');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const url = await getMaterialImage(materialType, materialName);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading material image:', error);
        setImageUrl('/placeholder.svg');
      } finally {
        setLoading(false);
      }
    };

    if (materialType && materialName) {
      fetchImage();
    }
  }, [materialType, materialName]);

  return { imageUrl, loading };
};