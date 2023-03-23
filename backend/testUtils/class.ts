import {
  ClassRequestDTO,
  ClassResponseDTO,
} from "../services/interfaces/classService";
import { mockTeacher } from "./users";
import { mockTestSessionWithId } from "./testSession";

// set up test classes
export const testClass: ClassRequestDTO[] = [
  {
    className: "class1",
    schoolYear: 4,
    gradeLevel: ["K", "Grade 1", "Grade 2", "Grade 3"],
    teacher: mockTeacher.id,
    testSessions: [mockTestSessionWithId.id],
  },
  {
    className: "class2",
    schoolYear: 5,
    gradeLevel: ["Grade 4", "Grade 5", "Grade 6", "Grade 7"],
    teacher: mockTeacher.id,
    testSessions: [mockTestSessionWithId.id],
  },
];

// set up test class with invalid teacher id
export const testClassInvalidTeacher: ClassRequestDTO = {
  className: "class2",
  schoolYear: 5,
  gradeLevel: ["K", "Grade 1", "Grade 2", "Grade 3"],
  teacher: "56cb91bdc3464f14678934cb",
  testSessions: [mockTestSessionWithId.id],
};

export const updatedTestClass: ClassRequestDTO = {
  className: "class1changed",
  schoolYear: 4,
  gradeLevel: ["Grade 4", "Grade 5", "Grade 6", "Grade 7"],
  teacher: mockTeacher.id,
  testSessions: [mockTestSessionWithId.id],
};

export const mockClassWithId = {
  id: "62c248c0f79d6c3c9ebbea93",
  ...testClass[0],
  teacher: mockTeacher.id,
};

export const mockClassWithId2 = {
  ...mockClassWithId,
  id: "62c248c0f79d6c3c9ebbea92",
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
  expect(result.testSessions).toEqual([mockTestSessionWithId]);
};
