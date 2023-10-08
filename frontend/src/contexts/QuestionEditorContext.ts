import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

import type { QuestionElement } from "../types/QuestionTypes";

type QuestionEditorContextType = {
  questionElements: QuestionElement[];
  setQuestionElements: (
    questionElements: SetStateAction<QuestionElement[]>,
    markDirty?: boolean,
  ) => void;
  showAddShortAnswerModal: boolean;
  setShowAddShortAnswerModal: Dispatch<SetStateAction<boolean>>;
  showAddMultipleChoiceModal: boolean;
  setShowAddMultipleChoiceModal: Dispatch<SetStateAction<boolean>>;
  showAddMultiSelectModal: boolean;
  setShowAddMultiSelectModal: Dispatch<SetStateAction<boolean>>;
  showAddFractionModal: boolean;
  setShowAddFractionModal: Dispatch<SetStateAction<boolean>>;
  showEditorError: boolean;
  setShowEditorError: Dispatch<SetStateAction<boolean>>;
};

const QuestionEditorContext = createContext<QuestionEditorContextType>({
  questionElements: [],
  setQuestionElements: () => {},
  showAddShortAnswerModal: false,
  setShowAddShortAnswerModal: () => {},
  showAddMultipleChoiceModal: false,
  setShowAddMultipleChoiceModal: () => {},
  showAddMultiSelectModal: false,
  setShowAddMultiSelectModal: () => {},
  showAddFractionModal: false,
  setShowAddFractionModal: () => {},
  showEditorError: false,
  setShowEditorError: () => {},
});

export default QuestionEditorContext;
