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

      if(!adminDto || adminDto.role != "Admin"){
        throw new Error("Admin ID was not valid ID or not a admin");
      }

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
}

export default TestService;
