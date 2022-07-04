export interface TestSessionRequestDTO {
  test: string;
  teacher: string;
  school: string;
  grade_level: number;
  access_code: string;
  start_time: Date;
}

export interface TestSessionResponseDTO {
  id: string;
  test: string;
  teacher: string;
  school: string;
  grade_level: number;
  access_code: string;
  start_time: Date;
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
}
