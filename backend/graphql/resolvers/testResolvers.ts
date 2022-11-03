import TestService from "../../services/implementations/testService";
import UserService from "../../services/implementations/userService";
import {
  CreateTestRequestDTO,
  ITestService,
  TestResponseDTO,
} from "../../services/interfaces/testService";
import IUserService from "../../services/interfaces/userService";

const userService: IUserService = new UserService();
const testService: ITestService = new TestService(userService);

const testResolvers = {
  Query: {
    tests: async (): Promise<TestResponseDTO[]> => {
      return testService.getAllTests();
    },
  },
  Mutation: {
    createTest: async (
      _req: undefined,
      { test }: { test: CreateTestRequestDTO },
    ): Promise<TestResponseDTO> => {
      return testService.createTest(test);
    },
    updateTest: async (
      _req: undefined,
      { id, test }: { id: string; test: CreateTestRequestDTO },
    ): Promise<TestResponseDTO | null> => {
      return testService.updateTest(id, test);
    },
    deleteTestById: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<string> => {
      return testService.deleteTest(id);
    },
  },
};

export default testResolvers;
