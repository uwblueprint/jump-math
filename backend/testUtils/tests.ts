import { FileUpload } from "graphql-upload";
import fs from "fs";
import { resolve } from "path";
import {
  QuestionComponent,
  QuestionComponentType,
  AssessmentStatus,
  AssessmentType,
} from "../models/test.model";
import {
  QuestionComponentRequest,
  TestRequestDTO,
  TestResponseDTO,
} from "../services/interfaces/testService";
import { Grade } from "../types";

const imageFile = fs.createReadStream(resolve(__dirname, "assets/test.png"));
const imageUpload: Promise<FileUpload> = new Promise((r) =>
  r({
    createReadStream: () => imageFile,
    filename: "test.png",
    mimetype: "image/png",
    encoding: "7bit",
  }),
);

export const questions: Array<Array<QuestionComponentRequest>> = [
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
      metadata: imageUpload,
    },
    {
      type: QuestionComponentType.SHORT_ANSWER,
      metadata: {
        answer: 7,
      },
    },
  ],
];

export const questionResponses: Array<Array<QuestionComponent>> = [
  questions[0] as Array<QuestionComponent>,
  [
    questions[1][0] as QuestionComponent,
    {
      type: QuestionComponentType.IMAGE,
      metadata: {
        src:
          "https://storage.googleapis.com/jump-math-98edf.appspot.com/test.png",
        fileName: "test.png",
      },
    },
    questions[1][2] as QuestionComponent,
  ],
];

export const mockTest: TestRequestDTO = {
  name: "test",
  questions,
  grade: Grade.GRADE_8,
  assessmentType: AssessmentType.BEGINNING,
  curriculumCountry: "country",
  curriculumRegion: "region",
  status: AssessmentStatus.DRAFT,
};

export const mockTestArray: Array<TestRequestDTO> = [
  {
    name: "test1",
    questions,
    grade: Grade.GRADE_8,
    assessmentType: AssessmentType.END,
    curriculumCountry: "country1",
    curriculumRegion: "region1",
    status: AssessmentStatus.DRAFT,
  },
  {
    name: "test2",
    questions,
    grade: Grade.GRADE_8,
    assessmentType: AssessmentType.END,
    curriculumCountry: "country2",
    curriculumRegion: "region1",
    status: AssessmentStatus.DRAFT,
  },
  {
    name: "test3",
    questions,
    grade: Grade.GRADE_8,
    assessmentType: AssessmentType.END,
    curriculumCountry: "country2",
    curriculumRegion: "region2",
    status: AssessmentStatus.DRAFT,
  },
];

export const mockTestWithId: TestResponseDTO = {
  id: "62c248c0f79d6c3c9ebbea95",
  ...mockTest,
  questions: questionResponses,
};

export const mockTestWithId2: TestResponseDTO = {
  id: "62c248c0f79d6c3c9ebbea90",
  ...mockTest,
  questions: questionResponses,
};

export const assertResponseMatchesExpected = (
  expected: TestRequestDTO,
  result: TestResponseDTO,
): void => {
  expect(result.id).not.toBeNull();
  expect(result.name).toEqual(expected.name);
  expect(result.assessmentType).toEqual(expected.assessmentType);
  expect(result.curriculumCountry).toEqual(expected.curriculumCountry);
  expect(result.curriculumRegion).toEqual(expected.curriculumRegion);
  expect(result.status).toEqual(expected.status);
  expect(result.grade).toEqual(expected.grade);

  result.questions.forEach(
    (questionComponents: QuestionComponentRequest[], i) => {
      const expectedQuestion: QuestionComponentRequest[] =
        expected.questions[i];
      questionComponents.forEach(
        (questionComponent: QuestionComponentRequest, j) => {
          expect(Number(questionComponent.type)).toEqual(
            expectedQuestion[j].type,
          );
          expect(questionComponent.metadata).toEqual(
            expectedQuestion[j].metadata,
          );
        },
      );
    },
  );
};
