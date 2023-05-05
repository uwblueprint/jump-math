import { Status, UseCase } from "../../types/AssessmentTypes";
import {
  ImageMetadata,
  ImageMetadataRequest,
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  QuestionTextMetadata,
  ShortAnswerMetadata,
  TextMetadata,
} from "../../types/QuestionMetadataTypes";
import { Question, QuestionElementType } from "../../types/QuestionTypes";

import { Grade } from "./UserClientTypes";

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
}

export type QuestionComponentRequest = QuestionType & Partial<QuestionMetadata>;

type QuestionMetadataName =
  | "QuestionTextMetadata"
  | "TextMetadata"
  | "ImageMetadata"
  | "MultipleChoiceMetadata"
  | "MultiSelectMetadata"
  | "ShortAnswerMetadata";

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
  ) &
    QuestionMetadataTypename;
};

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

export type TestResponse = TestRequest & {
  id: string;
  questions: QuestionComponentResponse[][];
};

export type Test = TestResponse & {
  questions: Question[];
};
