import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Palette, Sparkles } from "lucide-react";

interface IntroductionProps {
  onContinue: (firstName: string) => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onContinue }) => {
  const [firstName, setFirstName] = useState("");

  const handleContinue = () => {
    onContinue(firstName);
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            <img
              src='https://d64gsuwffb70l.cloudfront.net/686808edbb38639d097340ac_1751668285323_b7d847c0.png'
              alt='My Home Styled Logo'
              className='h-20 w-auto'
            />
          </div>
          <CardTitle className='text-3xl font-bold text-gray-900'>
            Style and Design Guide
          </CardTitle>
          <CardDescription className='text-lg text-gray-600 mt-2'>
            Discover your unique interior design style
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex items-center space-x-3'>
              <Palette className='h-6 w-6 text-blue-600' />
              <span className='text-gray-700'>
                Personalized style recommendations
              </span>
            </div>
            <div className='flex items-center space-x-3'>
              <Sparkles className='h-6 w-6 text-blue-600' />
              <span className='text-gray-700'>Expert design insights</span>
            </div>
          </div>
          <div className='text-center'>
            <p className='text-gray-600 mb-6'>
              Dive into our interactive experience as you define your own
              interior design preferences and get personalized recommendations
              for your space.
            </p>
            <div className='mb-6'>
              <Label
                htmlFor='firstName'
                className='text-left block mb-2 text-gray-700'
              >
                First Name
              </Label>
              <Input
                id='firstName'
                type='text'
                placeholder='Enter your first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='max-w-sm mx-auto'
              />
            </div>
            <Button
              onClick={handleContinue}
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3'
            >
              Let's Begin
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Introduction;
