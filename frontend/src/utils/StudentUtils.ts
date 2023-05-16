import update from "immutability-helper";

import { QuestionComponentRequest } from "../APIClients/types/TestClientTypes";
import { Answers } from "../types/AnswerTypes";
import { QuestionElementType } from "../types/QuestionTypes";

export const answerElements = (
  question: QuestionComponentRequest[],
): QuestionComponentRequest[] => {
  return question.filter(
    (questionElement) =>
      questionElement.type === QuestionElementType.QUESTION_TEXT,
  );
};

export const initializeAnswers = (
  questions: QuestionComponentRequest[][],
): Answers[] => {
  return questions.map((question, index) => ({
    index,
    elements: answerElements(question).map((_, elementIndex) => ({
      index: elementIndex,
      elementAnswers: [],
    })),
  }));
};

export const updateAnswer = (
  answerIndex: number,
  currentQuestion: number,
  value: number[] | undefined,
  prevAnswers: Answers[],
): Answers[] => {
  return update(prevAnswers, {
    [currentQuestion]: {
      elements: {
        [answerIndex]: {
          elementAnswers: { $set: value ?? [] },
        },
      },
    },
  });
};
