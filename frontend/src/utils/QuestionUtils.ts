import React from "react";
import { DropTargetMonitor } from "react-dnd";
import type { XYCoord } from "dnd-core";
import update from "immutability-helper";

import { QuestionComponentRequest } from "../APIClients/types/TestClientTypes";
import { QuestionTagProps } from "../components/assessments/assessment-creation/QuestionTag";
import { DragQuestionItem } from "../types/DragTypes";
import {
  ImageMetadataRequest,
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  QuestionTextMetadata,
  ShortAnswerMetadata,
  TextMetadata,
} from "../types/QuestionMetadataTypes";
import {
  MultiData,
  MultiOptionData,
  Question,
  QuestionElement,
  QuestionElementDataType,
  QuestionElementType,
  ResponseElementType,
} from "../types/QuestionTypes";

export const shouldReorder = (
  dragIndex: number,
  hoverIndex: number,
  previewRef: React.RefObject<HTMLDivElement>,
  monitor: DropTargetMonitor<DragQuestionItem, void>,
): boolean => {
  if (dragIndex === hoverIndex) {
    return false;
  }
  const hoverBoundingRect = previewRef.current?.getBoundingClientRect();
  if (hoverBoundingRect) {
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return false;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return false;
    }
    return true;
  }
  return false;
};

export const updatedQuestionElement = (
  id: string,
  updatedData: QuestionElementDataType,
  prevElements: QuestionElement[],
  error?: string,
): QuestionElement[] => {
  const indexToUpdate = prevElements.findIndex((element) => element.id === id);
  return update(prevElements, {
    [indexToUpdate]: {
      $merge: {
        data: updatedData,
        error,
      },
    },
  });
};

export const updatedMultiOption = (
  id: string,
  prevOptions: MultiOptionData[],
  value: string,
  isCorrect: boolean,
): MultiOptionData[] => {
  const indexToUpdate = prevOptions.findIndex((option) => option.id === id);
  return update(prevOptions, {
    [indexToUpdate]: {
      $merge: {
        value,
        isCorrect,
      },
    },
  });
};

export const exceedsMaxLength = (input: string): boolean => input.length > 800;

export const exceedsMaxFileSize = (file: File): boolean =>
  file.size / 1024 / 1024 > 5;

export const generateQuestionCardTags = (
  question: QuestionElement[],
): QuestionTagProps[] => {
  const tags: QuestionTagProps[] = [];

  Object.values(ResponseElementType).forEach((responseType) => {
    const responseTypeCount = question.filter(
      (questionElement) => questionElement.type === responseType,
    ).length;
    if (responseTypeCount) {
      tags.push({
        type: responseType,
        count: responseTypeCount,
      });
    }
  });

  return tags;
};

export const getQuestionTexts = (question: QuestionElement[]): string[] => {
  return question
    .filter(
      (questionElement) =>
        questionElement.type === QuestionElementType.QUESTION_TEXT,
    )
    .map(
      (questionElement) =>
        (questionElement.data as QuestionTextMetadata).questionText,
    );
};

const formatMultipleChoiceRequest = (
  data: MultiData,
): MultipleChoiceMetadata => {
  return {
    options: data.options.map((option) => option.value),
    answerIndex: data.options.findIndex((option) => option.isCorrect),
  };
};

const formatMultiSelectRequest = (data: MultiData): MultiSelectMetadata => {
  const answerIndices: number[] = [];
  data.options.forEach((option, index) => {
    if (option.isCorrect) {
      answerIndices.push(index);
    }
  });
  return {
    options: data.options.map((option) => option.value),
    answerIndices,
  };
};

export const formatQuestionsRequest = (
  questions: Question[],
): QuestionComponentRequest[][] => {
  return questions.map((question) => {
    return question.elements.map((element) => {
      switch (element.type) {
        case QuestionElementType.QUESTION_TEXT:
          return {
            type: QuestionElementType.QUESTION_TEXT,
            questionTextMetadata: element.data as QuestionTextMetadata,
          };
        case QuestionElementType.TEXT:
          return {
            type: QuestionElementType.TEXT,
            textMetadata: element.data as TextMetadata,
          };
        case QuestionElementType.IMAGE:
          return {
            type: QuestionElementType.IMAGE,
            imageMetadataRequest: element.data as ImageMetadataRequest,
          };
        case QuestionElementType.SHORT_ANSWER:
          return {
            type: QuestionElementType.SHORT_ANSWER,
            shortAnswerMetadata: element.data as ShortAnswerMetadata,
          };
        case QuestionElementType.MULTI_SELECT:
          return {
            type: QuestionElementType.MULTI_SELECT,
            multiSelectMetadata: formatMultiSelectRequest(
              element.data as MultiData,
            ),
          };
        default:
          return {
            type: QuestionElementType.MULTIPLE_CHOICE,
            multipleChoiceMetadata: formatMultipleChoiceRequest(
              element.data as MultiData,
            ),
          };
      }
    });
  });
};
