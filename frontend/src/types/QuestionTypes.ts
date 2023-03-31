export enum QuestionElementType {
  QUESTION = "QUESTION_TEXT",
  TEXT = "Text",
  IMAGE = "Image",
  MULTIPLE_CHOICE = "Multiple Choice",
  SHORT_ANSWER = "SHORT_ANSWER",
  MULTI_SELECT = "Multi-select",
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

export type QuestionElement = {
  id: string;
  type: QuestionElementType;
  data: QuestionElementDataType;
  error?: string;
};

export type QuestionElementDataType =
  | string
  | number
  | MultiData
  | QuestionTextMetadata
  | ShortAnswerMetadata;

export type MultiOptionData = {
  id: string;
  value: string;
  isCorrect: boolean;
};

export type MultiData = {
  options: MultiOptionData[];
};

export interface QuestionTextMetadata {
  questionText: string;
}

export interface ShortAnswerMetadata {
  answer: number;
}

export interface QuestionComponentMetadataRequest {
  questionTextMetadata?: QuestionTextMetadata;
}

export type QuestionComponentRequest = {
  type: QuestionElementType;
  questionTextMetadata?: QuestionTextMetadata;
  shortAnswerMetadata?: ShortAnswerMetadata;
};
