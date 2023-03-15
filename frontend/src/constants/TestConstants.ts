import { QuestionType } from "../types/QuestionTypes";

export interface QuestionData {
  questions: string[];
  tags: { type: QuestionType; count: number }[];
}

export const TEST_QUESTIONS: QuestionData[] = [
  {
    questions: [
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
    ],
    tags: [
      { type: QuestionType.MULTIPLE_CHOICE, count: 2 },
      { type: QuestionType.MULTI_SELECT, count: 1 },
    ],
  },
  {
    questions: [
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
    ],
    tags: [
      { type: QuestionType.MULTI_SELECT, count: 1 },
      { type: QuestionType.MULTIPLE_CHOICE, count: 2 },
      { type: QuestionType.SHORT_ANSWER, count: 1 },
    ],
  },
  {
    questions: [
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
    ],
    tags: [{ type: QuestionType.MULTIPLE_CHOICE, count: 2 }],
  },
];
