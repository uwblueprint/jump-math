import type { Grade } from "../APIClients/types/UserClientTypes";

export type ClassroomInput = "className" | "startDate" | "gradeLevel";

export interface ClassroomForm {
  className: string;
  startDate: Date;
  gradeLevel: Grade;
}

// TODO: Add fields to include activeAssessments, assessmentCount and studentCount after resolver changes - David
export interface Classroom {
  id: string;
  gradeLevel: Grade;
  name: string;
  className: string;
  students: Array<{
    id: string;
    firstName: string;
    lastName: string;
    studentNumber: string;
  }>;
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
