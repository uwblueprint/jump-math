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
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
].map((value) => ({ value, label: value }));

export const testTypeOptions = [
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
