import React from "react";
import { DropTargetMonitor } from "react-dnd";
import type { XYCoord } from "dnd-core";
import update from "immutability-helper";
import { DragQuestionItem } from "../types/DragTypes";
import { QuestionElement } from "../types/QuestionTypes";

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
  updatedData: string,
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
