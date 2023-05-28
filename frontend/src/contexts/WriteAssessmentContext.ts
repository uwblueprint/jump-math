/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from "react";

import type { Answers } from "../types/AnswerTypes";

type WriteAssessmentContextType = {
  answers: Answers[];
  setAnswers: (_answers: (prevAnswers: Answers[]) => Answers[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (_currentQuestionIndex: number) => void;
  isLoading: boolean;
  setIsLoading: (_isLoading: boolean) => void;
  isSubmitted: boolean;
  setIsSubmitted: (_isSubmitted: boolean) => void;
};

const WriteAssessmentContext = createContext<WriteAssessmentContextType>({
  answers: [],
  setAnswers: (_answers: (prevAnswers: Answers[]) => Answers[]): void => {},
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: (_currentQuestionIndex: number): void => {},
  isLoading: false,
  setIsLoading: (_isLoading: boolean): void => {},
  isSubmitted: false,
  setIsSubmitted: (_isSubmitted: boolean): void => {},
});

export default WriteAssessmentContext;
