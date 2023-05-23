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
  const answer = answers[currentQuestionIndex];
  const answerElement = answer?.elements[answerElementIndex];
  return answerElement?.elementAnswers ?? [];
};

export const initializeAnswers = (
  questions: QuestionComponentRequest[][],
): Answers[] => {
  return questions.map((question, index) => ({
    index,
    completedCount: 0,
    elements: getAnswerElements(question).map(() => ({
      elementAnswers: [],
    })),
  }));
};

const getCompletedCount = (
  prevAnswer: Answers,
  answerElementIndex: number,
  value: number[] | undefined,
) => {
  let offset = 0;
  const prevCompletedCount = prevAnswer.completedCount;
  const prevCompleted: boolean =
    prevAnswer.elements[answerElementIndex].elementAnswers.length !== 0;
  if (prevCompleted && (!value || value.length === 0)) offset = -1;
  if (!prevCompleted && value && value.length !== 0) offset = 1;
  return prevCompletedCount + offset;
};

export const getUpdatedAnswer = (
  answerIndex: number,
  currentQuestionIndex: number,
  value: number[] | undefined,
  prevAnswers: Answers[],
): Answers[] => {
  return update(prevAnswers, {
    [currentQuestionIndex]: {
      completedCount: {
        $set: getCompletedCount(
          prevAnswers[currentQuestionIndex],
          answerIndex,
          value,
        ),
      },
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

const isCompleted = (answer: Answers) => {
  return answer.completedCount === answer.elements.length;
};

export const questionStatus = (
  index: number,
  currentQuestionIndex: number,
  answers: Answers[],
): QuestionNumberTypes => {
  if (index === currentQuestionIndex) return QuestionNumberTypes.CURRENT;
  if (isCompleted(answers[index])) return QuestionNumberTypes.COMPLETED;
  return QuestionNumberTypes.UNATTEMPTED;
};
