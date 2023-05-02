import {
  StudentRequestDTO,
  ClassRequestDTO,
  ClassResponseDTO,
  StudentResponseDTO,
} from "../services/interfaces/classService";
import { mockTeacher } from "./users";
import { Grade } from "../types";
import { mockTestSessionWithId } from "./testSession";

// set up test students
export const testStudents: StudentRequestDTO[] = [
  {
    firstName: "David",
    lastName: "Liu",
  },
  {
    firstName: "Calvin",
    lastName: "Zhang",
  },
];

export const updatedTestStudents: StudentRequestDTO[] = [
  {
    firstName: "Jeremy",
    lastName: "Lin",
    studentNumber: "7",
  },
  {
    firstName: "Calvin",
    lastName: "Zhang",
  },
];

export const testStudentsWithIds: StudentResponseDTO[] = [
  {
    ...testStudents[0],
    id: "6421bf4b8c29e57d38efc7bd",
  },
  {
    ...testStudents[1],
    id: "6421bf4b8c29e57d38efc7be",
  },
];
// set up test classes
export const testClass: ClassRequestDTO[] = [
  {
    className: "class1",
    schoolYear: 4,
    gradeLevel: Grade.K,
    teacher: mockTeacher.id,
  },
  {
    className: "class2",
    schoolYear: 5,
    gradeLevel: Grade.GRADE_4,
    teacher: mockTeacher.id,
  },
];

// set up test class with invalid teacher id
export const testClassInvalidTeacher: ClassRequestDTO = {
  ...testClass[0],
  teacher: "56cb91bdc3464f14678934cb",
};

export const testClassWithStudents = {
  ...testClass[0],
  students: testStudents,
};

export const testClassWithTestSessions = {
  ...testClass[0],
  testSessions: [mockTestSessionWithId.id],
};

export const updatedTestClass: ClassRequestDTO = {
  className: "class1changed",
  schoolYear: 4,
  gradeLevel: Grade.GRADE_5,
  teacher: mockTeacher.id,
};

export const updatedTestClassWithStudent = {
  className: "class1",
  schoolYear: 4,
  gradeLevel: Grade.GRADE_1,
  teacher: mockTeacher.id,
  students: updatedTestStudents,
};

export const mockClassWithId = {
  id: "62c248c0f79d6c3c9ebbea93",
  ...testClass[0],
  students: testStudentsWithIds,
};

export const mockClassWithId2 = {
  ...mockClassWithId,
  id: "62c248c0f79d6c3c9ebbea92",
};

export const testClassAfterCreation = {
  ...testClass[0],
  students: [],
  testSessions: [],
};

export const assertResponseMatchesExpected = (
  expected: ClassRequestDTO,
  result: ClassResponseDTO,
): void => {
  expect(result.id).not.toBeNull();
  expect(result.className).toEqual(expected.className);
  expect(result.schoolYear).toEqual(expected.schoolYear);
  expect(result.gradeLevel.toString).toEqual(expected.gradeLevel.toString);
  expect(result.teacher).toEqual(mockTeacher);
  if (result.testSessions.length !== 0) {
    expect(result.testSessions).toEqual([mockTestSessionWithId]);
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
