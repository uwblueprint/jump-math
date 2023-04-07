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
  QuestionComponentMetadata,
} from "../../models/test.model";
import { Grade } from "../../types";

export type TestResponseDTO = {
  /** the unique identifier of the response */
  id: string;
  /** the name of the test */
  name: string;
  /** an array of questions on the test */
  questions: QuestionComponent[][];
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

/* QuestionComponentMetadata object for service requests */
export type QuestionComponentMetadataRequest =
  | Exclude<QuestionComponentMetadata, "ImageMetadata">
  | Promise<FileUpload>;

/* QuestionComponent object for service requests */
export type QuestionComponentRequest = Omit<QuestionComponent, "metadata"> & {
  metadata: QuestionComponentMetadataRequest;
};

/* TestRequestDTO for service requests */
export type TestRequestDTO = Omit<TestResponseDTO, "id" | "questions"> & {
  questions: QuestionComponentRequest[][];
};

/* QuestionComponentMetadata object for GraphQL requests */
export interface GraphQLQuestionComponentMetadataRequest {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imageMetadata: Promise<FileUpload>;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
  shortAnswerMetadata: ShortAnswerMetadata;
}

/* QuestionComponent object for GraphQL requests */
export type GraphQLQuestionComponentRequest = Omit<
  QuestionComponent,
  "metadata"
> &
  GraphQLQuestionComponentMetadataRequest;

/* TestRequestDTO for GraphQL requests */
export type GraphQLTestRequestDTO = {
  /** the name of the test */
  name: string;
  /** an ordered array of questions on the test */
  questions: GraphQLQuestionComponentRequest[][];
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
}
