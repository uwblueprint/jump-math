import {
  StudentRequestDTO,
  ClassRequestDTO,
  ClassResponseDTO,
  StudentResponseDTO,
} from "../services/interfaces/classService";
import { mockTeacher } from "./users";
import { mockTestSessionWithId } from "./testSession";
import { Grade } from "../types";

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
    id: "6421bf4b8c29e57d38efc7bd",
    firstName: "David",
    lastName: "Liu",
  },
  {
    id: "6421bf4b8c29e57d38efc7be",
    firstName: "Calvin",
    lastName: "Zhang",
  },
];
// set up test classes
export const testClass: ClassRequestDTO[] = [
  {
    className: "class1",
    schoolYear: 4,
    gradeLevel: [Grade.K, Grade.GRADE_1, Grade.GRADE_2, Grade.GRADE_3],
    teacher: mockTeacher.id,
    testSessions: [mockTestSessionWithId.id],
  },
  {
    className: "class2",
    schoolYear: 5,
    gradeLevel: [Grade.GRADE_4, Grade.GRADE_5, Grade.GRADE_6, Grade.GRADE_7],
    teacher: mockTeacher.id,
    testSessions: [mockTestSessionWithId.id],
  },
];

// set up test class with invalid teacher id
export const testClassInvalidTeacher: ClassRequestDTO = {
  className: "class2",
  schoolYear: 5,
  gradeLevel: [Grade.K, Grade.GRADE_1, Grade.GRADE_2, Grade.GRADE_3],
  teacher: "56cb91bdc3464f14678934cb",
  testSessions: [mockTestSessionWithId.id],
};

export const testClassWithStudents = {
  ...testClass[0],
  students: testStudents,
};

export const updatedTestClass: ClassRequestDTO = {
  className: "class1changed",
  schoolYear: 4,
  gradeLevel: [Grade.GRADE_4, Grade.GRADE_5, Grade.GRADE_6, Grade.GRADE_7],
  teacher: mockTeacher.id,
  testSessions: [mockTestSessionWithId.id],
};

export const updatedTestClassWithStudent = {
  className: "class1",
  schoolYear: 4,
  gradeLevel: [Grade.K, Grade.GRADE_1, Grade.GRADE_2, Grade.GRADE_3],
  teacher: mockTeacher.id,
  testSessions: [mockTestSessionWithId.id],
  students: updatedTestStudents,
};

export const mockClassWithId = {
  id: "62c248c0f79d6c3c9ebbea93",
  ...testClass[0],
  teacher: mockTeacher.id,
  students: testStudentsWithIds,
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
  // if (expected.students !== undefined) {
  //   result.students.forEach((student, index) => {
  //     expect(student.id).not.toBeNull();
  //     expect(student.firstName).toEqual(expected.students![index]?.firstName);
  //     expect(student.lastName).toEqual(expected.students![index]?.lastName);
  //     expect(student.studentNumber).toEqual(
  //       expected.students![index]?.studentNumber,
  //     );
  //   });
  // }
};
