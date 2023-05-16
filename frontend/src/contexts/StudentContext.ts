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
  currentQuestion: number;
  setCurrentQuestion: (_currentQuestion: number) => void;
  answers: Answers[];
  setAnswers: (_answers: (prevAnswers: Answers[]) => Answers[]) => void;
};

const StudentContext = createContext<StudentContextType>({
  test: null,
  setTest: (_test: TestResponse): void => {},
  testSession: null,
  setTestSession: (_testSession: TestSessionMetadata): void => {},
  className: "",
  setClassName: (_className: string): void => {},
  currentQuestion: 0,
  setCurrentQuestion: (_currentQuestion: number): void => {},
  answers: [],
  setAnswers: (_answers: (prevAnswers: Answers[]) => Answers[]): void => {},
});

export default StudentContext;
