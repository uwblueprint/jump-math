import { QuestionCardProps } from "../components/assessments/assessment-creation/QuestionCard";
import { QuestionType } from "../types/QuestionTypes";

const TEST_QUESTIONS: QuestionCardProps[] = [
  {
    points: 5,
    questionNumber: 1,
    questions: [
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
    ],
    tags: [
      { type: QuestionType.MULTIPLE_CHOICE, count: 2 },
      { type: QuestionType.MULTI_SELECT, count: 1 },
    ],
  },
  {
    points: 5,
    questionNumber: 2,
    questions: [
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
    ],
    tags: [
      { type: QuestionType.MULTI_SELECT, count: 1 },
      { type: QuestionType.MULTIPLE_CHOICE, count: 2 },
      { type: QuestionType.SHORT_ANSWER, count: 1 },
    ],
  },
  {
    points: 5,
    questionNumber: 3,
    questions: [
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
      "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
    ],
    tags: [{ type: QuestionType.MULTIPLE_CHOICE, count: 2 }],
  },
];

export default TEST_QUESTIONS;
