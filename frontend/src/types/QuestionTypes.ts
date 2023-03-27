export enum QuestionType {
  MULTIPLE_CHOICE = "Multiple Choice",
  SHORT_ANSWER = "Short Answer",
  MULTI_SELECT = "Multi-select",
}

export enum QuestionToolTips {
  MULTIPLE_CHOICE = "Users will have to select the best response from a list of options",
  MULTI_SELECT = "Users will have to select the correct responses from a list of options",
  SHORT_ANSWER = "Users will have to type in their answers",
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
  value: string;
  isCorrect: boolean;
};

export type MultipleChoiceData = {
  optionCount: number;
  options: MultipleChoiceOptionData[];
};

export type QuestionDataType = string | number | MultipleChoiceData;

export type QuestionElement = {
  id: string;
  type: QuestionElementType;
  data: QuestionDataType;
  error?: string;
};
