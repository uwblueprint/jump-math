export type StatusProperty = "Draft" | "Published" | "Archived" | "Deleted";

export type AssessmentTypes = {
  status: StatusProperty;
  name: string;
  grade: string;
  type: "Beginning" | "End";
  country: string;
  region: string;
};
