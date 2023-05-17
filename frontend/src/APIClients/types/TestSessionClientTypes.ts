import { ClassResponse } from "./ClassClientTypes";
import { Test } from "./TestClientTypes";

export interface TestSessionMetadata {
  /** the unique identifier for the test session */
  id: string;
  /** on this date, the test becomes available to students */
  startDate: Date;
  /** notes inputted by teacher to show students prior to commencing the test */
  notes?: string;
}

export interface TestSession extends TestSessionMetadata {
  /** the name of the test that this test session is for */
  test: Pick<Test, "name">;
  /** the name of the class that this test session is for */
  class: Pick<ClassResponse, "className">;
  /** after this date, the test is no longer available to students */
  endDate: Date;
  /** the access code that students use to access the test session */
  accessCode: string;
}
