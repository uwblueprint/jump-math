import { AssessmentStatus, AssessmentType } from "../models/test.model";
import {
  TestDTO,
  TestRequestDTO,
  TestResponseDTO,
} from "../services/interfaces/testService";
import { Grade } from "../types";
import {
  ImagePreviewMetadata,
  QuestionComponent,
  QuestionComponentRequest,
  QuestionComponentResponse,
  QuestionComponentType,
} from "../types/questionTypes";
import { imageUpload } from "./imageStorage";

export const questionsWithoutImage: Array<Array<QuestionComponent>> = [
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
      type: QuestionComponentType.SHORT_ANSWER,
      metadata: {
        answer: 7,
      },
    },
  ],
];

export const questions: Array<
  Array<QuestionComponent>
> = questionsWithoutImage.concat([
  [
    {
      type: QuestionComponentType.IMAGE,
      metadata: {
        filePath: "assessment-images/test.png",
      },
    },
  ],
]);

export const questionsRequest: Array<
  Array<QuestionComponentRequest>
> = ((questionsWithoutImage as unknown) as QuestionComponentRequest[][]).concat(
  [
    [
      {
        type: QuestionComponentType.IMAGE,
        metadata: imageUpload,
      },
    ],
  ],
);

export const imageUrl =
  "https://storage.googleapis.com/jump-math-98edf.appspot.com/assessment-images/test.png";

export const questionsResponse: Array<
  Array<QuestionComponentResponse>
> = ((questionsWithoutImage as unknown) as QuestionComponentResponse[][]).concat(
  [
    [
      {
        type: QuestionComponentType.IMAGE,
        metadata: {
          url: imageUrl,
        },
      },
    ],
  ],
);

export const mockTestRequest: TestRequestDTO = {
  name: "test",
  questions: questionsRequest,
  grade: Grade.GRADE_8,
  assessmentType: AssessmentType.BEGINNING,
  curriculumCountry: "country",
  curriculumRegion: "region",
  status: AssessmentStatus.DRAFT,
};

export const mockTestRequest2: TestRequestDTO = {
  name: "newTest",
  questions: questionsRequest,
  grade: Grade.GRADE_7,
  assessmentType: AssessmentType.END,
  curriculumCountry: "newCountry",
  curriculumRegion: "newRegion",
  status: AssessmentStatus.PUBLISHED,
};

export const mockTestResponse: TestResponseDTO = {
  id: "62c248c0f79d6c3c9ebbea95",
  ...mockTestRequest,
  questions: questionsResponse,
};

export const mockTestResponse2: TestResponseDTO = {
  id: "62c248c0f79d6c3c9ebbea96",
  ...mockTestRequest2,
  questions: questionsResponse,
};

export const mockTest: TestDTO = {
  ...mockTestRequest,
  questions,
};

export const mockTestArray: Array<TestDTO> = [
  {
    ...mockTest,
    name: "test1",
  },
  {
    ...mockTest,
    name: "test2",
  },
  {
    ...mockTest,
    name: "test3",
  },
];

export const mockTestRequestArray: Array<TestRequestDTO> = [
  {
    ...mockTestRequest,
    name: "test1",
  },
  {
    ...mockTestRequest,
    name: "test2",
  },
  {
    ...mockTestRequest,
    name: "test3",
  },
];

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
    (questionComponents: QuestionComponentResponse[], i) => {
      const expectedQuestion: QuestionComponentRequest[] =
        expected.questions[i];
      questionComponents.forEach(
        (questionComponent: QuestionComponentResponse, j) => {
          if (questionComponent.type === QuestionComponentType.IMAGE) {
            expect(
              (questionComponent.metadata as ImagePreviewMetadata).url,
            ).toEqual(imageUrl);
          } else {
            expect(Number(questionComponent.type)).toEqual(
              expectedQuestion[j].type,
            );
            expect(questionComponent.metadata).toEqual(
              expectedQuestion[j].metadata,
            );
          }
        },
      );
    },
  );
};
