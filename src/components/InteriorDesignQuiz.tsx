import React, { useState, useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import { quizQuestions } from '@/data/quizData';
import { styleResults, getStyleFromOption } from '@/data/styleResults';

interface InteriorDesignQuizProps {
  firstName?: string;
}

const InteriorDesignQuiz: React.FC<InteriorDesignQuizProps> = ({ firstName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Scroll to top whenever currentQuestion changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  const handleAnswer = (letter: string) => {
    const newAnswers = [...answers, letter];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    const styleScores: Record<string, number> = {
      "French Country": 0,
      "Japandi": 0,
      "Modern Farmhouse": 0,
      "Bohemian": 0,
      "Mid Century Modern": 0,
      "Traditional": 0,
      "Modern Minimalist": 0,
      "Transitional": 0
    };

    // Convert option letters to actual styles and count occurrences
    answers.forEach((letter) => {
      const optionKey = `Option ${letter}`;
      const actualStyle = getStyleFromOption(optionKey);
      if (styleScores.hasOwnProperty(actualStyle)) {
        styleScores[actualStyle]++;
      }
    });

    // Find the style with the highest score
    const topStyle = Object.entries(styleScores).reduce((a, b) => 
      styleScores[a[0]] > styleScores[b[0]] ? a : b
    )[0];

    return styleResults[topStyle];
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showResult) {
    const result = calculateResult();
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <QuizResult
          style={result.style}
          description={result.description}
          characteristics={result.characteristics}
          designTips={result.designTips}
          metals={result.metals}
          woodFinishes={result.woodFinishes}
          colorPalette={result.colorPalette}
          answers={answers}
          onRestart={restartQuiz}
          firstName={firstName}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <QuizQuestion
        question={quizQuestions[currentQuestion].question}
        options={quizQuestions[currentQuestion].options}
        onAnswer={handleAnswer}
        currentQuestion={currentQuestion + 1}
        totalQuestions={quizQuestions.length}
        firstName={firstName}
      />
    </div>
  );
};

export default InteriorDesignQuiz;