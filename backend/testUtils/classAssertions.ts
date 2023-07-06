import type {
  StudentRequestDTO,
  ClassRequestDTO,
  ClassResponseDTO,
  StudentResponseDTO,
} from "../services/interfaces/classService";
import { mockTestSessionWithId } from "./testSession";

export const assertResponseMatchesExpected = (
  expected: ClassRequestDTO,
  result: ClassResponseDTO,
): void => {
  expect(result.id).not.toBeNull();
  expect(result.className).toEqual(expected.className);
  expect(result.startDate).toEqual(expected.startDate);
  expect(result.gradeLevel.toString()).toEqual(expected.gradeLevel.toString());
  expect(result.teacher.toString()).toEqual(expected.teacher.toString());
  if (result.testSessions.length !== 0) {
    expect(result.testSessions.length).toEqual(1);
    expect(result.testSessions[0].toString()).toEqual(mockTestSessionWithId.id);
  } else {
    expect(result.testSessions).toEqual([]);
  }
};

export const assertArrayResponseMatchesExpected = (
  expected: ClassRequestDTO[],
  result: ClassResponseDTO[],
): void => {
  expect(result.length).toEqual(expected.length);
  for (let i = 0; i < result.length; i += 1) {
    assertResponseMatchesExpected(expected[i], result[i]);
  }
};

export const assertStudentResponseMatchesExpected = (
  expected: StudentRequestDTO[],
  result: StudentResponseDTO[],
): void => {
  result.forEach((student, index) => {
    expect(student.id).not.toBeNull();
    expect(student.firstName).toEqual(expected[index].firstName);
    expect(student.lastName).toEqual(expected[index].lastName);
    expect(student.studentNumber).toEqual(expected[index].studentNumber);
  });
};
