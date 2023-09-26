/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from "react";

import type { Question } from "../types/QuestionTypes";

type AssessmentContextType = {
  questions: Question[];
  setQuestions: (_questions: (prevElements: Question[]) => Question[]) => void;
  showAssessmentPreview: boolean;
  setShowAssessmentPreview: (_showAssessmentPreview: boolean) => void;
};

const AssessmentContext = createContext<AssessmentContextType>({
  questions: [],
  setQuestions: (
    _questions: (prevElements: Question[]) => Question[],
  ): void => {},
  showAssessmentPreview: false,
  setShowAssessmentPreview: (_showAssessmentPreview: boolean): void => {},
});

export default AssessmentContext;
