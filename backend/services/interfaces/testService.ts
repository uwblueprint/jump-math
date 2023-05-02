import { AssessmentType, AssessmentStatus } from "../../models/test.model";
import { Grade } from "../../types";
import {
  GraphQLQuestionComponent,
  QuestionComponent,
  QuestionComponentRequest,
} from "../../types/questionTypes";

export type BaseQuestionComponentType =
  | GraphQLQuestionComponent
  | QuestionComponentRequest
  | QuestionComponent;

export interface BaseTestDTO<
  QuestionComponentType extends BaseQuestionComponentType
> {
  /** the name of the test */
  name: string;
  /** an ordered list of questions to be asked when students take the test */
  questions: QuestionComponentType[][];
  /** the intended grade the test was made for */
  grade: Grade;
  /** the type of assessment */
  assessmentType: AssessmentType;
  /** the status of the assessment */
  status: AssessmentStatus;
  /** the country that the test is to be administered in */
  curriculumCountry: string;
  /** the region that the test is to be administered in */
  curriculumRegion: string;
}

export type GraphQLTestDTO = BaseTestDTO<GraphQLQuestionComponent>;

export type TestRequestDTO = BaseTestDTO<QuestionComponentRequest>;

export type TestResponseDTO = BaseTestDTO<QuestionComponent> & {
  /** the unique identifier of the response */
  id: string;
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
