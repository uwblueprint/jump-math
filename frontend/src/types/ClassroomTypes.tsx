import type { Grade } from "../APIClients/types/UserClientTypes";

export type ClassroomInput = "className" | "schoolYear" | "gradeLevel";

export interface ClassroomForm {
  className: string;
  schoolYear: string;
  gradeLevel: Grade;
}

export enum TabEnumClassroom {
  ACTIVE,
  ARCHIVED,
}

export type StudentInput = "firstName" | "lastName" | "studentNumber";

export interface StudentForm {
  firstName: string;
  lastName: string;
  studentNumber?: number;
}
