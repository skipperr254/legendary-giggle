import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StyleDetails from './StyleDetails';
import StylePercentages from './StylePercentages';
import StyleVideo from './StyleVideo';
import PurchaseDialog from './PurchaseDialog';
import DownloadGenerator from './DownloadGenerator';
import { useToast } from '@/hooks/use-toast';
import { useStyleMaterials, useMediaUrl } from '@/hooks/use-database';
import type { DesignStyle } from '@/lib/database';

interface QuizResultProps {
  style: string;
  description: string;
  characteristics: string[];
  designTips: string[];
  styleData: DesignStyle;
  colorPalette: string[];
  answers: string[];
  onRestart: () => void;
  firstName?: string;
  loading?: boolean;
}

const QuizResult: React.FC<QuizResultProps> = ({
  style,
  description,
  characteristics,
  designTips,
  styleData,
  colorPalette,
  answers,
  onRestart,
  firstName,
  loading = false
}) => {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [shouldDownload, setShouldDownload] = useState(false);
  const [downloadAll, setDownloadAll] = useState(false);
  const { toast } = useToast();
  
  const { materials, loading: materialsLoading } = useStyleMaterials(styleData.id);
  const pdfUrl = useMediaUrl(styleData.pdf_guide);

  const handlePurchaseComplete = (isAllResults = false) => {
    setHasPurchased(true);
    setShouldDownload(true);
    setDownloadAll(isAllResults);
    
    // Reset download trigger after a brief delay
    setTimeout(() => setShouldDownload(false), 1000);
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Calculating your results...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {shouldDownload && (
        <DownloadGenerator
          style={style}
          description={description}
          characteristics={characteristics}
          designTips={designTips}
          metals={materials.metal.map(m => m.material_name)}
          woodFinishes={materials.wood.map(m => m.material_name)}
          colorPalette={colorPalette}
          pdfUrl={pdfUrl !== '/placeholder.svg' ? pdfUrl : undefined}
        />
      )}
      
      <Card className="shadow-lg border border-gray-200 bg-white">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-3xl font-bold text-center text-gray-900">
            {firstName ? `${firstName}, your interior design style is:` : 'Your Interior Design Style'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">
              {style}
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Quick View
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-lg text-gray-900 leading-relaxed">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <StyleDetails 
        style={style} 
        characteristics={characteristics}
        designTips={designTips}
        styleData={styleData}
        materials={materials}
        materialsLoading={materialsLoading}
        colorPalette={colorPalette}
      />
      
      <StyleVideo styleData={styleData} />
      
      <StylePercentages answers={answers} />
      
      <div className="text-center space-y-4">
        {!hasPurchased ? (
          <div className="space-y-3">
            <PurchaseDialog 
              style={style} 
              onPurchaseComplete={() => handlePurchaseComplete(false)}
              allResults={false}
            />
            <PurchaseDialog 
              style={style} 
              onPurchaseComplete={() => handlePurchaseComplete(true)}
              allResults={true}
            />
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-semibold">✓ Purchase Complete!</p>
            <p className="text-green-600 text-sm">
              {downloadAll ? 'All personalized guides have been downloaded.' : 'Your personalized guide has been downloaded.'}
            </p>
          </div>
        )}
        
        <Button
          onClick={onRestart}
          variant="outline"
          className="px-8 py-3 text-lg font-semibold"
        >
          Take Quiz Again
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;