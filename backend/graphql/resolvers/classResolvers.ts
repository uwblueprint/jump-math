import ClassService from "../../services/implementations/classService";
import SchoolService from "../../services/implementations/schoolService";
import TestService from "../../services/implementations/testService";
import TestSessionService from "../../services/implementations/testSessionService";
import UserService from "../../services/implementations/userService";
import {
  ClassRequestDTO,
  ClassResponseDTO,
  IClassService,
  StudentRequestDTO,
} from "../../services/interfaces/classService";
import { ISchoolService } from "../../services/interfaces/schoolService";
import { ITestService } from "../../services/interfaces/testService";
import { ITestSessionService } from "../../services/interfaces/testSessionService";
import IUserService from "../../services/interfaces/userService";

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
    classByTestSession: async (
      _req: undefined,
      { testSessionId }: { testSessionId: string },
    ): Promise<ClassResponseDTO> => {
      return classService.getClassByTestSessionId(testSessionId);
    },
    classesByTeacher: async (
      _req: undefined,
      { teacherId }: { teacherId: string },
    ): Promise<Array<ClassResponseDTO>> => {
      return classService.getClassesByTeacherId(teacherId);
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
    createStudent: async (
      _req: undefined,
      { student, classId }: { student: StudentRequestDTO; classId: string },
    ): Promise<ClassResponseDTO> => {
      return classService.createStudent(student, classId);
    },
  },
};

export default classResolvers;
