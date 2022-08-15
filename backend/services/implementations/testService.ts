import { v4 as uuidv4 } from "uuid";

import MgTest, { Question, Test } from "../../models/test.model";
import {
  CreateTestRequestDTO,
  QuestionRequestDTO,
  TestResponseDTO,
  ITestService,
} from "../interfaces/testService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import { UserDTO } from "../../types";
import IUserService from "../interfaces/userService";
import IFileStorageService from "../interfaces/fileStorageService";

const Logger = logger(__filename);

class TestService implements ITestService {
  userService: IUserService;

  storageService: IFileStorageService;

  constructor(userService: IUserService, storageService: IFileStorageService) {
    this.userService = userService;

    this.storageService = storageService;
  }

  /* eslint-disable class-methods-use-this */
  async createTest(test: CreateTestRequestDTO): Promise<TestResponseDTO> {
    let newTest: Test | null;
    let adminDto: UserDTO | null;

    try {
      test.questions.forEach(async (question: QuestionRequestDTO) => {
        if (question.imageFilePath) {
          const imageFileName = uuidv4();
          await this.storageService.createFile(
            imageFileName,
            question.imageFilePath,
            question.imageFileContentType,
          );

          /* eslint-disable no-param-reassign */
          question.imageFileName = imageFileName;
        }
      });
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

  async deleteTest(id: string): Promise<string> {
    try {
      const deletedTest: Test | null = await MgTest.findByIdAndDelete(id);
      if (!deletedTest) {
        throw new Error(`Test ${id} not found`);
      }

      deletedTest.questions.forEach(async (question: Question) => {
        if (question.imageFileName) {
          await this.storageService.deleteFile(question.imageFileName);
        }
      });

      return id;
    } catch (error: unknown) {
      Logger.error(`Failed to delete test. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async updateTest(
    id: string,
    test: CreateTestRequestDTO,
  ): Promise<TestResponseDTO> {
    let updatedTest: Test | null;
    let adminDto: UserDTO | null;

    try {
      const currentTest = await MgTest.findById(id);
      test.questions.forEach(async (question: QuestionRequestDTO, i) => {
        let newImageFileName = "";
        const currentImageFileName = currentTest?.questions[i].imageFileName;

        if (question.imageFilePath) {
          newImageFileName = currentImageFileName || uuidv4();
          if (currentImageFileName) {
            await this.storageService.updateFile(
              newImageFileName,
              question.imageFilePath,
              question.imageFileContentType,
            );
          } else {
            await this.storageService.createFile(
              newImageFileName,
              question.imageFilePath,
              question.imageFileContentType,
            );
          }
        } else if (currentImageFileName) {
          await this.storageService.deleteFile(currentImageFileName);
        }

        /* eslint-disable no-param-reassign */
        question.imageFileName = newImageFileName;
      });

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
