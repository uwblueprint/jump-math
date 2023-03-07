import { Grade } from "../APIClients/types/UserClientTypes";

export type StatusProperty = "DRAFT" | "PUBLISHED" | "ARCHIVED" | "DELETED";

export enum TestTypes {
  Beginning = "BEGINNING",
  End = "END",
}

export type AssessmentTypes = {
  status: StatusProperty;
  name: string;
  grade: Grade;
  type: TestTypes;
  country: string;
  region: string;
};

export const gradeOptions = [
  "K",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
].map((value) => ({ value, label: value === "K" ? "Kindergarten" : value }));
