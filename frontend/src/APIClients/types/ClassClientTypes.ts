import type { TestSessionOverviewData } from "./TestSessionClientTypes";
import type { Grade, UserResponse } from "./UserClientTypes";

export type ClassRequest = {
  className: string;
  startDate: Date;
  gradeLevel: Grade;
  teacher: string;
};

export type ClassResponse = {
  id: string;
  className: string;
  startDate: Date;
  gradeLevel: Grade;
  teacher: UserResponse;
};

export type StudentResponse = {
  /** the unique identifier for the student */
  id: string;
  /** the first name of the student */
  firstName: string;
  /** the last name of the student */
  lastName: string;
  /** an optional identifier provided by the teacher */
  studentNumber: string;
};

export type ClassTitleData = {
  /** the name of the class */
  className: string;
  /** the start date of the class */
  startDate: Date;
};

export type ClassStudentData = {
  /** the students in the class */
  students: StudentResponse[];
};

export type ClassTestSessionData = {
  /** the name of the class */
  className: string;
  /** the test sessions for this class */
  testSessions: TestSessionOverviewData[];
};
