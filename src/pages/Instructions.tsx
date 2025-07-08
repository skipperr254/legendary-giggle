import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Star } from 'lucide-react';

interface InstructionsProps {
  onContinue: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            How It Works
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">
            Simple steps to discover your style
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Answer Questions</h3>
                <p className="text-gray-600">We'll ask you about your preferences, lifestyle, and design choices.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get Your Results</h3>
                <p className="text-gray-600">Receive personalized style recommendations based on your answers.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Explore & Apply</h3>
                <p className="text-gray-600">Use your style guide to transform your space with confidence.</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Takes about 5 minutes</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Completely personalized results</span>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={onContinue}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Instructions;