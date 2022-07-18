import { QuestionType } from "../models/test.model";

const questions = [
  {
    questionType: QuestionType.NUMERIC_ANSWER,
    questionPrompt: "Question",
    questionMetadata: {
      answer: 3,
    },
  },
];

export const mockTest = {
  name: "test",
  duration: 300,
  admin: "62c248c0f79d6c3c9ebbea94",
  questions,
  grade: 11,
};
