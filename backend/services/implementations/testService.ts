import MgTest, { Test } from "../../models/test.model";
import {
  CreateTestRequestDTO,
  TestResponseDTO,
  ITestService,
} from "../interfaces/testService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import { UserDTO } from "../../types";
import IUserService from "../interfaces/userService";

const Logger = logger(__filename);

class TestService implements ITestService {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  /* eslint-disable class-methods-use-this */
  async createTest(test: CreateTestRequestDTO): Promise<TestResponseDTO> {
    let newTest: Test | null;
    let adminDto: UserDTO | null;

    try {
      adminDto = await this.userService.getUserById(test.admin);
      newTest = await MgTest.create(test);
    } catch (error) {
      Logger.error(`Failed to create test. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: newTest.id,
      name: newTest.name,
      duration: newTest.duration,
      admin: adminDto,
      questions: newTest.questions,
      grade: newTest.grade,
    };
  }

  async getTestById(id: string): Promise<TestResponseDTO> {
    let test: Test | null;
    let adminDto: UserDTO | null;

    try {
      test = await MgTest.findById(id);
      if (!test) {
        throw new Error(`Test ID ${id} not found`);
      }
      adminDto = await this.userService.getUserById(test.admin);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test with ID ${id}. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return {
      id: test.id,
      name: test.name,
      duration: test.duration,
      admin: adminDto,
      questions: test.questions,
      grade: test.grade,
    };
  }
}

export default TestService;
