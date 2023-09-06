import type { TestSessionOverviewData } from "./TestSessionClientTypes";
import type { Grade, UserResponse } from "./UserClientTypes";

export type ClassRequest = {
  className: string;
  startDate: Date;
  gradeLevel: Grade;
  teacher: string;
};

export type ClassResponse = {
  /** the unique identifier for the class */
  id: string;
  /** the name of the class */
  className: string;
  /** the start date of the class */
  startDate: Date;
  /** the grade level of the class */
  gradeLevel: Grade;
  /** the teacher of the class */
  teacher: UserResponse;
  /** the test sessions for the class */
  testSessions: TestSessionOverviewData[];
  /** the students in the class */
  students: StudentResponse[];
  /** whether or not the class is active */
  isActive: boolean;
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

export type ClassTitleData = Pick<
  ClassResponse,
  "className" | "startDate" | "gradeLevel" | "isActive"
>;

export type ClassStudentData = Pick<ClassResponse, "students" | "isActive">;

export type ClassTestSessionData = Pick<
  ClassResponse,
  "className" | "testSessions" | "isActive"
>;

export type ClassOverviewData = Pick<ClassResponse, "id" | "className">;
