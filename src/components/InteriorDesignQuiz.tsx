import React, { useState, useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import { useQuizQuestions, useQuizResult } from '@/hooks/use-database';

interface InteriorDesignQuizProps {
  firstName?: string;
}

const InteriorDesignQuiz: React.FC<InteriorDesignQuizProps> = ({ firstName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  
  const { questions, loading: questionsLoading } = useQuizQuestions();
  const { result, loading: resultLoading, calculateResult } = useQuizResult();

  // Scroll to top whenever currentQuestion changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  const handleAnswer = (letter: string) => {
    const newAnswers = [...answers, letter];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result when quiz is complete
      calculateResult(newAnswers);
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading state
  if (questionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <QuizResult
          style={result.name}
          description={result.description}
          characteristics={result.characteristics}
          designTips={result.designTips}
          styleData={result}
          colorPalette={result.colorPalette}
          answers={answers}
          onRestart={restartQuiz}
          firstName={firstName}
          loading={resultLoading}
        />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">No quiz questions available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <QuizQuestion
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
        currentQuestion={currentQuestion + 1}
        totalQuestions={questions.length}
        firstName={firstName}
      />
    </div>
  );
};

export default InteriorDesignQuiz;