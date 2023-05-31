import type { StringOrNumber } from "@chakra-ui/utils";
import update from "immutability-helper";

import type { QuestionComponentRequest } from "../APIClients/types/TestClientTypes";
import type { Answers } from "../types/AnswerTypes";
import QuestionNumberTypes from "../types/QuestionNumberTypes";
import { ResponseElementType } from "../types/QuestionTypes";

import { stringToFloat } from "./GeneralUtils";

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
  const isPrevCompletedElement: boolean =
    prevAnswer.elements[answerElementIndex].elementAnswers.length !== 0;

  /* Case 1: if the element was previously completed and we are updating 
  its answer value to an empty or undefined value, we need to decrement the
  count of completed question elements. */
  if (isPrevCompletedElement && (!value || value.length === 0)) offset = -1;

  /* Case 2: if the element was previously not completed and we are updating 
  its answer to a non-empty value, we need to increment the
  count of completed question elements. */
  if (!isPrevCompletedElement && value && value.length !== 0) offset = 1;

  /* Case 3: 
    (a) if the element was previously completed and we are updating
    its answer value to an empty value or 
    (b) if the element was previously completed and we are updating
    its answer value to a non-empty value
  the count of completed question elements should be unchanged. */

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
  const castedInput = stringToFloat(input);
  return castedInput !== undefined ? [castedInput] : [];
};

export const stringOrNumberArrayToNumberArray = (
  inputs: StringOrNumber[],
): number[] => {
  return inputs
    .map((input) => (typeof input === "string" ? stringToFloat(input) : input))
    .filter((value): value is number => value !== undefined)
    .sort((a, b) => a - b);
};

export const isCompleted = (answer: Answers) => {
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

export const mapAnswersToResultsArray = (answers: Answers[]): number[][][] => {
  return answers.map((answer) =>
    answer.elements.map((element) => element.elementAnswers),
  );
};
