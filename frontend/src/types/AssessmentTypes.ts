import { Grade } from "../APIClients/types/UserClientTypes";

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

export type AssessmentTypes = {
  status: Status;
  name: string;
  grade: Grade;
  type: UseCase;
  country: string;
  region: string;
};
