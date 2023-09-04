import type {
  ClassRequestDTO,
  ClassResponseDTO,
  IClassService,
  StudentRequestDTO,
  TestableStudentsDTO,
} from "../../services/interfaces/classService";

import ClassService from "../../services/implementations/classService";
import type { ITestService } from "../../services/interfaces/testService";
import type { ITestSessionService } from "../../services/interfaces/testSessionService";
import type IUserService from "../../services/interfaces/userService";
import TestService from "../../services/implementations/testService";
import TestSessionService from "../../services/implementations/testSessionService";
import UserService from "../../services/implementations/userService";
import type { QueryOptions } from "../../types";

const userService: IUserService = new UserService();
const testService: ITestService = new TestService();
const testSessionService: ITestSessionService = new TestSessionService(
  testService,
);
const classService: IClassService = new ClassService(
  userService,
  testSessionService,
);

const classResolvers = {
  Query: {
    class: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<ClassResponseDTO> => classService.getClassById(id),
    testableStudentsByTestSessionId: async (
      _req: undefined,
      { testSessionId }: { testSessionId: string },
    ): Promise<TestableStudentsDTO> => {
      return classService.getTestableStudentsByTestSessionId(testSessionId);
    },
    classesByTeacher: async (
      _req: undefined,
      {
        teacherId,
        queryOptions,
      }: { teacherId: string; queryOptions?: QueryOptions },
    ): Promise<Array<ClassResponseDTO>> => {
      return classService.getClassesByTeacherId(teacherId, queryOptions);
    },
  },
  Mutation: {
    createClass: async (
      _req: undefined,
      { classObj }: { classObj: ClassRequestDTO },
    ): Promise<ClassResponseDTO> => {
      return classService.createClass(classObj);
    },
    updateClass: async (
      _req: undefined,
      { id, classObj }: { id: string; classObj: ClassRequestDTO },
    ): Promise<ClassResponseDTO> => {
      return classService.updateClass(id, classObj);
    },
    createStudent: async (
      _req: undefined,
      { student, classId }: { student: StudentRequestDTO; classId: string },
    ): Promise<ClassResponseDTO> => {
      return classService.createStudent(student, classId);
    },
    updateStudent: async (
      _req: undefined,
      {
        studentId,
        classId,
        student,
      }: { studentId: string; classId: string; student: StudentRequestDTO },
    ): Promise<ClassResponseDTO> => {
      return classService.updateStudent(studentId, classId, student);
    },
    deleteClass: (_req: undefined, { classId }: { classId: string }) =>
      classService.deleteClass(classId),
    archiveClass: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<ClassResponseDTO | null> => {
      return classService.archiveClass(id);
    },
    deleteStudent: async (
      _req: undefined,
      { classId, studentId }: { classId: string; studentId: string },
    ): Promise<string | null> => {
      return classService.deleteStudent(studentId, classId);
    },
  },
  ClassResponseDTO: {
    teacher: async (parent: ClassResponseDTO) => {
      return userService.getUserById(parent.teacher);
    },
    testSessions: async (parent: ClassResponseDTO) => {
      return testSessionService.getTestSessionsByClassId(parent.id);
    },
  },
};

export default classResolvers;
