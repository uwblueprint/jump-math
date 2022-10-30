import TestService from "../../services/implementations/testService";
import UserService from "../../services/implementations/userService";
import {
  CreateTestRequestDTO,
  TestResponseDTO,
} from "../../services/interfaces/testService";

const userService = new UserService();
const testService = new TestService(userService);

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
      return testService.createTest({
        name: test.name,
        duration: test.duration,
        admin: test.admin,
        questions: test.questions,
        grade: test.grade,
      });
    },
    updateTest: async (
      _req: undefined,
      { id, test }: { id: string; test: CreateTestRequestDTO },
    ): Promise<TestResponseDTO | null> => {
      return testService.updateTest(id, {
        name: test.name,
        duration: test.duration,
        admin: test.admin,
        questions: test.questions,
        grade: test.grade,
      });
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
