import { QuestionComponent, QuestionComponentType } from "../models/test.model";
import {
  CreateTestRequestDTO,
  TestResponseDTO,
} from "../services/interfaces/testService";
import { mockAdmin } from "./users";

export const questions: Array<Array<QuestionComponent>> = [
  [
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
        questionText: "How many apples does Thomas have left?",
      },
    },
    {
      type: QuestionComponentType.SHORT_ANSWER,
      metadata: {
        answer: 3,
      },
    },
    {
      type: QuestionComponentType.QUESTION_TEXT,
      metadata: {
        questionText: "How many apples does Rick have left?",
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
        questionText: "How many apples does Mike have left?",
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
  [
    {
      type: QuestionComponentType.QUESTION_TEXT,
      metadata: {
        questionText: "How many children are in the image below?",
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
      type: QuestionComponentType.SHORT_ANSWER,
      metadata: {
        answer: 7,
      },
    },
  ],
];

export const mockTest: CreateTestRequestDTO = {
  name: "test",
  admin: "62c248c0f79d6c3c9ebbea94",
  questions,
  grade: 11,
  assessmentType: "Beginning",
  curriculumCountry: "country",
  curriculumRegion: "region",
  status: "Draft",
};

export const mockTestArray: Array<CreateTestRequestDTO> = [
  {
    name: "test1",
    admin: "62c248c0f79d6c3c9ebbea94",
    questions,
    grade: 11,
    assessmentType: "End",
    curriculumCountry: "country1",
    curriculumRegion: "region1",
    status: "Draft",
  },
  {
    name: "test2",
    admin: "62c248c0f79d6c3c9ebbea94",
    questions,
    grade: 11,
    assessmentType: "End",
    curriculumCountry: "country2",
    curriculumRegion: "region1",
    status: "Draft",
  },
  {
    name: "test3",
    admin: "62c248c0f79d6c3c9ebbea94",
    questions,
    grade: 11,
    assessmentType: "Beginning",
    curriculumCountry: "country2",
    curriculumRegion: "region2",
    status: "Draft",
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
  expect(result.admin).toEqual(mockAdmin);
  expect(result.assessmentType).toEqual(expected.assessmentType);
  expect(result.curriculumCountry).toEqual(expected.curriculumCountry);
  expect(result.curriculumRegion).toEqual(expected.curriculumRegion);
  expect(result.status).toEqual(expected.status);

  result.questions.forEach((questionComponents: QuestionComponent[], i) => {
    const expectedQuestion: QuestionComponent[] = expected.questions[i];
    questionComponents.forEach((questionComponent: QuestionComponent, j) => {
      expect(Number(questionComponent.type)).toEqual(expectedQuestion[j].type);
      expect(questionComponent.metadata).toEqual(expectedQuestion[j].metadata);
    });
  });
};
