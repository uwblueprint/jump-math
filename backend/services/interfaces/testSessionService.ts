import type { TestSessionStatus } from "../../utilities/testSessionUtils";

/**
 * This interface contains the request object that is fed into
 * the test session service to create or update the test session in the database.
 */
export interface TestSessionRequestDTO {
  /** the ID of the corresponding test from the Test collection */
  test: string;
  /** the ID of the teacher administering the test from the User collection */
  teacher: string;
  /** the ID of the school that's administering the test from the School collection */
  school: string;
  /** the ID of the class taking the test session */
  class: string;
  /** on this date, the test becomes available to students */
  startDate: Date;
  /** after this date, the test is no longer available to students */
  endDate: Date;
  /** notes inputted by teacher to show students prior to commencing the test */
  notes?: string;
}

/**
 * This interface contains the response object that is returned by
 * the test session service to represent a test session in the database.
 */
export interface TestSessionResponseDTO {
  /** the unique identifier for the test session */
  id: string;
  /** the id of the corresponding test from the Test collection */
  test: string;
  /** the id of the teacher administering the test from the User collection */
  teacher: string;
  /** the id of the school that's administering the test from the School collection */
  school: string;
  /** the id of the class taking the test session */
  class: string;
  /**
   * the result of the test session
   * there should be one entry here per student
   */
  results?: ResultResponseDTO[];
  /** the code that students can use to access the test when it is live */
  accessCode: string;
  /** on this date, the test becomes available to students */
  startDate: Date;
  /** after this date, the test is no longer available to students */
  endDate: Date;
  /** the status of the test session */
  status: TestSessionStatus;
  /** notes inputted by teacher to show students prior to commencing the test */
  notes?: string;
}

/**
 * This interface contains the request object that is fed into the test
 * session service to create or update a result in a given test session
 */
export interface ResultRequestDTO {
  /** the id of the student */
  student: string;
  /**
   * a list corresponding to the question list with each element indicating
   * the student's answer, either:
   * - [numeric answer] for short answer
   * - [index] for multiple choice
   * - list of indices for multiple select
   * - [numerator, denominator] or [whole number, numerator, denominator] for fraction
   * - [] for no answer
   */
  answers: number[][][];
}

/**
 * This interface contains the response object that is returned by
 * the test session service to represent a result in a given test session
 */
export interface ResultResponseDTO {
  /** the id of the student */
  student: string;
  /** the score of the student */
  score: number;
  /**
   * a list corresponding to the question list with each element indicating
   * the student's answer, either:
   * - [numeric answer] for short answer
   * - [index] for multiple choice
   * - list of indices for multiple select
   * - [numerator, denominator] or [whole number, numerator, denominator] for fraction
   * - [] for no answer
   */
  answers: number[][][];
  /**
   * a list corresponding to the question list with each fielding indicating
   * whether the student got the question right or not
   * */
  breakdown: boolean[][];
}

export interface ITestSessionService {
  /**
   * create a TestSession with the fields given in the DTO, return created TestSession
   * @param id of the class taking the test session
   * @param testSession new testSession
   * @returns the created TestSession
   * @throws Error if creation fails
   */
  createTestSession(
    testSession: TestSessionRequestDTO,
  ): Promise<TestSessionResponseDTO>;

  /**
   * get a TestSession with the given id
   * @param id TestSession id
   * @returns requested TestSession
   * @throws Error if retrieval fails
   */
  getTestSessionById(id: string): Promise<TestSessionResponseDTO>;

  /**
   * get a TestSession with the given access code
   * @param accessCode TestSession access code
   * @returns requested TestSession
   * @throws Error if retrieval fails
   */
  getTestSessionByAccessCode(
    accessCode: string,
  ): Promise<TestSessionResponseDTO>;

  /**
   * delete a TestSession with the given id, return deleted id
   * @param id id to delete
   * @returns deleted id
   * @throws Error if deletion fails
   */
  deleteTestSession(id: string): Promise<string>;

  /**
   * This method fetches all the test sessions from the database.
   */
  getAllTestSessions(): Promise<Array<TestSessionResponseDTO>>;

  /**
   * This method retrieves all TestSessions associated with the given teacherId
   * @param teacherId the teacher id associated with the test session
   * @param limit the optional maximum number of test sessions to return
   * @returns returns array of requested TestSessionResponseDTO
   * @throws Error if retrieval fails
   */
  getTestSessionsByTeacherId(
    teacherId: string,
    limit?: number,
  ): Promise<Array<TestSessionResponseDTO>>;

  /**
   * This method retrieves all TestSessions associated with the given classId
   * @param classId the class id associated with the test session
   * @returns returns array of requested TestSessionResponseDTO
   * @throws Error if retrieval fails
   */
  getTestSessionsByClassId(
    classId: string,
  ): Promise<Array<TestSessionResponseDTO>>;

  /**
   * This method fetches all the test sessions that have the provided test ID.
   * @param testId The unique identifier of the test to query by
   */
  getTestSessionsByTestId(
    testId: string,
  ): Promise<Array<TestSessionResponseDTO>>;

  /**
   * This method gets the mark distribution of the results for a
   * test session given the id
   * @param id The unique identifier of the Test Session document
   */
  getMarkDistribution(id: string): Promise<Array<number>>;

  /**
   * This method gets the performance by question for a
   * test session given the id
   * @param id The unique identifier of the Test Session document
   */
  getPerformanceByQuestion(id: string): Promise<Array<number>>;

  /**
   * Update a test session given the id
   * This method updates a Test Session document by its unique identifier in
   * the database (auto-grading all ungraded Results before updating).
   *
   * @param id The unique identifier of the Test Session document to update
   * @param testSession The object containing the updated Test Session
   */
  updateTestSession(
    id: string,
    testSession: TestSessionRequestDTO,
  ): Promise<TestSessionResponseDTO>;

  /**
   * Create and add a result to the given test session
   * @param id The unique identifier of the test session to update
   * @param result The object containing the result to create
   * @returns The updated test session
   * @throws Error if test session is not found or update fails
   */
  createTestSessionResult(
    id: string,
    result: ResultRequestDTO,
  ): Promise<TestSessionResponseDTO>;

  /**
   * Get the top 5 and bottom 5 students (based on test score) for a test session
   * @param id The unique identifier of the test session
   * @returns Array of the top 5 best and bottom students for the test session
   */
  getStudentLeaderBoard(
    id: string,
  ): Promise<{ topFive: Array<string>; bottomFive: Array<string> }>;
}
