import { Status, UseCase } from "../../types/AssessmentTypes";
import {
  ImagePreviewMetadata,
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  QuestionTextMetadata,
  ShortAnswerMetadata,
  TextMetadata,
} from "../../types/QuestionMetadataTypes";
import { QuestionElementType } from "../../types/QuestionTypes";

import { Grade } from "./UserClientTypes";

interface QuestionType {
  type: QuestionElementType;
}

interface QuestionMetadata {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imagePreviewMetadata: ImagePreviewMetadata;
  shortAnswerMetadata: ShortAnswerMetadata;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
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
  | "ShortAnswerMetadata";

type QuestionMetadataTypename = {
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  __typename: QuestionMetadataName;
};

export type QuestionComponentResponse = QuestionType & {
  metadata: (
    | QuestionTextMetadata
    | TextMetadata
    | MultipleChoiceMetadata
    | MultiSelectMetadata
    | ShortAnswerMetadata
  ) &
    QuestionMetadataTypename;
};

export type TestResponse = TestRequest & {
  id: string;
  questions: QuestionComponentResponse[][];
};
