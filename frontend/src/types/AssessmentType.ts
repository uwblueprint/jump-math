export type AssessmentType = {
  status: "Draft" | "Published" | "Archived" | "Deleted";
  name: string;
  grade: string;
  type: "Beginning" | "End";
  country: string;
  region: string;
};
