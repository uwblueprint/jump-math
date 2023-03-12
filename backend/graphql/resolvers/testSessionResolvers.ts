import { GraphQLScalarType, Kind } from "graphql";
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
  NumberOrArrayOrNull: new GraphQLScalarType({
    name: "NumberOrArrayOrNull",
    description: "A Number or An Array or Null",
    serialize(value) {
      if (
        typeof value === "number" ||
        typeof value === null ||
        (Array.isArray(value) &&
          value.every(function (e) {
            return typeof e === "number";
          }))
      ) {
        return value;
      }
      throw new Error("Answers must be either a Number or Array or Null");
    },
    // parseValue and parseLiteral will need to be created for creating test sessions mutation
  }),
  Query: {
    testSessionByAccessCode: async (
      _parent: undefined,
      { accessCode }: { accessCode: string },
    ): Promise<TestSessionResponseDTO> => {
      return testSessionService.getTestSessionByAccessCode(accessCode);
    },
    testSessions: async (): Promise<TestSessionResponseDTO[]> => {
      return testSessionService.getAllTestSessions();
    },
    testSession: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<TestSessionResponseDTO> => {
      return testSessionService.getTestSessionById(id);
    },
  },
  Mutation: {
    createTestSession: async (
      _req: undefined,
      { testSession }: { testSession: TestSessionRequestDTO },
    ): Promise<TestSessionResponseDTO> => {
      return testSessionService.createTestSession({ ...testSession });
    },
  },
};
export default testSessionResolvers;
