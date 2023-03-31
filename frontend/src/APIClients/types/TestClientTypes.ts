import { Status, UseCase } from "../../types/AssessmentTypes";
import {
  MultipleChoiceMetadata,
  QuestionElementType,
  QuestionTextMetadata,
  ShortAnswerMetadata,
  TextMetadata,
} from "../../types/QuestionTypes";

import { Grade } from "./UserClientTypes";

export type QuestionComponentMetadata =
  | QuestionTextMetadata
  | TextMetadata
  | MultipleChoiceMetadata
  | ShortAnswerMetadata;

export interface QuestionComponentRequest {
  /** the type of question component  */
  type: QuestionElementType;
  questionTextMetadata?: QuestionTextMetadata;
  textMetadata?: TextMetadata;
  shortAnswerMetadata?: ShortAnswerMetadata;
  multipleChoiceMetadata: null | MultipleChoiceMetadata;
}

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
