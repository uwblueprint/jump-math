import { StatisticsResponseDTO } from "../services/interfaces/statisticsService";
import { TestSessionRequestDTO } from "../services/interfaces/testSessionService";
import { mockSchoolWithId, mockSchoolWithId2 } from "./school";
import { mockTestWithId } from "./tests";
import {
  mockGradedTestResult,
  mockGradedTestResult2,
  mockGradedTestResult3,
  mockGradedTestResult4,
} from "./testSession";
import { mockTeacher } from "./users";

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
    test: "62c248c0f79d6c3c9ebbea94",
    teacher: mockTeacher.id,
    school: mockSchoolWithId.id,
    gradeLevel: 4,
    results: [mockGradedTestResult],
    accessCode: "1234",
    startTime: new Date("2021-09-01T09:00:00.000Z"),
  },
];

export const mockStatisticsBySchool: StatisticsResponseDTO[] = [
  {
    test: mockTestWithId,
    school: mockSchoolWithId2,
    averageScore: 67.86,
    averageScoresByQuestions: [1, 0.57, 0.57, 0.57],
  },
  {
    test: mockTestWithId,
    school: mockSchoolWithId,
    averageScore: 66.67,
    averageScoresByQuestions: [1, 0.5, 0.67, 0.5],
  },
];

export const assertResponseMatchesExpected = (
  expected: StatisticsResponseDTO,
  result: StatisticsResponseDTO,
): void => {
  expect(result.test).toEqual(expected.test);
  expect(result.school).toEqual(expected.school);
  expect(result.averageScore).toEqual(expected.averageScore);
  expect(result.averageScoresByQuestions).toEqual(
    expected.averageScoresByQuestions,
  );
};
