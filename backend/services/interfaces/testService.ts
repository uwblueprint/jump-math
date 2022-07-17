import { Question } from "../../models/test.model";

export type TestResponseDTO = {
  /** the unique identifier of the response */
  id: string;
  /** the name of the student */
  name: string;
  /** the duration of the test */
  duration: number;
  /** the id of the admin */
  admin: string;
  /** an array of questions on the test */
  questions: Question[];
  /** the grade of the student */
  grade: number;
};

export type CreateTestRequestDTO = Omit<TestResponseDTO, "id">;

export interface ITestService {
  /**
   * create a new Test with the fields given in the DTO test, return created Test
   * @param test CreateTestRequest object containing test info
   * @returns a TestDTO with the created test
   * @throws Error if creation fails
   */
  createTest(test: CreateTestRequestDTO): Promise<TestResponseDTO>;
}
