import { QuestionType } from "../models/test.model";
import {
  NewResultDTO,
  ResultDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../services/interfaces/testSessionService";

export const mockTest = {
  id: "62c248c0f79d6c3c9ebbea95",
  name: "test",
  duration: 300,
  admin: "62c248c0f79d6c3c9ebbea94",
  questions: [
    {
      questionType: QuestionType.NUMERIC_ANSWER,
      questionPrompt: "Numeric answer question",
      questionMetadata: {
        answer: 20,
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
  ],
  grade: 11,
};

export const testResult: ResultDTO = {
  student: "some-student-name",
  score: 50.00,
  answers: [10, 11],
  breakdown: [false, true],
};

export const newTestResult: NewResultDTO = {
  student: "some-student-name",
  answers: [10, 11],
};

export const newTestResultMissingAnswer: NewResultDTO = {
  student: "some-student-name",
  answers: [10],
};

export const mockTestSession: TestSessionRequestDTO = {
  test: "62c248c0f79d6c3c9ebbea95",
  teacher: "62c248c0f79d6c3c9ebbea94",
  school: "62c248c0f79d6c3c9ebbea93",
  gradeLevel: 4,
  results: [testResult],
  accessCode: "1234",
  startTime: new Date("2021-09-01T09:00:00.000Z"),
};

export const mockTestSessionWithoutResults: TestSessionRequestDTO = {
  test: "62c248c0f79d6c3c9ebbea95",
  teacher: "62c248c0f79d6c3c9ebbea94",
  school: "62c248c0f79d6c3c9ebbea93",
  gradeLevel: 4,
  accessCode: "1234",
  startTime: new Date("2021-09-01T09:00:00.000Z"),
};

export const mockTestSessionsWithSameTestId: Array<TestSessionRequestDTO> = [
  {
    test: "62c248c0f79d6c3c9ebbea95",
    teacher: "62c248c0f79d6c3c9ebbea95",
    school: "62c248c0f79d6c3c9ebbea97",
    gradeLevel: 7,
    results: [testResult],
    accessCode: "789",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  },
  {
    test: "62c248c0f79d6c3c9ebbea95",
    teacher: "62c248c0f79d6c3c9ebbea94",
    school: "62c248c0f79d6c3c9ebbea93",
    gradeLevel: 4,
    results: [testResult],
    accessCode: "1234",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  },
];

export const updatedTestSessionWithoutResults: TestSessionRequestDTO = {
  test: "62c248c0f79d6c3c96bbea95",
  teacher: "62c248c0f79d6c3c9ebb1a94",
  school: "62c248c0f79d6c2c9ebbea93",
  gradeLevel: 6,
  accessCode: "4321",
  startTime: new Date("2021-10-01T09:00:00.000Z"),
};

export const updatedTestSession: TestSessionRequestDTO = {
  test: "62c248c0f79d6c3c96bbea95",
  teacher: "62c248c0f79d6c3c9ebb1a94",
  school: "62c248c0f79d6c2c9ebbea93",
  gradeLevel: 6,
  results: [testResult],
  accessCode: "4321",
  startTime: new Date("2021-10-01T09:00:00.000Z"),
};

export const updatedTestSessionMultipleResults: TestSessionRequestDTO = {
  test: "62c248c0f79d6c3c96bbea95",
  teacher: "62c248c0f79d6c3c9ebb1a94",
  school: "62c248c0f79d6c2c9ebbea93",
  gradeLevel: 6,
  results: [testResult, testResult],
  accessCode: "4321",
  startTime: new Date("2021-10-01T09:00:00.000Z"),
};

export const assertResponseMatchesExpected = (
  expected: TestSessionRequestDTO,
  result: TestSessionResponseDTO,
): void => {
  expect(result.id).not.toBeNull();
  expect(result.test.toString()).toEqual(expected.test);
  expect(result.teacher.toString()).toEqual(expected.teacher);
  expect(result.school.toString()).toEqual(expected.school);
  expect(result.gradeLevel).toEqual(expected.gradeLevel);
  expect(result.accessCode).toEqual(expected.accessCode);
  expect(result.startTime).toEqual(expected.startTime);
};

export const assertResultsResponseMatchesExpected = (
  expected: TestSessionRequestDTO,
  result: TestSessionResponseDTO,
): void => {
  const actualResults = result.results != null ? result.results[0] : null;
  const expectedResults = expected.results != null ? expected.results[0] : null;

  expect(
    Array.from(actualResults != null ? Array.from(actualResults.answers) : []),
  ).toEqual(expectedResults?.answers);
  expect(
    Array.from(
      actualResults != null ? Array.from(actualResults.breakdown) : [],
    ),
  ).toEqual(expectedResults?.breakdown);
  expect(actualResults?.score).toEqual(expectedResults?.score);
};
