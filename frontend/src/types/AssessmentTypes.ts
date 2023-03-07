export type StatusProperty = "DRAFT" | "PUBLISHED" | "ARCHIVED" | "DELETED";

export type AssessmentTypes = {
  status: StatusProperty;
  name: string;
  grade: string;
  type: "BEGINNING" | "END";
  country: string;
  region: string;
};
