import { Class, Student } from "../../models/class.model";
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
  Mutation: {
    createClass: async (
      _req: undefined,
      { classObj }: { classObj: ClassRequestDTO },
    ): Promise<ClassResponseDTO> => {
      const createdClass = await classService.createClass(classObj);
      const teacherToUpdate = await userService.getUserById(classObj.teacher);
      const classToAdd = {
        ...createdClass,
        teacher: createdClass.teacher.id,
        testSessions: createdClass.testSessions.map(
          (testSessionDTO) => testSessionDTO.id,
        ),
        students: createdClass.students,
      } as Class;
      if (teacherToUpdate.class) {
        teacherToUpdate.class.push(classToAdd);
      } else {
        teacherToUpdate.class = [classToAdd];
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
