import {
  ImageMetadata,
  QuestionTextMetadata,
  ShortAnswerMetadata,
  TextMetadata,
} from "./QuestionMetadataTypes";

export type Question = {
  id: string;
  elements: QuestionElement[];
};

export interface QuestionElement {
  id: string;
  type: QuestionElementType;
  data: QuestionElementDataType;
  error?: string;
}

export enum QuestionElementType {
  QUESTION_TEXT = "QUESTION_TEXT",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  SHORT_ANSWER = "SHORT_ANSWER",
  MULTI_SELECT = "MULTI_SELECT",
}

export type QuestionElementDataType =
  // remove string when all the elements have been implemented
  | string
  | QuestionTextMetadata
  | TextMetadata
  | ImageMetadata
  | ShortAnswerMetadata
  | MultiData;

export interface MultiOptionData {
  id: string;
  value: string;
  isCorrect: boolean;
}

export interface MultiData {
  options: MultiOptionData[];
}

export type ResponseElementType = Extract<
  QuestionElementType,
  | QuestionElementType.MULTIPLE_CHOICE
  | QuestionElementType.SHORT_ANSWER
  | QuestionElementType.MULTI_SELECT
>;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ResponseElementType = {
  [QuestionElementType.MULTIPLE_CHOICE]: QuestionElementType.MULTIPLE_CHOICE,
  [QuestionElementType.SHORT_ANSWER]: QuestionElementType.SHORT_ANSWER,
  [QuestionElementType.MULTI_SELECT]: QuestionElementType.MULTI_SELECT,
} as const;
