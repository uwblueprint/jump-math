import { Status, UseCase } from "../../types/AssessmentTypes";
import {
  MultipleChoiceMetadata,
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
  shortAnswerMetadata: ShortAnswerMetadata;
  multipleChoiceMetadata: MultipleChoiceMetadata;
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
