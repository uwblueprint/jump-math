export enum QuestionElementType {
  QUESTION_TEXT = "QUESTION_TEXT",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  SHORT_ANSWER = "SHORT_ANSWER",
  MULTI_SELECT = "MULTI_SELECT",
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
  // remove when all the elements have been implemented
  | string
  | MultiData
  | QuestionTextMetadata
  | TextMetadata
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

export interface TextMetadata {
  text: string;
}

export interface ShortAnswerMetadata {
  answer: number;
}

export interface MultipleChoiceMetadata {
  options: string[];
  answerIndex: number;
}

export type QuestionComponentRequest = {
  type: QuestionElementType;
  questionTextMetadata?: QuestionTextMetadata;
  textMetadata?: TextMetadata;
  shortAnswerMetadata?: ShortAnswerMetadata;
  multipleChoiceMetadata?: MultipleChoiceMetadata;
};
