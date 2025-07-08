import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizQuestionProps {
  question: string;
  options: {
    letter: string;
    style: string;
    room: string;
    imageUrl: string;
  }[];
  onAnswer: (letter: string) => void;
  currentQuestion: number;
  totalQuestions: number;
  firstName?: string;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  onAnswer,
  currentQuestion,
  totalQuestions,
  firstName
}) => {
  const personalizedQuestion = firstName && firstName.trim() 
    ? `Hi ${firstName}, ${question}` 
    : question;

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg border border-gray-200 bg-white">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-center text-gray-900">
          Question {currentQuestion} of {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 text-center">{personalizedQuestion}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(option.letter)}
              className="h-auto p-0 bg-white border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-md overflow-hidden"
              variant="outline"
            >
              <div className="w-full">
                <div className="aspect-square w-full bg-gray-100 flex items-center justify-center relative">
                  <img 
                    src={option.imageUrl} 
                    alt={`Design option ${option.letter}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 text-center bg-white border-t border-gray-200">
                  <div className="text-xs text-gray-600">{option.letter}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;