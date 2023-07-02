import type { Grade } from "../APIClients/types/UserClientTypes";

export type ClassroomInput = "className" | "startDate" | "gradeLevel";

export interface ClassroomForm {
  className: string;
  startDate: Date | undefined;
  gradeLevel: Grade;
}

export interface ClassCard {
  id: string;
  activeAssessments: number;
  assessmentCount: number;
  gradeLevel: Grade;
  className: string;
  startDate?: string;
  studentCount: number;
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
