/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from "react";

import { TestResponse } from "../APIClients/types/TestClientTypes";
import { TestSessionMetadata } from "../APIClients/types/TestSessionClientTypes";
import { Answers } from "../types/AnswerTypes";

type StudentContextType = {
  test: TestResponse | null;
  setTest: (_test: TestResponse) => void;
  testSession: TestSessionMetadata | null;
  setTestSession: (_testSession: TestSessionMetadata) => void;
  className: string;
  setClassName: (_className: string) => void;
  answers: Answers[];
  setAnswers: (_answers: (prevAnswers: Answers[]) => Answers[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (_currentQuestionIndex: number) => void;
};

const StudentContext = createContext<StudentContextType>({
  test: null,
  setTest: (_test: TestResponse): void => {},
  testSession: null,
  setTestSession: (_testSession: TestSessionMetadata): void => {},
  className: "",
  setClassName: (_className: string): void => {},
  answers: [],
  setAnswers: (_answers: (prevAnswers: Answers[]) => Answers[]): void => {},
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: (_currentQuestionIndex: number): void => {},
});

export default StudentContext;
