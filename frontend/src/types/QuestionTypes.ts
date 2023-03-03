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

type MultipleChoiceOption = {
  data: string;
  isCorrect: boolean;
};

export type MultipleChoiceData = {
  optionCount: number;
  options: MultipleChoiceOption[];
};

export type QuestionElement = {
  id: string;
  type: QuestionElementType;
  data: string | number | MultipleChoiceData;
  error?: string;
};
