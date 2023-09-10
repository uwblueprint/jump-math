import type { Result } from "../models/testSession.model";
import MgTestSession from "../models/testSession.model";
import type {
  ResultRequestDTO,
  ResultResponseDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../services/interfaces/testSessionService";
import { TestSessionStatus } from "../utilities/testSessionUtils";
import { mockClassWithId, mockClassWithId2 } from "./class";
import { mockSchoolWithId, mockSchoolWithId2 } from "./school";
import { mockTestWithId } from "./tests";
import { mockTeacher } from "./users";

type TestSessionDTO = TestSessionRequestDTO & {
  accessCode: string;
  results: Result[];
};

/**
 * Mock Test Results
 */
export const mockUngradedTestResult: ResultRequestDTO = {
  student: "some-student-name",
  answers: [[[3], [0], [1, 2], [1, 4], [5, 1, 0]], [[]]],
};

export const mockGradedTestResult: ResultResponseDTO = {
  student: "some-student-name",
  score: 66.67,
  answers: [[[3], [0], [1, 2], [1, 4], [5, 1, 0]], [[]]],
  breakdown: [[true, true, true, true, false], [false]],
};

export const mockGradedTestResult2: ResultResponseDTO = {
  student: "some-student-name-2",
  score: 33.33,
  answers: [[[0], [3], [1, 2], [5, 4], [0, 0, 0]], [[7]]],
  breakdown: [[false, false, true, false, false], [true]],
};

export const mockGradedTestResult3: ResultResponseDTO = {
  student: "some-student-name-3",
  score: 83.33,
  answers: [[[3], [0], [1, 2], [5, 1, 4]], [[7]]],
  breakdown: [[true, true, true, false, true], [true]],
};

export const mockGradedTestResult4: ResultResponseDTO = {
  student: "some-student-name-4",
  score: 33.33,
  answers: [[[1.5], [1], [3], [5, 1, 4]], [[7]]],
  breakdown: [[false, false, false, false, true], [true]],
};

export const mockGradedTestResult5: ResultResponseDTO = {
  student: "some-student-name-5",
  score: 33.33,
  answers: [[[1.5], [1], [3], [5, 1, 4]], [[7]]],
  breakdown: [[false, false, false, false, true], [true]],
};

export const mockGradedTestResult6: ResultResponseDTO = {
  student: "some-student-name-6",
  score: 16.67,
  answers: [[[1.5], [1], [3], [0, 0, 4]], [[7]]],
  breakdown: [[false, false, false, false, false], [true]],
};

/**
 * Mock Test Sessions
 */
export const mockTestSession: TestSessionDTO = {
  test: mockTestWithId.id,
  teacher: mockTeacher.id,
  school: mockSchoolWithId.id,
  class: mockClassWithId.id,
  results: [mockGradedTestResult],
  accessCode: "1234",
  startDate: new Date("2021-09-01T09:00:00.000Z"),
  endDate: new Date("2055-09-02T09:00:00.000Z"),
  notes:
    "this is a note that a teacher wanted students to see before their test.",
};

export const mockTestSessionRequest: TestSessionRequestDTO = {
  test: mockTestWithId.id,
  teacher: mockTeacher.id,
  school: mockSchoolWithId.id,
  class: mockClassWithId.id,
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
    class: mockClassWithId.id,
    results: [mockGradedTestResult],
    accessCode: "789",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
  {
    test: "62c248c0f79d6c3c9ebbea95",
    teacher: "62c248c0f79d6c3c9ebbea94",
    school: "62c248c0f79d6c3c9ebbea93",
    class: mockClassWithId2.id,
    results: [mockGradedTestResult],
    accessCode: "1234",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
];

export const mockTestSessionWithInvalidStartDate: TestSessionDTO = {
  ...mockTestSession,
  accessCode: "123456",
  startDate: new Date("2026-09-01T09:00:00.000Z"),
  endDate: new Date("2024-09-02T09:00:00.000Z"),
  notes:
    "this is a note that a teacher wanted students to see before their test.",
};

export const mockTestSessionWithInvalidEndDate: TestSessionDTO = {
  ...mockTestSession,
  accessCode: "123456",
  startDate: new Date("2020-08-01T09:00:00.000Z"),
  endDate: new Date("2022-09-02T09:00:00.000Z"),
  notes:
    "this is a note that a teacher wanted students to see before their test.",
};

export const mockTestSessionsWithSameAccessCode: Array<TestSessionDTO> = [
  {
    ...mockTestSession,
    accessCode: "1234",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
  {
    ...mockTestSession,
    accessCode: "1234",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
];

export const mockTestSessionsWithOneValid: Array<TestSessionDTO> = [
  {
    ...mockTestSession,
    accessCode: "123456",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2022-09-02T09:00:00.000Z"),
  },
  {
    ...mockTestSession,
    accessCode: "123456",
    startDate: new Date("2021-09-01T09:00:00.000Z"),
    endDate: new Date("2055-09-02T09:00:00.000Z"),
  },
];

export const mockTestSessionWithExpiredStartDate: TestSessionDTO = {
  ...mockTestSession,
  accessCode: "123456",
  startDate: new Date("2055-09-01T09:00:00.000Z"),
  endDate: new Date("2056-09-02T09:00:00.000Z"),
  notes:
    "this is a note that a teacher wanted students to see before their test.",
};

export const mockTestSessionWithExpiredEndDate: TestSessionDTO = {
  ...mockTestSession,
  accessCode: "123456",
  startDate: new Date("2020-09-01T09:00:00.000Z"),
  endDate: new Date("2021-09-02T09:00:00.000Z"),
  results: [
    mockGradedTestResult,
    mockGradedTestResult2,
    mockGradedTestResult3,
    mockGradedTestResult4,
    mockGradedTestResult5,
    mockGradedTestResult6,
  ],
  notes:
    "this is a note that a teacher wanted students to see before their test.",
};

export const mockTestSessionWithId: TestSessionResponseDTO = {
  ...mockTestSession,
  id: "62c248c0f79d6c3c9ebbea90",
  test: mockTestWithId.id,
  teacher: mockTeacher.id,
  school: mockSchoolWithId.id,
  class: mockClassWithId.id,
  status: TestSessionStatus.ACTIVE,
};

export const mockTestSessionWithNoResults: TestSessionDTO = {
  ...mockTestSessionWithExpiredEndDate,
  results: [],
};

export const mockTestSessions: TestSessionDTO[] = [
  {
    ...mockTestSession,
    results: [
      mockGradedTestResult,
      mockGradedTestResult2,
      mockGradedTestResult3,
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
  expect(result.test.toString()).toEqual(expected.test);
  expect(result.teacher.toString()).toEqual(expected.teacher);
  expect(result.school.toString()).toEqual(expected.school);
  expect(result.startDate).toEqual(expected.startDate);
  expect(result.endDate).toEqual(expected.endDate);
};

export const assertResultsResponseMatchesExpected = (
  expected: Array<ResultResponseDTO>,
  result: Array<ResultResponseDTO>,
): void => {
  expect(result.length).toEqual(expected.length);
  result.forEach((res, i) => {
    expect(res.student).toEqual(expected[i].student);
    expect(Array.from(res.answers)).toEqual(expected[i].answers);
    expect(Array.from(res.breakdown)).toEqual(expected[i].breakdown);
    expect(res.score).toEqual(expected[i].score);
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
