import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

import type { DisablePromptFunction } from "../components/common/navigation/useDisableReloadPrompt";
import type { Question } from "../types/QuestionTypes";

type AssessmentContextType = {
  disableEditorPrompt: DisablePromptFunction;
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  isQuestionEditorDirty: boolean;
  setQuestionEditorDirty: Dispatch<SetStateAction<boolean>>;
};

const AssessmentContext = createContext<AssessmentContextType>({
  disableEditorPrompt: () => () => {},
  questions: [],
  setQuestions: () => {},
  isQuestionEditorDirty: false,
  setQuestionEditorDirty: () => {},
});

export default AssessmentContext;
