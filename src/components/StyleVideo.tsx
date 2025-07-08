import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StyleVideoProps {
  style: string;
}

const StyleVideo: React.FC<StyleVideoProps> = ({ style }) => {
  // Map styles to video URLs (using placeholder videos for demo)
  const getVideoUrl = (styleName: string): string => {
    const videoMap: Record<string, string> = {
      "French Country": "https://www.w3schools.com/html/mov_bbb.mp4",
      "Japandi": "https://www.w3schools.com/html/mov_bbb.mp4",
      "Modern Farmhouse": "https://www.w3schools.com/html/mov_bbb.mp4",
      "Bohemian": "https://www.w3schools.com/html/mov_bbb.mp4",
      "Mid Century Modern": "https://www.w3schools.com/html/mov_bbb.mp4",
      "Traditional": "https://www.w3schools.com/html/mov_bbb.mp4",
      "Modern Minimalist": "https://www.w3schools.com/html/mov_bbb.mp4",
      "Transitional": "https://www.w3schools.com/html/mov_bbb.mp4"
    };
    return videoMap[styleName] || "https://www.w3schools.com/html/mov_bbb.mp4";
  };

  return (
    <Card className="shadow-lg border border-border bg-card">
      <CardHeader className="bg-muted border-b border-border">
        <CardTitle className="text-xl font-bold text-center text-foreground">
          {style} Vision
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-video w-full">
          <video 
            className="w-full h-full rounded-lg shadow-md"
            controls
            preload="metadata"
            poster="/placeholder.svg"
          >
            <source src={getVideoUrl(style)} type="video/mp4" />
            <p className="text-muted-foreground text-center p-4">
              Your browser doesn't support video playback. 
              <a href={getVideoUrl(style)} className="text-primary underline">
                Download the video
              </a>
            </p>
          </video>
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Step into a beautiful {style} home to see your design style in action.
        </p>
      </CardContent>
    </Card>
  );
};

export default StyleVideo;