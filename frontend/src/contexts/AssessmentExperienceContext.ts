/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from "react";

import type { Answers } from "../types/AnswerTypes";
import type { Question } from "../types/QuestionTypes";

type AssessmentExperienceContextType = {
  questions: Question[];
  answers: Answers[];
  setAnswers: (_answers: (prevAnswers: Answers[]) => Answers[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (_currentQuestionIndex: number) => void;
};

const AssessmentExperienceContext =
  createContext<AssessmentExperienceContextType>({
    questions: [],
    answers: [],
    setAnswers: (_answers: (prevAnswers: Answers[]) => Answers[]): void => {},
    currentQuestionIndex: 0,
    setCurrentQuestionIndex: (_currentQuestionIndex: number): void => {},
  });

export default AssessmentExperienceContext;
