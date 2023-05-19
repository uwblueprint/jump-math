import update from "immutability-helper";

import { QuestionComponentRequest } from "../APIClients/types/TestClientTypes";
import { Answers } from "../types/AnswerTypes";
import QuestionNumberTypes from "../types/QuestionNumberTypes";
import { ResponseElementType } from "../types/QuestionTypes";

export const getAnswerElements = (
  question: QuestionComponentRequest[],
): QuestionComponentRequest[] => {
  return question.filter(
    (questionElement) => questionElement.type in ResponseElementType,
  );
};

export const getAnswerValues = (
  currentQuestionIndex: number,
  answerElementIndex: number,
  answers: Answers[],
): number[] => {
  const answer = answers.find((a) => a.index === currentQuestionIndex);
  const answerElement = answer?.elements[answerElementIndex];
  return answerElement?.elementAnswers ?? [];
};

export const initializeAnswers = (
  questions: QuestionComponentRequest[][],
): Answers[] => {
  return questions.map((question, index) => ({
    index,
    elements: getAnswerElements(question).map((_, elementIndex) => ({
      index: elementIndex,
      elementAnswers: [],
    })),
  }));
};

export const updatedAnswer = (
  answerIndex: number,
  currentQuestionIndex: number,
  value: number[] | undefined,
  prevAnswers: Answers[],
): Answers[] => {
  return update(prevAnswers, {
    [currentQuestionIndex]: {
      elements: {
        [answerIndex]: {
          elementAnswers: { $set: value ?? [] },
        },
      },
    },
  });
};

export const stringToNumberArray = (input: string): number[] => {
  const value = parseFloat(input);
  return Number.isNaN(value) ? [] : [value];
};

const isCompletedQuestion = (answers: Answers[], index: number) => {
  return answers[index].elements.every(
    (element) => element.elementAnswers.length !== 0,
  );
};

export const questionStatus = (
  index: number,
  currentQuestionIndex: number,
  answers: Answers[],
): QuestionNumberTypes => {
  if (index === currentQuestionIndex) {
    return QuestionNumberTypes.CURRENT;
  }
  if (isCompletedQuestion(answers, index)) {
    return QuestionNumberTypes.COMPLETED;
  }
  return QuestionNumberTypes.UNATTEMPTED;
};
