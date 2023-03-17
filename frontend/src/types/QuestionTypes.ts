export enum ResponseType {
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

export type QuestionElement = {
  id: string;
  type: QuestionElementType;
  data: QuestionElementDataType;
  error?: string;
};

export type QuestionElementDataType = string | number | MultipleChoiceData;

export type MultipleChoiceOptionData = {
  id: string;
  value: string;
  isCorrect: boolean;
};

export type MultipleChoiceData = {
  optionCount: number;
  options: MultipleChoiceOptionData[];
};
