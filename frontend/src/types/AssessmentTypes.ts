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

export type AssessmentProperties = {
  status: Status;
  name: string;
  type: UseCase;
  country: string;
  region: string;
  grade: Grade;
  assessmentType: UseCase;
  curriculumCountry: string;
  curriculumRegion: string;
};

export type TestRequest = {
  name: string;
  questions: any;
  grade: Grade;
  assessmentType: UseCase;
  status: Status;
  curriculumCountry: string;
  curriculumRegion: string;
};

export type TestResponse = {
  id: string;
  name: string;
  questions: any;
  grade: Grade;
  assessmentType: UseCase;
  status: Status;
  curriculumCountry: string;
  curriculumRegion: string;
};
