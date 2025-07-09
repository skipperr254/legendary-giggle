import { useState, useEffect } from 'react';
import {
  getDesignStyles,
  getDesignStyleBySlug,
  getQuizQuestions,
  getStyleMaterials,
  calculateQuizResult,
  getMediaUrl,
  type DesignStyle,
  type QuizQuestion,
  type StyleMaterial
} from '@/lib/database';

// Hook for fetching all design styles
export const useDesignStyles = () => {
  const [styles, setStyles] = useState<DesignStyle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        setLoading(true);
        const data = await getDesignStyles();
        setStyles(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch design styles');
        console.error('Error fetching design styles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStyles();
  }, []);

  return { styles, loading, error };
};

// Hook for fetching a single design style
export const useDesignStyle = (slug: string) => {
  const [style, setStyle] = useState<DesignStyle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStyle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await getDesignStyleBySlug(slug);
        setStyle(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch design style');
        console.error('Error fetching design style:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStyle();
  }, [slug]);

  return { style, loading, error };
};

// Hook for fetching quiz questions
export const useQuizQuestions = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await getQuizQuestions();
        setQuestions(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch quiz questions');
        console.error('Error fetching quiz questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading, error };
};

// Hook for fetching style materials
export const useStyleMaterials = (styleId: string) => {
  const [materials, setMaterials] = useState<{
    wood: StyleMaterial[];
    metal: StyleMaterial[];
  }>({ wood: [], metal: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!styleId) return;
      
      try {
        setLoading(true);
        const data = await getStyleMaterials(styleId);
        setMaterials(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch style materials');
        console.error('Error fetching style materials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [styleId]);

  return { materials, loading, error };
};

// Hook for calculating quiz results
export const useQuizResult = () => {
  const [result, setResult] = useState<DesignStyle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateResult = async (answers: string[]) => {
    try {
      setLoading(true);
      setError(null);
      const data = await calculateQuizResult(answers);
      setResult(data);
    } catch (err) {
      setError('Failed to calculate quiz result');
      console.error('Error calculating quiz result:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetResult = () => {
    setResult(null);
    setError(null);
  };

  return { result, loading, error, calculateResult, resetResult };
};

// Utility hook for getting media URLs
export const useMediaUrl = (mediaFile: any) => {
  return mediaFile ? getMediaUrl(mediaFile) : '/placeholder.svg';
};