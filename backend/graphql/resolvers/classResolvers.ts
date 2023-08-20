import type {
  ClassRequestDTO,
  ClassResponseDTO,
  IClassService,
  StudentRequestDTO,
} from "../../services/interfaces/classService";

import ClassService from "../../services/implementations/classService";
import type { ISchoolService } from "../../services/interfaces/schoolService";
import type { ITestService } from "../../services/interfaces/testService";
import type { ITestSessionService } from "../../services/interfaces/testSessionService";
import type IUserService from "../../services/interfaces/userService";
import SchoolService from "../../services/implementations/schoolService";
import TestService from "../../services/implementations/testService";
import TestSessionService from "../../services/implementations/testSessionService";
import UserService from "../../services/implementations/userService";
import type { QueryOptions } from "../../types";

const userService: IUserService = new UserService();
const testService: ITestService = new TestService();
const schoolService: ISchoolService = new SchoolService(userService);
const testSessionService: ITestSessionService = new TestSessionService(
  testService,
  userService,
  schoolService,
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
    classByTestSession: async (
      _req: undefined,
      { testSessionId }: { testSessionId: string },
    ): Promise<ClassResponseDTO> => {
      return classService.getClassByTestSessionId(testSessionId);
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
      const createdClass = await classService.createClass(classObj);
      const teacherToUpdate = await userService.getUserById(classObj.teacher);
      if (teacherToUpdate.class) {
        teacherToUpdate.class.push(createdClass.id);
      } else {
        teacherToUpdate.class = [createdClass.id];
      }
      await userService.updateUserById(classObj.teacher, {
        ...teacherToUpdate,
      });
      return createdClass;
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
    deleteClass: (_req: undefined, { classId }: { classId: string }) =>
      classService.deleteClass(classId),
    archiveClass: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<ClassResponseDTO | null> => {
      return classService.archiveClass(id);
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
