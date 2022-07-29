import { Question } from "../../models/test.model";
import { UserDTO } from "../../types";

export type TestResponseDTO = {
  /** the unique identifier of the response */
  id: string;
  /** the name of the test */
  name: string;
  /** the duration of the test */
  duration: number;
  /** the UserDTO for the admin */
  admin: UserDTO;
  /** an array of questions on the test */
  questions: Question[];
  /** the grade of the student */
  grade: number;
};

/** the request input expects an admin userId string rather than a UserDTO */
export type CreateTestRequestDTO = Omit<TestResponseDTO, "id" | "admin"> & {
  admin: string;
};

export interface ITestService {
  /**
   * create a new Test with the fields given in the DTO test, return created Test
   * @param test CreateTestRequest object containing test info
   * @returns a TestDTO with the created test
   * @throws Error if creation fails
   */
  createTest(test: CreateTestRequestDTO): Promise<TestResponseDTO>;

  updateTest(id: string, test: CreateTestRequestDTO): Promise<TestResponseDTO>;
}
