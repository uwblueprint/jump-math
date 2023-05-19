export interface ElementAnswers {
  index: number;
  elementAnswers: number[];
}

export interface Answers {
  index: number;
  elements: ElementAnswers[];
  isCompleted: boolean;
}
