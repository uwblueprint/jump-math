export type ClassroomInput =
  | "className"
  | "schoolYear"
  | "gradeLevel"
  | "subject";

export interface ClassroomForm {
  className: string;
  schoolYear: string;
  gradeLevel: string;
  subject: string;
}
