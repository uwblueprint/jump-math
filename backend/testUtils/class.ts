import type {
  StudentRequestDTO,
  ClassRequestDTO,
  StudentResponseDTO,
} from "../services/interfaces/classService";
import { mockTeacher } from "./users";
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
    startDate: new Date("2020-09-01T09:00:00.000Z"),
    gradeLevel: Grade.K,
    teacher: mockTeacher.id,
  },
  {
    className: "class2",
    startDate: new Date("2055-09-02T09:00:00.000Z"),
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

export const updatedTestClass: ClassRequestDTO = {
  className: "class1changed",
  startDate: new Date("2055-09-01T09:00:00.000Z"),
  gradeLevel: Grade.GRADE_5,
  teacher: mockTeacher.id,
};

export const updatedTestClassWithStudent = {
  className: "class1",
  startDate: new Date("2020-09-01T09:00:00.000Z"),
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
