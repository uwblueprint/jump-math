export enum Status {
  DRAFT = "Draft",
  PUBLISHED = "Published",
  ARCHIVED = "Archived",
  DELETED = "Deleted",
}

export enum UseCase {
  BEGINNING = "Beginning of Term",
  END = "End of Term",
}

export type AssessmentTypes = {
  status: Status;
  name: string;
  grade: string;
  type: UseCase;
  country: string;
  region: string;
};
