import { Question, QuestionType } from "../models/test.model";
import {
  CreateTestRequestDTO,
  TestResponseDTO,
} from "../services/interfaces/testService";
import mockAdmin from "./users";

export const questions: Array<Question> = [
  {
    questionType: QuestionType.NUMERIC_ANSWER,
    questionPrompt: "Numeric answer question",
    questionMetadata: {
      answer: 10.5,
    },
  },
  {
    questionType: QuestionType.MULTIPLE_CHOICE,
    questionPrompt: "Multiple Choice question",
    questionMetadata: {
      options: ["11", "12", "13", "14"],
      answerIndex: 0,
    },
  },
  {
    questionType: QuestionType.MULTIPLE_CHOICE,
    questionPrompt: "Multiple Choice question",
    questionMetadata: {
      options: ["11", "12", "13", "14"],
      answerIndex: 1,
    },
  },
  {
    questionType: QuestionType.NUMERIC_ANSWER,
    questionPrompt: "Numeric answer question",
    questionMetadata: {
      answer: 14,
    },
  },
];

export const mockTest: CreateTestRequestDTO = {
  name: "test",
  duration: 300,
  admin: "62c248c0f79d6c3c9ebbea94",
  questions,
  grade: 11,
};

export const mockTestArray = [
  {
    name: "test1",
    duration: 300,
    admin: "62c248c0f79d6c3c9ebbea94",
    questions,
    grade: 11,
  },
  {
    name: "test2",
    duration: 301,
    admin: "62c248c0f79d6c3c9ebbea94",
    questions,
    grade: 11,
  },
  {
    name: "test3",
    duration: 302,
    admin: "62c248c0f79d6c3c9ebbea94",
    questions,
    grade: 11,
  },
];

export const mockTestWithId: TestResponseDTO = {
  id: "62c248c0f79d6c3c9ebbea95",
  ...mockTest,
  admin: mockAdmin,
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
