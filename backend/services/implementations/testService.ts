import mongoose from "mongoose";
import { FileUpload } from "graphql-upload";
import MgTest, {
  AssessmentStatus,
  ImageMetadata,
  QuestionComponent,
  QuestionComponentType,
  Test,
} from "../../models/test.model";
import {
  TestRequestDTO,
  TestResponseDTO,
  ITestService,
} from "../interfaces/testService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import IImageUploadService, {
  ImageUpload,
} from "../interfaces/imageUploadService";
import ImageUploadService from "./imageUploadService";
import {
  QuestionComponentsUploaded,
  QuestionComponentResponse,
  QuestionComponentRequest,
} from "../../types/questionTypes";

const Logger = logger(__filename);

class TestService implements ITestService {
  imageUploadService: IImageUploadService;

  constructor() {
    this.imageUploadService = new ImageUploadService("assessment-images");
  }

  /* eslint-disable class-methods-use-this */
  async createTest(test: TestRequestDTO): Promise<TestResponseDTO> {
    let newTest: Test | null;
    let questions: QuestionComponentsUploaded[][];

    try {
      questions = await this.uploadImages(test.questions);
      newTest = await MgTest.create({
        ...test,
        questions: this.getQuestionComponents(questions),
      });
    } catch (error) {
      Logger.error(`Failed to create test. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: newTest.id,
      name: newTest.name,
      questions: this.getQuestionComponentResponses(questions),
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
        throw new Error(`Test ID ${id} not found`);
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
    let questions: QuestionComponentsUploaded[][];

    try {
      questions = await this.uploadImages(test.questions);
      updatedTest = await MgTest.findByIdAndUpdate(
        id,
        {
          ...test,
          questions: this.getQuestionComponents(questions),
        },
        {
          new: true,
          runValidators: true,
        },
      );
      if (!updatedTest) {
        throw new Error(`Test ID ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to update test. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: updatedTest.id,
      name: updatedTest.name,
      questions: this.getQuestionComponentResponses(questions),
      grade: updatedTest.grade,
      curriculumCountry: updatedTest.curriculumCountry,
      curriculumRegion: updatedTest.curriculumRegion,
      assessmentType: updatedTest.assessmentType,
      status: updatedTest.status,
    };
  }

  async getTestById(id: string): Promise<TestResponseDTO> {
    let test: Test | null;
    let questions: QuestionComponentResponse[][];

    try {
      test = await MgTest.findById(id);
      if (!test) {
        throw new Error(`Test ID ${id} not found`);
      }
      questions = await this.hydrateImages(test.questions);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test with ID ${id}. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return {
      id: test.id,
      name: test.name,
      questions,
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

  async publishTest(id: string): Promise<TestResponseDTO> {
    let test: Test | null;
    let questions: QuestionComponentResponse[][];

    try {
      test = await MgTest.findById(id);
      if (!test) {
        throw new Error(`Test ID ${id} not found`);
      }
      if (test.status !== AssessmentStatus.DRAFT) {
        throw new Error(`Test with ID ${id} is not in draft status.`);
      }
      test.isNew = true;
      test.status = AssessmentStatus.PUBLISHED;
      test.save();

      questions = await this.hydrateImages(test.questions);
    } catch (error: unknown) {
      Logger.error(
        `Failed to publish test with ID ${id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return {
      id: test.id,
      name: test.name,
      questions,
      grade: test.grade,
      curriculumCountry: test.curriculumCountry,
      curriculumRegion: test.curriculumRegion,
      assessmentType: test.assessmentType,
      status: test.status,
    };
  }

  async duplicateTest(id: string): Promise<TestResponseDTO> {
    let test: Test | null;
    let questions: QuestionComponentResponse[][];

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

      questions = await this.hydrateImages(test.questions);
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
      questions,
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
        throw new Error(`Test with ID ${id} is not in archived status`);
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

  async archiveTest(id: string): Promise<TestResponseDTO> {
    let test: Test | null;
    let questions: QuestionComponentResponse[][];

    try {
      test = await MgTest.findById(id);
      if (!test) {
        throw new Error(`Test ID ${id} not found`);
      }
      if (
        test.status !== AssessmentStatus.DRAFT &&
        test.status !== AssessmentStatus.PUBLISHED
      ) {
        throw new Error(
          `Test with ID ${id} is not in draft or published status.`,
        );
      }
      test.isNew = true;
      test.status = AssessmentStatus.ARCHIVED;
      test.save();

      questions = await this.hydrateImages(test.questions);
    } catch (error: unknown) {
      Logger.error(
        `Failed to publish test with ID ${id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return {
      id: test.id,
      name: test.name,
      questions,
      grade: test.grade,
      curriculumCountry: test.curriculumCountry,
      curriculumRegion: test.curriculumRegion,
      assessmentType: test.assessmentType,
      status: test.status,
    };
  }

  async mapTestsToTestResponseDTOs(
    tests: Array<Test>,
  ): Promise<TestResponseDTO[]> {
    return Promise.all(
      tests.map(async (test) => {
        const questions: QuestionComponentResponse[][] = await this.hydrateImages(
          test.questions,
        );
        return {
          id: test.id,
          name: test.name,
          questions,
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
  ): Promise<QuestionComponentsUploaded[][]> {
    return Promise.all(
      questions.map(async (question: QuestionComponentRequest[]) => {
        return Promise.all(
          question.map(async (questionComponent: QuestionComponentRequest) => {
            if (questionComponent.type === QuestionComponentType.IMAGE) {
              const imageMetadata: ImageUpload = await this.imageUploadService.uploadImage(
                questionComponent.metadata as Promise<FileUpload>,
              );
              return { ...questionComponent, metadata: imageMetadata };
            }
            return questionComponent as QuestionComponentsUploaded;
          }),
        );
      }),
    );
  }

  private getQuestionComponents(
    questions: QuestionComponentsUploaded[][],
  ): QuestionComponent[][] {
    return questions.map((question: QuestionComponentsUploaded[]) => {
      return question.map((questionComponent: QuestionComponentsUploaded) => {
        return questionComponent as QuestionComponent;
      });
    }) as QuestionComponent[][];
  }

  private getQuestionComponentResponses(
    questions: QuestionComponentsUploaded[][],
  ): QuestionComponentResponse[][] {
    return questions.map((question: QuestionComponentsUploaded[]) => {
      return question.map((questionComponent: QuestionComponentsUploaded) => {
        return questionComponent as QuestionComponentResponse;
      });
    }) as QuestionComponentResponse[][];
  }

  private async hydrateImages(
    questions: QuestionComponent[][],
  ): Promise<QuestionComponentResponse[][]> {
    return Promise.all(
      questions.map(async (question: QuestionComponent[]) => {
        return Promise.all(
          question.map(async (questionComponent: QuestionComponent) => {
            if (questionComponent.type === QuestionComponentType.IMAGE) {
              const imageMetadata: ImageUpload = await this.imageUploadService.getImage(
                (questionComponent.metadata as ImageMetadata).filePath,
              );
              return {
                ...questionComponent,
                metadata: {
                  url: imageMetadata.url,
                },
              };
            }
            return questionComponent as QuestionComponentResponse;
          }),
        );
      }),
    );
  }
}

export default TestService;
