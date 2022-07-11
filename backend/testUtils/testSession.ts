import {
  ResultRequestDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../services/interfaces/testSessionService";

export const testResult: ResultRequestDTO = {
  student: "some-student-name",
  score: 25,
  answers: [10, 11],
  breakdown: [false, true],
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

  expect(actualResults?.id).not.toBeNull();
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
