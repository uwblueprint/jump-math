import ClassService from "../../services/implementations/classService";
import SchoolService from "../../services/implementations/schoolService";
import TestService from "../../services/implementations/testService";
import TestSessionService from "../../services/implementations/testSessionService";
import UserService from "../../services/implementations/userService";
import type {
  ClassCard,
  ClassRequestDTO,
  ClassResponseDTO,
  IClassService,
  StudentRequestDTO,
} from "../../services/interfaces/classService";
import type { ISchoolService } from "../../services/interfaces/schoolService";
import type { ITestService } from "../../services/interfaces/testService";
import type { ITestSessionService } from "../../services/interfaces/testSessionService";
import type IUserService from "../../services/interfaces/userService";

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
    ): Promise<Array<ClassCard>> => {
      const classesByTeacher = await classService.getClassesByTeacherId(
        teacherId,
      );
      return classesByTeacher.map((classObj) => ({
        ...classObj,
        activeAssessments: classObj.testSessions.length,
        assessmentCount: classObj.testSessions.length,
        studentCount: classObj.students.length,
      }));
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
