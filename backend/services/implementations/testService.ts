import MgTest, { Test } from "../../models/test.model";
import {
  CreateTestRequestDTO,
  TestResponseDTO,
  ITestService,
} from "../interfaces/testService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

class TestService implements ITestService {
  /* eslint-disable class-methods-use-this */
  async createTest(test: CreateTestRequestDTO): Promise<TestResponseDTO> {
    let newTest: Test | null;

    try {
      newTest = await MgTest.create(test);
    } catch (error) {
      Logger.error(`Failed to create test. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: newTest.id,
      name: newTest.name,
      duration: newTest.duration,
      admin: newTest.admin,
      questions: newTest.questions,
      grade: newTest.grade,
    };
  }
}

export default TestService;
