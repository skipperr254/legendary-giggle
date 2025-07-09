import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMediaUrl } from '@/hooks/use-database';
import type { DesignStyle } from '@/lib/database';

interface StyleVideoProps {
  styleData: DesignStyle;
}

const StyleVideo: React.FC<StyleVideoProps> = ({ styleData }) => {
  const videoUrl = useMediaUrl(styleData.video);
  const hasVideo = styleData.video && videoUrl !== '/placeholder.svg';

  return (
    <Card className="shadow-lg border border-border bg-card">
      <CardHeader className="bg-muted border-b border-border">
        <CardTitle className="text-xl font-bold text-center text-foreground">
          {styleData.name} Vision
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-video w-full">
          {!hasVideo ? (
            <div className="w-full h-full bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-500">Video coming soon</span>
              </div>
            </div>
          ) : (
            <video 
              className="w-full h-full rounded-lg shadow-md"
              controls
              preload="metadata"
              poster={useMediaUrl(styleData.hero_image)}
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
          Step into a beautiful {styleData.name} home to see your design style in action.
        </p>
      </CardContent>
    </Card>
  );
};

export default StyleVideo;