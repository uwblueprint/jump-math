import { Grade } from "../APIClients/types/UserClientTypes";

export type StatusProperty = "DRAFT" | "PUBLISHED" | "ARCHIVED" | "DELETED";

export enum Type {
  Beginning = "BEGINNING",
  End = "END",
}

export type AssessmentTypes = {
  status: StatusProperty;
  name: string;
  grade: Grade;
  type: Type;
  country: string;
  region: string;
};

export const gradeOptions = [
  { value: "K", label: "Kindergarten" },
  { value: "Grade 1", label: "Grade 1" },
  { value: "Grade 2", label: "Grade 2" },
  { value: "Grade 3", label: "Grade 3" },
  { value: "Grade 4", label: "Grade 4" },
  { value: "Grade 5", label: "Grade 5" },
  { value: "Grade 6", label: "Grade 6" },
  { value: "Grade 7", label: "Grade 7" },
  { value: "Grade 8", label: "Grade 8" },
];

export const typeOptions = [
  { value: "BEGINNING", label: "Beginning" },
  { value: "END", label: "End" },
];

export const regionOptions = [
  { value: "Ottawa", label: "Ottawa" },
  { value: "California", label: "California" },
  { value: "Ontario", label: "Ontario" },
  { value: "Texas", label: "Texas" },
];

export const countryOptions = [
  { value: "Canada", label: "Canada" },
  { value: "USA", label: "USA" },
];
