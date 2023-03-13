export enum Status {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
}

export enum UseCase {
  BEGINNING = "BEGINNING",
  END = "END",
}

export type AssessmentProperties = {
  status: Status;
  name: string;
  grade: string;
  type: UseCase;
  country: string;
  region: string;
};
