import MgTestSession, { GradingStatus } from "../models/testSession.model";
import {
  ResultRequestDTO,
  ResultResponseDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../services/interfaces/testSessionService";
import { mockSchoolWithId, mockSchoolWithId2 } from "./school";
import { mockTestWithId } from "./tests";
import { mockTeacher } from "./users";

/**
 * Mock Test Results
 */
export const mockUngradedTestResult: ResultRequestDTO = {
  student: "some-student-name",
  score: null,
  answers: [[[3], [0], [1, 2], [1, 4]], []],
  breakdown: [],
  gradingStatus: GradingStatus.UNGRADED,
};

export const mockGradedTestResult: ResultResponseDTO = {
  student: "some-student-name",
  score: 80.0,
  answers: [[[3], [0], [1, 2], [1, 4]], []],
  breakdown: [[true, true, true, true], [false]],
  gradingStatus: GradingStatus.GRADED,
};

export const mockGradedTestResult2: ResultResponseDTO = {
  student: "some-student-name-2",
  score: 40.0,
  answers: [[[0], [3], [1, 2], [5, 4]], [[7]]],
  breakdown: [[false, false, true, false], [true]],
  gradingStatus: GradingStatus.GRADED,
};

export const mockGradedTestResult3: ResultResponseDTO = {
  student: "some-student-name-3",
  score: 80.0,
  answers: [[[3], [0], [1, 2]], [[7]]],
  breakdown: [[true, true, true, false], [true]],
  gradingStatus: GradingStatus.GRADED,
};

export const mockGradedTestResult4: ResultResponseDTO = {
  student: "some-student-name-3",
  score: 20.0,
  answers: [[[1.5], [1], [3]], [[7]]],
  breakdown: [[false, false, false, false], [true]],
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

export const mockTestSessionsWithSameAccessCode: Array<TestSessionRequestDTO> = [
  {
    test: "62c248c0f79d6c3c9ebbea39",
    teacher: "62c248c0f79d6c3c9ebbea95",
    school: "62c248c0f79d6c3c9ebbea97",
    gradeLevel: 7,
    results: [mockGradedTestResult],
    accessCode: "1234",
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

export const mockTestSessions: TestSessionRequestDTO[] = [
  {
    test: mockTestWithId.id,
    teacher: mockTeacher.id,
    school: mockSchoolWithId.id,
    gradeLevel: 4,
    results: [
      mockGradedTestResult,
      mockGradedTestResult2,
      mockGradedTestResult3,
      mockUngradedTestResult,
    ],
    accessCode: "1234",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  },
  {
    test: mockTestWithId.id,
    teacher: mockTeacher.id,
    school: mockSchoolWithId.id,
    gradeLevel: 4,
    results: [
      mockGradedTestResult2,
      mockGradedTestResult4,
      mockGradedTestResult,
    ],
    accessCode: "1234",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  },
  {
    test: mockTestWithId.id,
    teacher: mockTeacher.id,
    school: mockSchoolWithId2.id,
    gradeLevel: 4,
    results: [
      mockGradedTestResult3,
      mockUngradedTestResult,
      mockGradedTestResult4,
      mockGradedTestResult,
    ],
    accessCode: "1234",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  },
  {
    test: mockTestWithId.id,
    teacher: mockTeacher.id,
    school: mockSchoolWithId2.id,
    gradeLevel: 4,
    results: [
      mockGradedTestResult4,
      mockGradedTestResult2,
      mockGradedTestResult2,
      mockGradedTestResult2,
    ],
    accessCode: "1234",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  },
  {
    test: "62c248c0f79d6c3c9ebbea94", // invalid test (will not be created)
    teacher: mockTeacher.id,
    school: mockSchoolWithId.id,
    gradeLevel: 4,
    results: [mockGradedTestResult],
    accessCode: "1234",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  },
];

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

export const createTestSessionWithSchoolAndResults = async (
  schoolId: string,
  results: ResultRequestDTO[],
): Promise<void> => {
  await MgTestSession.create({
    test: mockTestWithId.id,
    teacher: mockTeacher.id,
    school: schoolId,
    gradeLevel: 4,
    results,
    accessCode: "1234",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  });
};
