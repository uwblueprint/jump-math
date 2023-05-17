import type { Grade } from "../APIClients/types/UserClientTypes";

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
  id: string;
  status: Status;
  name: string;
  grade: Grade;
  assessmentType: UseCase;
  curriculumCountry: string;
  curriculumRegion: string;
  updatedAt: string;
};
