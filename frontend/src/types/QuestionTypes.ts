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
