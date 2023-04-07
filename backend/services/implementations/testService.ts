import mongoose from "mongoose";
import { FileUpload } from "graphql-upload";
import MgTest, {
  AssessmentStatus,
  QuestionComponent,
  QuestionComponentMetadata,
  QuestionComponentType,
  Test,
} from "../../models/test.model";
import {
  TestRequestDTO,
  TestResponseDTO,
  ITestService,
  QuestionComponentRequest,
} from "../interfaces/testService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import IImageStorageService from "../interfaces/imageStorageService";
import FileStorageService from "./fileStorageService";
import ImageStorageService from "./imageStorageService";

const Logger = logger(__filename);

class TestService implements ITestService {
  imageStorageService: IImageStorageService;

  constructor() {
    const defaultBucket = process.env.FIREBASE_STORAGE_DEFAULT_BUCKET || "";
    const fileStorageService = new FileStorageService(defaultBucket);
    this.imageStorageService = new ImageStorageService(
      "assessment-images",
      fileStorageService,
    );
  }

  /* eslint-disable class-methods-use-this */
  async createTest(test: TestRequestDTO): Promise<TestResponseDTO> {
    let newTest: Test | null;

    try {
      const questions: QuestionComponent[][] = await this.uploadImages(
        test.questions,
      );
      newTest = await MgTest.create({
        ...test,
        questions,
      });
    } catch (error) {
      Logger.error(`Failed to create test. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: newTest.id,
      name: newTest.name,
      questions: newTest.questions,
      grade: newTest.grade,
      curriculumCountry: newTest.curriculumCountry,
      curriculumRegion: newTest.curriculumRegion,
      assessmentType: newTest.assessmentType,
      status: newTest.status,
    };
  }

  async deleteTest(id: string): Promise<string> {
    try {
      const testToDelete = await MgTest.findById(id);
      if (!testToDelete) {
        throw new Error(`Test ${id} not found`);
      }
      if (testToDelete.status === AssessmentStatus.DRAFT) {
        await MgTest.findByIdAndDelete(id);
      } else {
        await MgTest.findByIdAndUpdate(
          id,
          {
            name: testToDelete.name,
            questions: testToDelete.questions,
            grade: testToDelete.grade,
            curriculumCountry: testToDelete.curriculumCountry,
            curriculumRegion: testToDelete.curriculumRegion,
            assessmentType: testToDelete.assessmentType,
            status: AssessmentStatus.DELETED,
          },
          {
            new: true,
            runValidators: true,
          },
        );
      }
      return id;
    } catch (error: unknown) {
      Logger.error(`Failed to delete test. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async updateTest(id: string, test: TestRequestDTO): Promise<TestResponseDTO> {
    let updatedTest: Test | null;

    try {
      const questions: QuestionComponent[][] = await this.uploadImages(
        test.questions,
      );
      updatedTest = await MgTest.findByIdAndUpdate(
        id,
        {
          ...test,
          questions,
        },
        {
          new: true,
          runValidators: true,
        },
      );
      if (!updatedTest) {
        throw new Error(`Test with id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to update test. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: updatedTest.id,
      name: updatedTest.name,
      questions: updatedTest.questions,
      grade: updatedTest.grade,
      curriculumCountry: updatedTest.curriculumCountry,
      curriculumRegion: updatedTest.curriculumRegion,
      assessmentType: updatedTest.assessmentType,
      status: updatedTest.status,
    };
  }

  async getTestById(id: string): Promise<TestResponseDTO> {
    let test: Test | null;

    try {
      test = await MgTest.findById(id);
      if (!test) {
        throw new Error(`Test ID ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test with ID ${id}. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return {
      id: test.id,
      name: test.name,
      questions: test.questions,
      grade: test.grade,
      curriculumCountry: test.curriculumCountry,
      curriculumRegion: test.curriculumRegion,
      assessmentType: test.assessmentType,
      status: test.status,
    };
  }

  async getAllTests(): Promise<TestResponseDTO[]> {
    try {
      let tests = await MgTest.find();
      tests = tests.filter((test) => test.status !== AssessmentStatus.DELETED);
      return await this.mapTestsToTestResponseDTOs(tests);
    } catch (error: unknown) {
      Logger.error(`Failed to get tests. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async duplicateTest(id: string): Promise<TestResponseDTO> {
    let test: Test | null;

    try {
      test = await MgTest.findById(id);
      if (!test) {
        throw new Error(`Test ID ${id} not found`);
      }
      // eslint-disable-next-line no-underscore-dangle
      test._id = mongoose.Types.ObjectId();
      test.isNew = true;
      test.status = AssessmentStatus.DRAFT;
      test.save();
    } catch (error: unknown) {
      Logger.error(
        `Failed to duplicate test with ID ${id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return {
      id: test.id,
      name: test.name,
      questions: test.questions,
      grade: test.grade,
      curriculumCountry: test.curriculumCountry,
      curriculumRegion: test.curriculumRegion,
      assessmentType: test.assessmentType,
      status: test.status,
    };
  }

  async unarchiveTest(id: string): Promise<TestResponseDTO> {
    let unarchivedTest: TestResponseDTO;

    try {
      const test = await MgTest.findById(id);
      if (!test) {
        throw new Error(`Test ID ${id} not found`);
      }
      if (test.status !== AssessmentStatus.ARCHIVED) {
        throw new Error(`Test ID ${id} is not in archived status`);
      }
      unarchivedTest = await this.duplicateTest(id);

      try {
        await this.deleteTest(id);
      } catch (error: unknown) {
        // rollback test creation
        await this.deleteTest(unarchivedTest.id);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to unarchive test with ID ${id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return {
      id: unarchivedTest.id,
      name: unarchivedTest.name,
      questions: unarchivedTest.questions,
      grade: unarchivedTest.grade,
      curriculumCountry: unarchivedTest.curriculumCountry,
      curriculumRegion: unarchivedTest.curriculumRegion,
      assessmentType: unarchivedTest.assessmentType,
      status: unarchivedTest.status,
    };
  }

  async mapTestsToTestResponseDTOs(
    tests: Array<Test>,
  ): Promise<TestResponseDTO[]> {
    return Promise.all(
      tests.map(async (test) => {
        return {
          id: test.id,
          name: test.name,
          questions: test.questions,
          grade: test.grade,
          curriculumCountry: test.curriculumCountry,
          curriculumRegion: test.curriculumRegion,
          assessmentType: test.assessmentType,
          status: test.status,
        };
      }),
    );
  }

  private async uploadImages(
    questions: QuestionComponentRequest[][],
  ): Promise<QuestionComponent[][]> {
    return Promise.all(
      questions.map(async (question: QuestionComponentRequest[]) => {
        return Promise.all(
          question.map(async (questionComponent: QuestionComponentRequest) => {
            if (questionComponent.type === QuestionComponentType.IMAGE) {
              const imageComponent: QuestionComponentMetadata = await this.imageStorageService.uploadImage(
                questionComponent.metadata as Promise<FileUpload>,
              );
              return { ...questionComponent, metadata: imageComponent };
            }
            return questionComponent as QuestionComponent;
          }),
        );
      }),
    );
  }
}

export default TestService;
