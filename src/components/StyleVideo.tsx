import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStyleVideo } from '@/hooks/use-media';

interface StyleVideoProps {
  style: string;
}

const StyleVideo: React.FC<StyleVideoProps> = ({ style }) => {
  const { videoUrl, loading } = useStyleVideo(style);

  return (
    <Card className="shadow-lg border border-border bg-card">
      <CardHeader className="bg-muted border-b border-border">
        <CardTitle className="text-xl font-bold text-center text-foreground">
          {style} Vision
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-video w-full">
          {loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg shadow-md flex items-center justify-center">
              <span className="text-gray-400">Loading video...</span>
            </div>
          ) : (
            <video 
              className="w-full h-full rounded-lg shadow-md"
              controls
              preload="metadata"
              poster="/placeholder.svg"
            >
              <source src={videoUrl} type="video/mp4" />
              <p className="text-muted-foreground text-center p-4">
                Your browser doesn't support video playback. 
                <a href={videoUrl} className="text-primary underline">
                  Download the video
                </a>
              </p>
            </video>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Step into a beautiful {style} home to see your design style in action.
        </p>
      </CardContent>
    </Card>
  );
};

export default StyleVideo;