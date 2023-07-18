import type { Grade } from "../APIClients/types/UserClientTypes";

export type ClassroomInput = "className" | "startDate" | "gradeLevel";

export interface ClassroomForm {
  className: string;
  startDate: Date | undefined;
  gradeLevel?: Grade;
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
