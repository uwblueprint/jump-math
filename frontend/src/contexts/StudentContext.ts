/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from "react";

import type { TestResponse } from "../APIClients/types/TestClientTypes";
import type { TestSessionSetupData } from "../APIClients/types/TestSessionClientTypes";
import type { Answers } from "../types/AnswerTypes";

type StudentContextType = {
  test: TestResponse | null;
  setTest: (_test: TestResponse) => void;
  testSession: TestSessionSetupData | null;
  setTestSession: (_testSession: TestSessionSetupData) => void;
  className: string;
  setClassName: (_className: string) => void;
  answers: Answers[];
  setAnswers: (_answers: (prevAnswers: Answers[]) => Answers[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (_currentQuestionIndex: number) => void;
  isLoading: boolean;
  setIsLoading: (_isLoading: boolean) => void;
  isSubmitted: boolean;
  setIsSubmitted: (_isSubmitted: boolean) => void;
};

const StudentContext = createContext<StudentContextType>({
  test: null,
  setTest: (_test: TestResponse): void => {},
  testSession: null,
  setTestSession: (_testSession: TestSessionSetupData): void => {},
  className: "",
  setClassName: (_className: string): void => {},
  answers: [],
  setAnswers: (_answers: (prevAnswers: Answers[]) => Answers[]): void => {},
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: (_currentQuestionIndex: number): void => {},
  isLoading: false,
  setIsLoading: (_isLoading: boolean): void => {},
  isSubmitted: false,
  setIsSubmitted: (_isSubmitted: boolean): void => {},
});

export default StudentContext;
