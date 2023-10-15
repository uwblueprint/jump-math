import type { Status, UseCase } from "../../types/AssessmentTypes";
import type {
  FractionMetadata,
  ImageMetadata,
  ImageMetadataRequest,
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  QuestionTextMetadata,
  ShortAnswerMetadata,
  TextMetadata,
} from "../../types/QuestionMetadataTypes";
import type { Question, QuestionElementType } from "../../types/QuestionTypes";

import type { Grade } from "./UserClientTypes";

interface QuestionType {
  type: QuestionElementType;
}

interface QuestionMetadata {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imageMetadataRequest: ImageMetadataRequest;
  shortAnswerMetadata: ShortAnswerMetadata;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
  fractionMetadata: FractionMetadata;
}

export type QuestionComponentRequest = QuestionType & Partial<QuestionMetadata>;

export type TestRequest = {
  name: string;
  /** an ordered array of questions on the test */
  questions: QuestionComponentRequest[][];
  /** the grade of the student */
  grade: Grade;
  /** the type of assessment */
  assessmentType: UseCase;
  /** the status of the assessment */
  status: Status;
  /** the country that the test is to be administered in */
  curriculumCountry: string;
  /** the region that the test is to be administered in */
  curriculumRegion: string;
};

type QuestionMetadataName =
  | "QuestionTextMetadata"
  | "TextMetadata"
  | "ImageMetadata"
  | "MultipleChoiceMetadata"
  | "MultiSelectMetadata"
  | "ShortAnswerMetadata"
  | "FractionMetadata";

type QuestionMetadataTypename = {
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  __typename: QuestionMetadataName;
};

export type QuestionComponentResponse = QuestionType & {
  metadata: (
    | QuestionTextMetadata
    | TextMetadata
    | ImageMetadata
    | MultipleChoiceMetadata
    | MultiSelectMetadata
    | ShortAnswerMetadata
    | FractionMetadata
  ) &
    QuestionMetadataTypename;
};

export type TestResponse = TestRequest & {
  id: string;
  questions: QuestionComponentResponse[][];
  updatedAt: string;
};

export type Test = Omit<TestResponse, "questions"> & {
  questions: Question[];
};
