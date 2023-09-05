/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from "react";

import type { Question } from "../types/QuestionTypes";

type AssessmentContextType = {
  questions: Question[];
  setQuestions: (_questions: (prevElements: Question[]) => Question[]) => void;
  showQuestionEditor: boolean;
  setShowQuestionEditor: (_showQuestionEditor: boolean) => void;
  editorQuestion: Question | null;
  setEditorQuestion: (_editorQuestion: Question | null) => void;
  showPreviewAssessment: boolean;
  setShowPreviewAssessment: (_showPreviewAssessment: boolean) => void;
};

const AssessmentContext = createContext<AssessmentContextType>({
  questions: [],
  setQuestions: (
    _questions: (prevElements: Question[]) => Question[],
  ): void => {},
  showQuestionEditor: false,
  setShowQuestionEditor: (_showQuestionEditor: boolean): void => {},
  editorQuestion: null,
  setEditorQuestion: (_editorQuestion: Question | null): void => {},
  showPreviewAssessment: false,
  setShowPreviewAssessment: (_showPreviewAssessment: boolean): void => {},
});

export default AssessmentContext;
