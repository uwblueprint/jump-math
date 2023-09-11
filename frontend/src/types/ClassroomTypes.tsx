import type { Grade } from "../APIClients/types/UserClientTypes";

export interface ClassroomForm {
  className: string | null;
  startDate: Date | null;
  gradeLevel: Grade | null;
}

export enum TabEnumClassroom {
  ACTIVE,
  ARCHIVED,
}

export const TABS_CLASSROOM = [
  TabEnumClassroom.ACTIVE,
  TabEnumClassroom.ARCHIVED,
] as const;

export type StudentInput = "firstName" | "lastName" | "studentNumber";

export interface StudentForm {
  firstName: string;
  lastName: string;
  studentNumber?: string;
}
