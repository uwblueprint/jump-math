import type { Grade } from "../APIClients/types/UserClientTypes";

export type ClassroomInput = "className" | "schoolYear" | "gradeLevel";

export interface ClassroomForm {
  className: string;
  schoolYear: string;
  gradeLevel: Grade;
}

// TODO: Add fields to include activeAssessments, assessmentCount and studentCount after resolver changes - David
export interface ClassCard {
  id: string;
  activeAssessments: number;
  assessmentCount: number;
  gradeLevel: Grade;
  className: string;
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
