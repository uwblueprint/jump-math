import {
  QuestionTextMetadata,
  TextMetadata,
  ImageMetadata,
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  ShortAnswerMetadata,
  QuestionComponent,
} from "../../models/test.model";
import { UserDTO, AssessmentStatus, AssessmentType } from "../../types";

export type TestResponseDTO = {
  /** the unique identifier of the response */
  id: string;
  /** the name of the test */
  name: string;
  /** the UserDTO for the admin */
  admin: UserDTO;
  /** an array of questions on the test */
  questions: QuestionComponent[][];
  /** the grade of the student */
  grade: number;
  /** the type of assessment */
  assessmentType: AssessmentType;
  /** the status of the assessment * */
  status: AssessmentStatus;
  /**the country that the test is to be administered in * */
  curriculumCountry: string;
  /** the region that the test is to be administered in*/
  curriculumRegion: string;
};

/** the request input expects an admin userId string rather than a UserDTO */
export type CreateTestRequestDTO = Omit<TestResponseDTO, "id" | "admin"> & {
  admin: string;
};

export interface QuestionComponentMetadataRequest {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imageMetadata: ImageMetadata;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
  shortAnswerMetadata: ShortAnswerMetadata;
}

export type QuestionComponentRequest = Omit<QuestionComponent, "metadata"> &
  QuestionComponentMetadataRequest;

export type TestRequestDTO = {
  /** the name of the test */
  name: string;
  /** the UserDTO for the admin */
  admin: string;
  /** an ordered array of questions on the test */
  questions: QuestionComponentRequest[][];
  /** the grade of the student */
  grade: number;
  /** the type of assessment */
  assessmentType: AssessmentType;
  /** the status of the assessment * */
  status: AssessmentStatus;
  /** the country of the test* */
  curriculumCountry: string;
  /** the region of the test */
  curriculumRegion: string;
};

export interface ITestService {
  /**
   * create a new Test with the fields given in the DTO test, return created Test
   * @param test CreateTestRequest object containing test info
   * @returns a TestDTO with the created test
   * @throws Error if creation fails
   */
  createTest(test: CreateTestRequestDTO): Promise<TestResponseDTO>;

  /**
   * delete a Test with the given id, return deleted id
   * @param id id to delete
   * @returns deleted id
   * @throws Error if deletion fails
   */
  deleteTest(id: string): Promise<string>;

  /**
   * Update a test given the id
   * This method updates a Test document by its unique identifier in the database.
   *
   * @param id The unique identifier of the Test document to update
   * @param test The object containing the updated Test
   */
  updateTest(id: string, test: CreateTestRequestDTO): Promise<TestResponseDTO>;

  /* Find a test given the id
   * @param id string with the test id to be found
   * @returns a TestDTO with the test that has the given id
   * @throws Error if test with given id not found
   */
  getTestById(id: string): Promise<TestResponseDTO>;

  /**
   * This method retrieves all Tests
   * @param
   * @returns an array of TestResponseDTO
   * @throws Error if retrieval fails
   */
  getAllTests(): Promise<TestResponseDTO[]>;
}
