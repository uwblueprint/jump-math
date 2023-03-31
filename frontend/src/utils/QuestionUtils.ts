import React from "react";
import { DropTargetMonitor } from "react-dnd";
import type { XYCoord } from "dnd-core";
import update from "immutability-helper";

import { QuestionTagProps } from "../components/assessments/assessment-creation/QuestionTag";
import { DragQuestionItem } from "../types/DragTypes";
import {
  MultiOptionData,
  QuestionElement,
  QuestionElementDataType,
  QuestionElementType,
  QuestionTextMetadata,
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
        questionElement.type === QuestionElementType.QUESTION,
    )
    .map(
      (questionElement) =>
        (questionElement.data as QuestionTextMetadata).questionText,
    );
};
