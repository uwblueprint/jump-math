import { createContext } from "react";

import { Question } from "../types/QuestionTypes";

type AssessmentContextType = {
  showQuestionEditor: boolean;
  setShowQuestionEditor: (_showQuestionEditor: boolean) => void;
  editorQuestion: Question | null;
  setEditorQuestion: (_editorQuestion: Question | null) => void;
};

const AssessmentContext = createContext<AssessmentContextType>({
  showQuestionEditor: false,
  setShowQuestionEditor: (_showQuestionEditor: boolean): void => {},
  editorQuestion: null,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  setEditorQuestion: (_editorQuestion: Question | null): void => {},
});

export default AssessmentContext;
