/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from "react";

import type { QuestionElement } from "../types/QuestionTypes";

type QuestionEditorContextType = {
  questionElements: QuestionElement[];
  setQuestionElements: (
    _questionElements: (prevElements: QuestionElement[]) => QuestionElement[],
  ) => void;
  showAddShortAnswerModal: boolean;
  setShowAddShortAnswerModal: (_showShortAnswerModal: boolean) => void;
  showAddMultipleChoiceModal: boolean;
  setShowAddMultipleChoiceModal: (_showAddMultipleChoiceModal: boolean) => void;
  showAddMultiSelectModal: boolean;
  setShowAddMultiSelectModal: (_showAddMultiSelectModal: boolean) => void;
  showEditorError: boolean;
  setShowEditorError: (_showEditorError: boolean) => void;
};

const QuestionEditorContext = createContext<QuestionEditorContextType>({
  questionElements: [],
  setQuestionElements: (
    _questionElements: (prevElements: QuestionElement[]) => QuestionElement[],
  ): void => {},
  showAddShortAnswerModal: false,
  setShowAddShortAnswerModal: (_showAddShortAnswerModal: boolean): void => {},
  showAddMultipleChoiceModal: false,
  setShowAddMultipleChoiceModal: (
    _showAddMultipleChoiceModal: boolean,
  ): void => {},
  showAddMultiSelectModal: false,
  setShowAddMultiSelectModal: (_showAddMultiSelectModal: boolean): void => {},
  showEditorError: false,
  setShowEditorError: (_showEditorError: boolean): void => {},
});

export default QuestionEditorContext;
