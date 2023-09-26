/* eslint-disable @typescript-eslint/no-unused-vars */

import type { SetStateAction } from "react";
import { createContext } from "react";
import type { LocationDescriptor } from "history";

import type { RedirectableNavigatePromptHistory } from "../components/common/navigation/useRedirectableNavigatePrompt";
import type { Question } from "../types/QuestionTypes";

type AssessmentContextType = {
  redirectableHistory: RedirectableNavigatePromptHistory;
  setQuestionEditorDirty: (_isDirty: SetStateAction<boolean | null>) => void;
  questions: Question[];
  setQuestions: (_questions: (prevElements: Question[]) => Question[]) => void;
};

const AssessmentContext = createContext<AssessmentContextType>({
  redirectableHistory: {
    push: (_location: LocationDescriptor) => {},
    replace: (_location: LocationDescriptor) => {},
    location: {
      pathname: "",
      search: "",
      hash: "",
      state: null,
      key: "",
    },
  },
  setQuestionEditorDirty: (
    _isDirty: SetStateAction<boolean | null>,
  ): void => {},
  questions: [],
  setQuestions: (
    _questions: (prevElements: Question[]) => Question[],
  ): void => {},
});

export default AssessmentContext;
