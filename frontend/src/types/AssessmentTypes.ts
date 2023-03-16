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
  grade: string;
  type: UseCase;
  country: string;
  region: string;
};

export type TestRequest = {
  name: string;
  questions: any;
  grade: number;
  assessmentType: UseCase;
  status: Status;
  curriculumCountry: string;
  curriculumRegion: string;
};

export type TestResponse = {
  id: string;
  name: string;
  questions: any;
  grade: number;
  assessmentType: UseCase;
  status: Status;
  curriculumCountry: string;
  curriculumRegion: string;
};
