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
    isCompleted: false,
    elements: getAnswerElements(question).map(() => ({
      elementAnswers: [],
    })),
  }));
};

const isCompleted = (
  prevAnswers: Answers[],
  value: number[],
  currentQuestionIndex: number,
): boolean =>
  value?.length >= prevAnswers[currentQuestionIndex].elements.length;

export const updatedAnswer = (
  answerIndex: number,
  currentQuestionIndex: number,
  value: number[] | undefined,
  prevAnswers: Answers[],
): Answers[] => {
  return update(prevAnswers, {
    [currentQuestionIndex]: {
      isCompleted: {
        $set: isCompleted(prevAnswers, value || [], currentQuestionIndex),
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

export const questionStatus = (
  index: number,
  currentQuestionIndex: number,
  answers: Answers[],
): QuestionNumberTypes => {
  if (index === currentQuestionIndex) return QuestionNumberTypes.CURRENT;
  if (answers[index].isCompleted) return QuestionNumberTypes.COMPLETED;
  return QuestionNumberTypes.UNATTEMPTED;
};

export const mapAnswersToResultsArray = (answers: Answers[]): number[][][] => {
  return answers.map((answer) => {
    const row: number[][] = [];
    answer.elements.map((element) => {
      return row.push(element.elementAnswers);
    });
    return row;
  });
};
