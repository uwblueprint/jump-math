import TestSessionService from "../../services/implementations/testSessionService";
import UserService from "../../services/implementations/userService";
import TestService from "../../services/implementations/testService";
import SchoolService from "../../services/implementations/schoolService";
import {
  ITestSessionService,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../../services/interfaces/testSessionService";
import { ITestService } from "../../services/interfaces/testService";
import IUserService from "../../services/interfaces/userService";
import { ISchoolService } from "../../services/interfaces/schoolService";

const userService: IUserService = new UserService();
const schoolService: ISchoolService = new SchoolService(userService);
const testService: ITestService = new TestService();
const testSessionService: ITestSessionService = new TestSessionService(
  testService,
  userService,
  schoolService,
);

const testSessionResolvers = {
  Query: {
    testSession: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<TestSessionResponseDTO> => {
      return testSessionService.getTestSessionById(id);
    },
    testSessions: async (): Promise<TestSessionResponseDTO[]> => {
      return testSessionService.getAllTestSessions();
    },
    testSessionByAccessCode: async (
      _parent: undefined,
      { accessCode }: { accessCode: string },
    ): Promise<TestSessionResponseDTO> => {
      return testSessionService.getTestSessionByAccessCode(accessCode);
    },
    testSessionsByTeacherId: async (
      _parent: undefined,
      { teacherId }: { teacherId: string },
    ): Promise<Array<TestSessionResponseDTO>> => {
      return testSessionService.getTestSessionsByTeacherId(teacherId);
    },
  },
  Mutation: {
    createTestSession: async (
      _req: undefined,
      {
        classId,
        testSession,
      }: { classId: string; testSession: TestSessionRequestDTO },
    ): Promise<TestSessionResponseDTO> => {
      return testSessionService.createTestSession(classId, testSession);
    },
  },
};
export default testSessionResolvers;
