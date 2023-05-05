import MgTestSession, {
  GradingStatus,
  Result,
} from "../models/testSession.model";
import {
  ResultRequestDTO,
  ResultResponseDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../services/interfaces/testSessionService";
import { mockSchoolWithId, mockSchoolWithId2 } from "./school";
import { mockTestWithId } from "./tests";
import { mockTeacher } from "./users";

type TestSessionDTO = TestSessionRequestDTO & {
  results: Result[];
};

/**
 * Mock Test Results
 */
export const mockUngradedTestResult: ResultRequestDTO = {
  student: "some-student-name",
  score: null,
  answers: [[[3], [0], [1, 2], [1, 4]], [[]]],
  breakdown: [],
  gradingStatus: GradingStatus.UNGRADED,
};

export const mockGradedTestResult: ResultResponseDTO = {
  student: "some-student-name",
  score: 80.0,
  answers: [[[3], [0], [1, 2], [1, 4]], [[]]],
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
export const mockTestSession: TestSessionDTO = {
  test: mockTestWithId.id,
  teacher: mockTeacher.id,
  school: mockSchoolWithId.id,
  results: [mockGradedTestResult],
  accessCode: "1234",
  startDate: new Date("2021-09-01T09:00:00.000Z"),
  endDate: new Date("2055-09-02T09:00:00.000Z"),
  notes:
    "this is a note that a teacher wanted students to see before their test.",
};

export const mockTestSessionsWithSameTestId: TestSessionDTO[] = [
  {
    test: "62c248c0f79d6c3c9ebbea95",
    teacher: "62c248c0f79d6c3c9ebbea95",
    school: "62c248c0f79d6c3c9ebbea97",
    results: [mockGradedTestResult],
    accessCode: "789",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
  {
    test: "62c248c0f79d6c3c9ebbea95",
    teacher: "62c248c0f79d6c3c9ebbea94",
    school: "62c248c0f79d6c3c9ebbea93",
    results: [mockGradedTestResult],
    accessCode: "1234",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
];

export const mockTestSessionsWithSameAccessCode: TestSessionDTO[] = [
  {
    test: "62c248c0f79d6c3c9ebbea39",
    teacher: "62c248c0f79d6c3c9ebbea95",
    school: "62c248c0f79d6c3c9ebbea97",
    results: [mockGradedTestResult],
    accessCode: "1234",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
  {
    test: "62c248c0f79d6c3c9ebbea95",
    teacher: "62c248c0f79d6c3c9ebbea94",
    school: "62c248c0f79d6c3c9ebbea93",
    results: [mockGradedTestResult],
    accessCode: "1234",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
];

export const mockTestSessionsWithOneValid: Array<TestSessionRequestDTO> = [
  {
    test: "62c248c0f79d6c3c9ebbea39",
    teacher: "62c248c0f79d6c3c9ebbea95",
    school: "62c248c0f79d6c3c9ebbea97",
    results: [mockGradedTestResult],
    accessCode: "123456",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2022-09-02T09:00:00.000Z"),
  },
  {
    test: "62c248c0f79d6c3c9ebbea95",
    teacher: "62c248c0f79d6c3c9ebbea94",
    school: "62c248c0f79d6c3c9ebbea93",
    results: [mockGradedTestResult],
    accessCode: "123456",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
];

export const mockTestSessionWithExpiredStartDate: TestSessionRequestDTO = {
  test: mockTestWithId.id,
  teacher: mockTeacher.id,
  school: mockSchoolWithId.id,
  results: [mockGradedTestResult],
  accessCode: "123456",
  startDate: new Date("2055-09-01T09:00:00.000Z"),
  endDate: new Date("2056-09-02T09:00:00.000Z"),
  notes:
    "this is a note that a teacher wanted students to see before their test.",
};

export const mockTestSessionWithExpiredEndDate: TestSessionRequestDTO = {
  test: mockTestWithId.id,
  teacher: mockTeacher.id,
  school: mockSchoolWithId.id,
  results: [mockGradedTestResult],
  accessCode: "123456",
  startDate: new Date("2020-09-01T09:00:00.000Z"),
  endDate: new Date("2021-09-02T09:00:00.000Z"),
  notes:
    "this is a note that a teacher wanted students to see before their test.",
};

export const mockTestSessionWithId: TestSessionResponseDTO = {
  ...mockTestSession,
  id: "62c248c0f79d6c3c9ebbea90",
  test: mockTestWithId,
  teacher: mockTeacher,
  school: mockSchoolWithId,
};

export const mockTestSessions: TestSessionDTO[] = [
  {
    ...mockTestSession,
    results: [
      mockGradedTestResult,
      mockGradedTestResult2,
      mockGradedTestResult3,
      mockUngradedTestResult,
    ],
  },
  {
    ...mockTestSession,
    results: [
      mockGradedTestResult2,
      mockGradedTestResult4,
      mockGradedTestResult,
    ],
    accessCode: "1234",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
  {
    ...mockTestSession,
    school: mockSchoolWithId2.id,
    results: [
      mockGradedTestResult3,
      mockUngradedTestResult,
      mockGradedTestResult4,
      mockGradedTestResult,
    ],
  },
  {
    ...mockTestSession,
    school: mockSchoolWithId2.id,
    results: [
      mockGradedTestResult4,
      mockGradedTestResult2,
      mockGradedTestResult2,
      mockGradedTestResult2,
    ],
  },
  {
    ...mockTestSession,
    test: "62c248c0f79d6c3c9ebbea94", // invalid test (will not be created)
    results: [mockGradedTestResult],
  },
];

export const mockTestSessionsWithEvenNumberOfResults: TestSessionDTO[] = [
  {
    ...mockTestSessions[0],
    results: [
      mockGradedTestResult,
      mockGradedTestResult2,
      mockGradedTestResult3,
      mockUngradedTestResult,
      mockGradedTestResult,
      mockGradedTestResult4,
    ],
  },
  {
    ...mockTestSessions[0],
    results: [
      mockGradedTestResult2,
      mockGradedTestResult4,
      mockGradedTestResult3,
    ],
  },
  {
    ...mockTestSessions[4],
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
  expect(result.accessCode).toEqual(expected.accessCode);
  expect(result.startDate).toEqual(expected.startDate);
  expect(result.endDate).toEqual(expected.endDate);
};

export const assertResultsResponseMatchesExpected = (
  expected: Array<ResultRequestDTO>,
  result: Array<ResultResponseDTO>,
): void => {
  expect(result.length).toEqual(expected.length);
  result.forEach((res, i) => {
    expect(res.student).toEqual(expected[i].student);
    expect(Array.from(res.answers)).toEqual(expected[i].answers);
    expect(Array.from(res.breakdown)).toEqual(expected[i].breakdown);
    expect(res.score).toEqual(expected[i].score);
    expect(Number(res.gradingStatus)).toEqual(expected[i].gradingStatus);
  });
};

export const createTestSessionWithSchoolAndResults = async (
  schoolId: string,
  results: ResultRequestDTO[],
): Promise<void> => {
  await MgTestSession.create({
    ...mockTestSession,
    school: schoolId,
    results,
  });
};
