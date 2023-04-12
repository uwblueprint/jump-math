import { FileUpload } from "graphql-upload";
import {
  QuestionTextMetadata,
  TextMetadata,
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  ShortAnswerMetadata,
  QuestionComponent,
  AssessmentType,
  AssessmentStatus,
  ImageMetadata,
  QuestionComponentMetadata,
} from "../../models/test.model";
import { Grade } from "../../types";
import { ImageUpload } from "./imageUploadService";

export interface ImagePreviewMetadata {
  url: string;
}

export type QuestionComponentResponse = Omit<QuestionComponent, "metadata"> & {
  metadata:
    | Exclude<QuestionComponentMetadata, ImageMetadata>
    | ImagePreviewMetadata;
};

export type TestResponseDTO = {
  /** the unique identifier of the response */
  id: string;
  /** the name of the test */
  name: string;
  /** an array of questions on the test */
  questions: QuestionComponentResponse[][];
  /** the grade of the student */
  grade: Grade;
  /** the type of assessment */
  assessmentType: AssessmentType;
  /** the status of the assessment */
  status: AssessmentStatus;
  /** the country that the test is to be administered in */
  curriculumCountry: string;
  /** the region that the test is to be administered in */
  curriculumRegion: string;
};

export type QuestionComponentMetadataRequest =
  | Exclude<QuestionComponentMetadata, ImageMetadata>
  | Promise<FileUpload>;
export type QuestionComponentRequest = Omit<QuestionComponent, "metadata"> & {
  metadata: QuestionComponentMetadataRequest;
};

export type TestRequestDTO = Omit<TestResponseDTO, "id" | "questions"> & {
  questions: QuestionComponentRequest[][];
};

export type QuestionComponentsUploaded = Omit<QuestionComponent, "metadata"> & {
  metadata: Exclude<QuestionComponentMetadata, ImageMetadata> | ImageUpload;
};

export interface GraphQLQuestionComponentMetadata {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imageMetadata: Promise<FileUpload>;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
  shortAnswerMetadata: ShortAnswerMetadata;
}

export type GraphQLQuestionComponent = Omit<QuestionComponent, "metadata"> &
  GraphQLQuestionComponentMetadata;

export type GraphQLTestRequestDTO = Omit<TestRequestDTO, "questions"> & {
  questions: GraphQLQuestionComponent[][];
};

export interface ITestService {
  /**
   * create a new Test with the fields given in the DTO test, return created Test
   * @param test CreateTestRequest object containing test info
   * @returns a TestResponseDTO with the created test
   * @throws Error if creation fails
   */
  createTest(test: TestRequestDTO): Promise<TestResponseDTO>;

  /**
   * delete a Test with the given id, return deleted id
   * @param id id to delete
   * @returns deleted id
   * @throws Error if deletion fails
   */
  deleteTest(id: string): Promise<string>;

  /**
   * update a Test given the id
   * @param id The unique identifier of the Test document to update
   * @param test The object containing the updated Test
   */
  updateTest(id: string, test: TestRequestDTO): Promise<TestResponseDTO>;

  /**
   * retrieve a Test given the id
   * @param id string with the test id to be found
   * @returns a TestResponseDTO with the test that has the given id
   * @throws Error if Test with given id not found
   */
  getTestById(id: string): Promise<TestResponseDTO>;

  /**
   * retrieve all Tests
   * @param
   * @returns an array of TestResponseDTO
   * @throws Error if retrieval fails
   */
  getAllTests(): Promise<TestResponseDTO[]>;

  /**
   * publish a Test given the id
   * @param id string with the test id to be published
   * @returns a TestResponseDTO with the published test
   * @throws Error if Test with given id not found or it is not a draft
   */
  publishTest(id: string): Promise<TestResponseDTO>;

  /**
   * duplicate a Test given the id
   * @param id string with the test id to be duplicated
   * @returns a TestResponseDTO with the duplicated test
   * @throws Error if Test with given id not found
   */
  duplicateTest(id: string): Promise<TestResponseDTO>;

  /**
   * unarchive a Test given the id
   * @param id string with the test id to be unarchived
   * @returns a TestResponseDTO with the unarchived test (as a draft)
   * @throws Error if Test with given id not found or if Test is not archived
   */
  unarchiveTest(id: string): Promise<TestResponseDTO>;

  /**
   * archive a Test given the id
   * @param id string with the test id to be archived
   * @returns a TestResponseDTO with the archived test
   * @throws Error if Test with given id not found or it is not a draft nor published
   */
  archiveTest(id: string): Promise<TestResponseDTO>;
}
