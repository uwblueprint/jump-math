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

export type MultipleChoiceOptionData = {
  id: string;
  data: string;
  isCorrect: boolean;
};

export type MultipleChoiceData = {
  optionCount: number;
  options: MultipleChoiceOptionData[];
};

export type QuestionElement = {
  id: string;
  type: QuestionElementType;
  data: string | number | MultipleChoiceData;
  error?: string;
};
