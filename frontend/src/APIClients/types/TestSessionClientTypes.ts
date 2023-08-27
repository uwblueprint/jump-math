import type { TestSessionStatus } from "../../types/TestSessionTypes";

import type { ClassResponse, StudentResponse } from "./ClassClientTypes";
import type { Test } from "./TestClientTypes";

export interface TestSessionRequest {
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
  test: Pick<Test, "id" | "name">;
  /** the name of the class that this test session is for */
  class: Pick<ClassResponse, "id" | "className">;
  /** after this date, the test is no longer available to students */
  endDate: Date;
  /** the status of the test session */
  status: TestSessionStatus;
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
