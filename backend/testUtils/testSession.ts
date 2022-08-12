import { GradingStatus } from "../models/testSession.model";
import {
  ResultRequestDTO,
  ResultResponseDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../services/interfaces/testSessionService";
import { mockSchoolWithId } from "./school";
import { mockTestWithId } from "./tests";
import { mockTeacher } from "./users";

/**
 * Mock Test Results
 */
export const mockUngradedTestResult: ResultRequestDTO = {
  student: "some-student-name",
  score: null,
  answers: [10.5, 11, 1, null],
  breakdown: [],
  gradingStatus: GradingStatus.UNGRADED,
};

export const mockGradedTestResult: ResultResponseDTO = {
  student: "some-student-name",
  score: 50.0,
  answers: [10.5, 11, 1, null],
  breakdown: [true, false, true, false],
  gradingStatus: GradingStatus.GRADED,
};

export const mockGradedTestResult2: ResultResponseDTO = {
  student: "some-student-name-2",
  score: 75.0,
  answers: [10.5, 0, 2, 14],
  breakdown: [true, true, false, true],
  gradingStatus: GradingStatus.GRADED,
};

export const mockGradedTestResult3: ResultResponseDTO = {
  student: "some-student-name-3",
  score: 100.0,
  answers: [10.5, 0, 1, 14],
  breakdown: [true, true, true, true],
  gradingStatus: GradingStatus.GRADED,
};

export const mockGradedTestResult4: ResultResponseDTO = {
  student: "some-student-name-3",
  score: 50.0,
  answers: [10.5, 1, 1, 13],
  breakdown: [true, false, true, false],
  gradingStatus: GradingStatus.GRADED,
};

/**
 * Mock Test Sessions
 */
export const mockTestSession: TestSessionRequestDTO = {
  test: mockTestWithId.id,
  teacher: mockTeacher.id,
  school: mockSchoolWithId.id,
  gradeLevel: 4,
  results: [mockGradedTestResult],
  accessCode: "1234",
  startTime: new Date("2021-09-01T09:00:00.000Z"),
};

export const mockTestSessionsWithSameTestId: Array<TestSessionRequestDTO> = [
  {
    test: "62c248c0f79d6c3c9ebbea95",
    teacher: "62c248c0f79d6c3c9ebbea95",
    school: "62c248c0f79d6c3c9ebbea97",
    gradeLevel: 7,
    results: [mockGradedTestResult],
    accessCode: "789",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  },
  {
    test: "62c248c0f79d6c3c9ebbea95",
    teacher: "62c248c0f79d6c3c9ebbea94",
    school: "62c248c0f79d6c3c9ebbea93",
    gradeLevel: 4,
    results: [mockGradedTestResult],
    accessCode: "1234",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  },
];

export const mockTestSessionWithId: TestSessionResponseDTO = {
  id: "62c248c0f79d6c3c9ebbea90",
  test: mockTestWithId,
  teacher: mockTeacher,
  school: mockSchoolWithId,
  gradeLevel: 4,
  results: [mockGradedTestResult],
  accessCode: "1234",
  startTime: new Date("2021-09-01T09:00:00.000Z"),
};

export const assertResponseMatchesExpected = (
  expected: TestSessionRequestDTO,
  result: TestSessionResponseDTO,
): void => {
  expect(result.id).not.toBeNull();
  expect(result.test).toEqual(mockTestWithId);
  expect(result.teacher).toEqual(mockTeacher);
  expect(result.school).toEqual(mockSchoolWithId);
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
