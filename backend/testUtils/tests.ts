import { Question, QuestionType } from "../models/test.model";
import {
  CreateTestRequestDTO,
  TestResponseDTO,
} from "../services/interfaces/testService";

export const questions = [
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

export const mockAdmin = {
  id: "62c248c0f79d6c3c9ebbea94",
  firstName: "Admin",
  lastName: "One",
  authId: "123",
  role: "Admin",
};

export const assertResponseMatchesExpected = (
  expected: CreateTestRequestDTO,
  result: TestResponseDTO,
): void => {
  expect(result.id).not.toBeNull();
  expect(result.name).toEqual(expected.name);
  expect(result.duration).toEqual(expected.duration);
  expect(result.admin).toEqual(mockAdmin);

  result.questions.forEach((question: Question, i) => {
    expect(Number(question.questionType)).toEqual(
      expected.questions[i].questionType,
    );
    expect(question.questionPrompt).toEqual(
      expected.questions[i].questionPrompt,
    );
    expect(question.questionMetadata).toEqual(
      expected.questions[i].questionMetadata,
    );
  });
};
