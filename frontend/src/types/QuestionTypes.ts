export enum QuestionElementType {
  QUESTION = "Question",
  TEXT = "Text",
  IMAGE = "Image",
  MULTIPLE_CHOICE = "Multiple Choice",
  SHORT_ANSWER = "Short Answer",
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

export type QuestionElementDataType = string | number | MultiData;

export type MultiOptionData = {
  id: string;
  value: string;
  isCorrect: boolean;
};

export type MultiData = {
  optionCount: number;
  options: MultiOptionData[];
};

export interface QuestionTextMetadata {
  questionText: string;
}

export interface TextMetadata {
  text: string;
}

export interface ImageMetadata {
  src: string;
}

export interface MultipleChoiceMetadata {
  options: string[];
  answerIndex: number;
}

export interface MultiSelectMetadata {
  options: string[];
  answerIndices: number[];
}

export interface ShortAnswerMetadata {
  answer: number;
}

export interface QuestionComponentMetadataRequest {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imageMetadata: ImageMetadata;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
  shortAnswerMetadata: ShortAnswerMetadata;
}

export type QuestionComponentRequest = {
  type: QuestionElementType;
  metadata: QuestionComponentMetadataRequest;
};
