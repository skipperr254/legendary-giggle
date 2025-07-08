import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getStyleFromOption } from '@/data/styleResults';

interface StylePercentagesProps {
  answers: string[];
}

const StylePercentages: React.FC<StylePercentagesProps> = ({ answers }) => {
  const calculatePercentages = () => {
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

    // Count occurrences of each style using the correct mapping
    answers.forEach((letter) => {
      const optionKey = `Option ${letter}`;
      const actualStyle = getStyleFromOption(optionKey);
      if (styleScores.hasOwnProperty(actualStyle)) {
        styleScores[actualStyle]++;
      }
    });

    // Convert to percentages
    const totalAnswers = answers.length;
    const percentages = Object.entries(styleScores)
      .map(([style, score]) => ({
        style,
        percentage: Math.round((score / totalAnswers) * 100)
      }))
      .filter(item => item.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3); // Get top 3 highest styles

    return percentages;
  };

  const topStyles = calculatePercentages();

  if (topStyles.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Style Matches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStyles.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">
                  {item.style}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.percentage}%
                </span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StylePercentages;