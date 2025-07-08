export interface Question {
  id: number;
  question: string;
  options: {
    letter: string;
    style: string;
    room: string;
    imageUrl: string;
  }[];
}

const designStyles = [
  "French Country",
  "Japandi",
  "Modern Farmhouse",
  "Bohemian",
  "Mid Century Modern",
  "Coastal",
  "Industrial",
  "Transitional"
];

const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate randomized options for each question
function generateRandomizedOptions(room: string): { letter: string; style: string; room: string; imageUrl: string; }[] {
  const shuffledStyles = shuffleArray(designStyles);
  return shuffledStyles.map((style, index) => ({
    letter: optionLetters[index],
    style,
    room,
    imageUrl: "/placeholder.svg"
  }));
}

const baseQuestions: Question[] = [
  {
    id: 1,
    question: "Which kitchen style can you envision yourself in?",
    options: generateRandomizedOptions("Kitchen")
  },
  {
    id: 2,
    question: "Which living room style speaks to you?",
    options: generateRandomizedOptions("Living Room")
  },
  {
    id: 3,
    question: "Which dining room style can you see yourself enjoying meals in?",
    options: generateRandomizedOptions("Dining Room")
  },
  {
    id: 4,
    question: "Which primary bedroom style would make you feel most at home?",
    options: generateRandomizedOptions("Primary Bedroom")
  },
  {
    id: 5,
    question: "Which primary bathroom style appeals to you most?",
    options: generateRandomizedOptions("Primary Bathroom")
  },
  {
    id: 6,
    question: "Which wood finish appeals to you?",
    options: generateRandomizedOptions("Home Office")
  },
  {
    id: 7,
    question: "Which entryway style would welcome you home?",
    options: generateRandomizedOptions("Entryway")
  },
  {
    id: 8,
    question: "Which outdoor patio style would be your perfect retreat?",
    options: generateRandomizedOptions("Outdoor Patio")
  },
  {
    id: 9,
    question: "Which color palette do you prefer?",
    options: generateRandomizedOptions("Lifestyle")
  },
  {
    id: 10,
    question: "Which chair would you like to relax in?",
    options: generateRandomizedOptions("Lifestyle")
  },
  {
    id: 11,
    question: "Which door knob would you open to your home?",
    options: generateRandomizedOptions("Lifestyle")
  }
];

// Shuffle the questions and export
export const quizQuestions: Question[] = shuffleArray(baseQuestions);