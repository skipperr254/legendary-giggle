import React, { useState } from "react";
import Introduction from "@/pages/Introduction";
import Instructions from "@/pages/Instructions";
import InteriorDesignQuiz from "./InteriorDesignQuiz";

const AppLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    "intro" | "instructions" | "quiz"
  >("intro");
  const [firstName, setFirstName] = useState("");

  const handleContinueFromIntro = (name: string) => {
    setFirstName(name);
    setCurrentPage("instructions");
  };

  const handleContinueFromInstructions = () => {
    setCurrentPage("quiz");
  };

  if (currentPage === "intro") {
    return <Introduction onContinue={handleContinueFromIntro} />;
  }

  if (currentPage === "instructions") {
    return <Instructions onContinue={handleContinueFromInstructions} />;
  }

  return (
    <div className='min-h-screen'>
      <InteriorDesignQuiz firstName={firstName} />
    </div>
  );
};

export default AppLayout;
