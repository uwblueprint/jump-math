import {
  Question,
  QuestionComponent,
  QuestionComponentType,
} from "../models/test.model";
import {
  CreateTestRequestDTO,
  TestResponseDTO,
} from "../services/interfaces/testService";
import { mockAdmin } from "./users";

export const questions: Array<Question> = [
  {
    question: [
      {
        type: QuestionComponentType.TEXT,
        metadata: {
          text:
            "Johnny is selling 19 apples at his store. Thomas buys 7 apples, Rick buys 2 apples, and Mike buys 3 apples. Then Thomas gives Rick 1 apple and Mike 3 apples.",
        },
      },
      {
        type: QuestionComponentType.QUESTION_TEXT,
        metadata: {
          text: "How many apples does Thomas have left?",
        },
      },
      {
        type: QuestionComponentType.NUMERIC_QUESTION,
        metadata: {
          answer: 3,
        },
      },
      {
        type: QuestionComponentType.QUESTION_TEXT,
        metadata: {
          text: "How many apples does Rick have left?",
        },
      },
      {
        type: QuestionComponentType.MULTIPLE_CHOICE,
        metadata: {
          options: ["3", "4", "5", "6"],
          answerIndex: 0,
        },
      },
      {
        type: QuestionComponentType.QUESTION_TEXT,
        metadata: {
          text: "How many apples does Mike have left?",
        },
      },
      {
        type: QuestionComponentType.MULTI_SELECT,
        metadata: {
          options: ["3", "6", "3 + 3", "0"],
          answerIndices: [1, 2],
        },
      },
    ],
  },
  {
    question: [
      {
        type: QuestionComponentType.QUESTION_TEXT,
        metadata: {
          text: "How many children are in the image below?",
        },
      },
      {
        type: QuestionComponentType.IMAGE,
        metadata: {
          src:
            "https://storage.googleapis.com/jump-math-98edf.appspot.com/teacher-signup.png",
        },
      },
      {
        type: QuestionComponentType.NUMERIC_QUESTION,
        metadata: {
          answer: 7,
        },
      },
    ],
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

export const mockTestWithId2: TestResponseDTO = {
  id: "62c248c0f79d6c3c9ebbea90",
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
    const expectedQuestion: QuestionComponent[] =
      expected.questions[i].question;
    question.question.forEach((questionComponent: QuestionComponent, j) => {
      expect(Number(questionComponent.type)).toEqual(expectedQuestion[j].type);
      expect(questionComponent.metadata).toEqual(expectedQuestion[j].metadata);
    });
  });
};
