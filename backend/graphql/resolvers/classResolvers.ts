import ClassService from "../../services/implementations/classService";
import {
  IClassService,
  ClassRequestDTO,
  ClassResponseDTO,
} from "../../services/interfaces/classService";
import UserService from "../../services/implementations/userService";
import IUserService from "../../services/interfaces/userService";
import { ITestSessionService } from "../../services/interfaces/testSessionService";
import TestSessionService from "../../services/implementations/testSessionService";
import TestService from "../../services/implementations/testService";
import { ITestService } from "../../services/interfaces/testService";
import { ISchoolService } from "../../services/interfaces/schoolService";
import SchoolService from "../../services/implementations/schoolService";

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
      _parent: undefined,
      { id }: { id: string },
    ): Promise<ClassResponseDTO> => {
      return classService.getClassById(id);
    },
  },
  Mutation: {
    createClass: async (
      _req: undefined,
      { classObj }: { classObj: ClassRequestDTO },
    ): Promise<ClassResponseDTO> => {
      const newClass = await classService.createClass({ ...classObj });
      return newClass;
    },
  },
};

export default classResolvers;
