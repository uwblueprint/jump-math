export enum QuestionType {
  MULTIPLE_CHOICE = "Multiple Choice",
  SHORT_ANSWER = "Short Answer",
  MULTI_SELECT = "Multi-select",
}

export enum QuestionElementType {
  QUESTION = "Question",
  TEXT = "Text",
  IMAGE = "Image",
  MULTIPLE_CHOICE = "Multiple Choice",
  SHORT_ANSWER = "Short Answer",
  MULTI_SELECT = "Multi-select",
}

export type MultiOptionData = {
  id: string;
  value: string;
  isCorrect: boolean;
};

export type MultiData = {
  optionCount: number;
  options: MultiOptionData[];
};

export type QuestionDataType = string | number | MultiData;

export type QuestionElement = {
  id: string;
  type: QuestionElementType;
  data: QuestionDataType;
  error?: string;
};
