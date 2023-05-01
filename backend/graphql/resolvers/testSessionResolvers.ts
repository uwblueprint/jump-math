import { GraphQLScalarType } from "graphql";
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
import {
  validatePrimitive,
  validateArray,
} from "../../middlewares/validators/util";

const userService: IUserService = new UserService();
const schoolService: ISchoolService = new SchoolService(userService);
const testService: ITestService = new TestService();
const testSessionService: ITestSessionService = new TestSessionService(
  testService,
  userService,
  schoolService,
);

const testSessionResolvers = {
  NumberOrArrayOrNull: new GraphQLScalarType({
    name: "NumberOrArrayOrNull",
    description: "A Number or An Array or Null",
    serialize(value) {
      if (
        typeof value === null ||
        validatePrimitive(value, "number") ||
        validateArray(value, "number")
      ) {
        return value;
      }
      throw new Error(
        "The 'answers' field under 'results' must be an array containing only numbers, number arrays, and/or nulls.",
      );
    },
    // parseValue and parseLiteral will need to be created for creating test sessions mutation
  }),
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
