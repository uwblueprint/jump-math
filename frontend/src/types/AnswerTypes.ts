export interface ElementAnswers {
  elementAnswers: (number | undefined)[];
}

export interface Answers {
  elements: ElementAnswers[];
  completedCount: number;
}
