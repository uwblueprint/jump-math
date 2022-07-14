import { Result } from "../../models/testSession.model";

/**
 * This interface contains the request object that is fed into
 * the school service to create or update the test session in the database.
 */
export interface TestSessionRequestDTO {
  /** the ID of the corresponding test from the Test collection */
  test: string;
  /** the ID of the teacher administering the test from the User collection */
  teacher: string;
  /** the ID of the school that's administering the test from the School collection */
  school: string;
  /** the grade level that is being tested */
  gradeLevel: number;
  /**
   * the result of the test session
   * there should be one entry here per student
   * */
  results?: ResultRequestDTO[];
  /** the code that students can use to access the test when it is live */
  accessCode: string;
  /** the time when the test session is started by teacher */
  startTime: Date;
}

/**
 * This interface contains the response object that is returned by
 * the test session service to represent a test session in the database.
 */
export interface TestSessionResponseDTO {
  /** the unique identifier for the test session */
  id: string;
  /** the ID of the corresponding test from the Test collection */
  test: string;
  /** the ID of the teacher administering the test from the User collection */
  teacher: string;
  /** the ID of the school that's administering the test from the School collection */
  school: string;
  /** the grade level that is being tested */
  gradeLevel: number;
  /**
   * the result of the test session
   * there should be one entry here per student
   * */
  results?: ResultResponseDTO[];
  /** the code that students can use to access the test when it is live */
  accessCode: string;
  /** the time when the test session is started by teacher */
  startTime: Date;
}

export interface ResultRequestDTO {
  /** the name of the student */
  student: string;
  /** the score of the student */
  score: number;
  /**
   * a list corresponding to the question list with each field indicating
   * the student's answer
   */
  answers: number[];
  /**
   * a list corresponding to the question list with each fielding indicating
   * whether the student got the question right or not
   * */
  breakdown: boolean[];
}

export interface ResultResponseDTO {
  /** the unique identifier of the response */
  id: string;
  /** the name of the student */
  student: string;
  /** the score of the student */
  score: number;
  /**
   * a list corresponding to the question list with each field indicating
   * the student's answer
   */
  answers: number[];
  /**
   * a list corresponding to the question list with each fielding indicating
   * whether the student got the question right or not
   * */
  breakdown: boolean[];
}

export interface ITestSessionService {
  /**
   * create a TestSession with the fields given in the DTO, return created TestSession
   * @param testSession new testSession
   * @returns the created TestSession
   * @throws Error if creation fails
   */
  createTestSession(
    testSession: TestSessionRequestDTO,
  ): Promise<TestSessionResponseDTO>;

  /**
   * This method fetches all the test sessions from the database.
   */
  getAllTestSessions(): Promise<Array<TestSessionResponseDTO>>;

  /**
   * This method returns all test session by the provided school id
   */
  getTestSessionsBySchoolId(
    schoolId: string,
  ): Promise<TestSessionResponseDTO[]>;
}
