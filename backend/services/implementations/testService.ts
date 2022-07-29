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

  async updateTest(
    id: string,
    test: CreateTestRequestDTO,
  ): Promise<TestResponseDTO> {
    let updatedTest: Test | null;
    let adminDto: UserDTO | null;

    try {
      updatedTest = await MgTest.findByIdAndUpdate(id, test, {
        new: true,
        runValidators: true,
      });
      if (!updatedTest) {
        throw new Error(`Test with id ${id} not found`);
      }

      adminDto = await this.userService.getUserById(test.admin);
    } catch (error: unknown) {
      Logger.error(`Failed to update test. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: updatedTest.id,
      name: updatedTest.name,
      duration: updatedTest.duration,
      admin: adminDto,
      questions: updatedTest.questions,
      grade: updatedTest.grade,
    };
  }
}

export default TestService;
