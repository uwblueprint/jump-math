import mongoose from "mongoose";
import type { Test } from "../../models/test.model";
import MgTest, { AssessmentStatus } from "../../models/test.model";
import type {
  TestRequestDTO,
  TestResponseDTO,
  ITestService,
} from "../interfaces/testService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import type IImageUploadService from "../interfaces/imageUploadService";
import ImageUploadService from "./imageUploadService";
import type {
  QuestionComponentRequest,
  QuestionComponent,
  BaseQuestionComponent,
} from "../../types/questionTypes";
import { QuestionComponentType } from "../../types/questionTypes";
import type {
  ImageMetadata,
  ImageMetadataRequest,
  ImageMetadataTypes,
} from "../../types/questionMetadataTypes";

const Logger = logger(__filename);

class TestService implements ITestService {
  imageUploadService: IImageUploadService;

  constructor() {
    this.imageUploadService = new ImageUploadService("assessment-images");
  }

  /* eslint-disable class-methods-use-this */
  async createTest(test: TestRequestDTO): Promise<TestResponseDTO> {
    let newTest: Test | null;
    let questions: QuestionComponent[][] = [];

    try {
      questions = await this.uploadImages(test.questions);

      try {
        newTest = await MgTest.create({
          ...test,
          questions,
        });
      } catch (mongoDbError) {
        // rollback image upload in GCP
        try {
          await this.deleteImages(questions);
        } catch (imageError) {
          Logger.error(
            `Failed to rollback image upload after test creation failure. Reason = ${getErrorMessage(
              imageError,
            )}`,
          );
        }

        throw mongoDbError;
      }
    } catch (error) {
      Logger.error(`Failed to create test. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: newTest.id,
      name: newTest.name,
      questions,
      grade: newTest.grade,
      curriculumCountry: newTest.curriculumCountry,
      curriculumRegion: newTest.curriculumRegion,
      assessmentType: newTest.assessmentType,
      status: newTest.status,
      updatedAt: newTest.updatedAt,
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
        try {
          await this.deleteImages(testToDelete.questions);
        } catch (imageError) {
          Logger.error(
            `Failed to delete test images. Reason = ${getErrorMessage(
              imageError,
            )}`,
          );
        }
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
    let questions: QuestionComponent[][];

    try {
      const oldTest = await MgTest.findById(id);
      if (!oldTest) {
        throw new Error(`Test ID ${id} not found`);
      }

      // Delete all images that are not in the new test
      const oldImages = oldTest.questions
        .flat()
        .filter((question) => question.type === QuestionComponentType.IMAGE);

      const newImageUrls = new Set(
        test.questions
          .flat()
          .filter((question) => question.type === QuestionComponentType.IMAGE)
          .map(
            (question) =>
              (question.metadata as ImageMetadataRequest).previewUrl,
          ),
      );

      questions = await this.uploadImages(test.questions);
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
        throw new Error(`Test ID ${id} not found`);
      }

      const imagesToDelete = oldImages.filter(
        (oldImage) =>
          !newImageUrls.has((oldImage.metadata as ImageMetadata).url),
      );
      await this.deleteImages([imagesToDelete]);
    } catch (error: unknown) {
      Logger.error(`Failed to update test. Reason = ${getErrorMessage(error)}`);
      // Leaving this in in case we can reproduce an image upload error
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Logger.error((error as any).stack);
      throw error;
    }

    return {
      id: updatedTest.id,
      name: updatedTest.name,
      questions,
      grade: updatedTest.grade,
      curriculumCountry: updatedTest.curriculumCountry,
      curriculumRegion: updatedTest.curriculumRegion,
      assessmentType: updatedTest.assessmentType,
      status: updatedTest.status,
      updatedAt: updatedTest.updatedAt,
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
    return (await this.mapTestsToTestResponseDTOs([test]))[0];
  }

  async getAllTests(): Promise<TestResponseDTO[]> {
    try {
      const tests = await MgTest.find({
        status: { $ne: AssessmentStatus.DELETED },
      });
      return await this.mapTestsToTestResponseDTOs(tests);
    } catch (error: unknown) {
      Logger.error(`Failed to get tests. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getPublishedTests(): Promise<TestResponseDTO[]> {
    try {
      const tests = await MgTest.find({
        status: { $eq: AssessmentStatus.PUBLISHED },
      });
      return await this.mapTestsToTestResponseDTOs(tests);
    } catch (error: unknown) {
      Logger.error(`Failed to get tests. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async publishTest(id: string): Promise<TestResponseDTO> {
    let test: Test | null;

    try {
      test = await MgTest.findOneAndUpdate(
        { _id: id, status: AssessmentStatus.DRAFT },
        {
          $set: {
            status: AssessmentStatus.PUBLISHED,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!test) {
        throw new Error(
          `Test with ID ${id} is not found or not in draft status`,
        );
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to publish test with ID ${id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return (await this.mapTestsToTestResponseDTOs([test]))[0];
  }

  async duplicateTest(id: string): Promise<TestResponseDTO> {
    let test: Test | null;

    try {
      test = await MgTest.findById(id);
      if (!test) {
        throw new Error(`Test ID ${id} not found`);
      }
      // eslint-disable-next-line no-underscore-dangle
      test._id = new mongoose.Types.ObjectId();
      test.name += " [COPY]";
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
    return (await this.mapTestsToTestResponseDTOs([test]))[0];
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
      updatedAt: unarchivedTest.updatedAt,
    };
  }

  async archiveTest(id: string): Promise<TestResponseDTO> {
    let test: Test | null;

    try {
      test = await MgTest.findOneAndUpdate(
        {
          _id: id,
          status: { $in: [AssessmentStatus.DRAFT, AssessmentStatus.PUBLISHED] },
        },
        {
          $set: {
            status: AssessmentStatus.ARCHIVED,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!test) {
        throw new Error(
          `Test with ID ${id} is not found or not in draft / published status`,
        );
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to archive test with ID ${id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return (await this.mapTestsToTestResponseDTOs([test]))[0];
  }

  private async mapTestsToTestResponseDTOs(
    tests: Array<Test>,
  ): Promise<TestResponseDTO[]> {
    return Promise.all(
      tests.map(async (test) => {
        const questions: QuestionComponent[][] = await this.hydrateImages(
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
          updatedAt: test.updatedAt,
        };
      }),
    );
  }

  private async hydrateImages(
    questions: QuestionComponent[][],
  ): Promise<QuestionComponent[][]> {
    return this.processImages<ImageMetadata>(
      questions,
      this.imageUploadService.hydrateImage.bind(this.imageUploadService),
    );
  }

  private async uploadImages(
    questions: QuestionComponentRequest[][],
  ): Promise<QuestionComponent[][]> {
    return this.processImages<ImageMetadataRequest>(
      questions,
      this.imageUploadService.uploadImage.bind(this.imageUploadService),
    );
  }

  private async deleteImages(
    questions: QuestionComponent[][],
  ): Promise<QuestionComponent[][]> {
    return this.processImages<ImageMetadata>(
      questions,
      this.imageUploadService.deleteImage.bind(this.imageUploadService),
    );
  }

  private async processImages<ImageMetadataType extends ImageMetadataTypes>(
    questions: BaseQuestionComponent<ImageMetadataType>[][],
    process: (imageMetadata: ImageMetadataType) => Promise<ImageMetadata>,
  ): Promise<QuestionComponent[][]> {
    return Promise.all(
      questions.map(
        async (question: BaseQuestionComponent<ImageMetadataType>[]) => {
          return Promise.all(
            question.map(
              async (
                questionComponent: BaseQuestionComponent<ImageMetadataType>,
              ) => {
                if (questionComponent.type === QuestionComponentType.IMAGE) {
                  const imageMetadata: ImageMetadata = await process(
                    questionComponent.metadata as ImageMetadataType,
                  );
                  return { ...questionComponent, metadata: imageMetadata };
                }
                return questionComponent as QuestionComponent;
              },
            ),
          );
        },
      ),
    );
  }
}

export default TestService;
