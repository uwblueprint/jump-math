import type { ClassResponse, StudentResponse } from "./ClassClientTypes";
import type { Test } from "./TestClientTypes";

interface TestSessionMetadata {
  /** the unique identifier for the test session */
  id: string;
  /** on this date, the test becomes available to students */
  startDate: Date;
  /** notes inputted by teacher to show students prior to commencing the test */
  notes?: string;
}

export type TestSessionSetupData = TestSessionMetadata;

export interface TestSessionOverviewData extends TestSessionMetadata {
  /** the name of the test that this test session is for */
  test: Pick<Test, "name">;
  /** the name of the class that this test session is for */
  class: Pick<ClassResponse, "className">;
  /** after this date, the test is no longer available to students */
  endDate: Date;
  /** the access code that students use to access the test session */
  accessCode: string;
}

export interface TestSessionResultData {
  /** the answers that the student gave */
  answers: number[][][];
  /** the breakdown of the student's score */
  breakdown: boolean[][];
  /** the score that the student got */
  score: number;
  /** the percentile that the student got */
  percentile: number;
}

export interface TestSessionResult {
  /** the student who took the test */
  student: StudentResponse;
  /** the result of the test session, if the student has finished the test */
  result: TestSessionResultData | null;
}

export interface TestSessionWithResultsData {
  /** the test that this test session is for */
  test: Pick<Test, "questions">;
  /** the results for this test session */
  results: TestSessionResult[];
}

export interface TestSessionTitleData {
  /** the name of the test that this test session is for */
  test: Pick<Test, "name">;
}
