import type { Grade, UserResponse } from "./UserClientTypes";

export type ClassRequest = {
  className: string;
  startDate: number;
  gradeLevel: Grade;
  teacher: string;
};

export type ClassResponse = {
  id: string;
  className: string;
  startDate: number;
  gradeLevel: Grade;
  teacher: UserResponse;
};

export interface StudentResponse {
  /** the unique identifier for the student */
  id: string;
  /** the first name of the student */
  firstName: string;
  /** the last name of the student */
  lastName: string;
  /** an optional identifier provided by the teacher */
  studentNumber: string;
}
