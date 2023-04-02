import { createContext } from "react";

import { QuestionElement } from "../types/QuestionTypes";

type QuestionEditorContextType = {
  questionElements: QuestionElement[];
  setQuestionElements: (
    _questionElements: (prevElements: QuestionElement[]) => QuestionElement[],
  ) => void;
  showAddShortAnswerModal: boolean;
  setShowAddShortAnswerModal: (_showShortAnswerModal: boolean) => void;
  showAddMultipleChoiceModal: boolean;
  setShowAddMultipleChoiceModal: (_showAddMultipleChoiceModal: boolean) => void;
  showEditorError: boolean;
  setShowEditorError: (_showEditorError: boolean) => void;
};

const QuestionEditorContext = createContext<QuestionEditorContextType>({
  questionElements: [],
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  setQuestionElements: (
    _questionElements: (prevElements: QuestionElement[]) => QuestionElement[],
  ): void => {},
  showAddShortAnswerModal: false,
  setShowAddShortAnswerModal: (_showAddShortAnswerModal: boolean): void => {},
  showAddMultipleChoiceModal: false,
  setShowAddMultipleChoiceModal: (
    showAddMultipleChoiceModal: boolean,
  ): void => {},
  showEditorError: false,
  setShowEditorError: (showEditorError: boolean): void => {},
});

export default QuestionEditorContext;
