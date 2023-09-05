/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from "react";

type WriteAssessmentContextType = {
  isLoading: boolean;
  setIsLoading: (_isLoading: boolean) => void;
  isSubmitted: boolean;
  setIsSubmitted: (_isSubmitted: boolean) => void;
};

const WriteAssessmentContext = createContext<WriteAssessmentContextType>({
  isLoading: false,
  setIsLoading: (_isLoading: boolean): void => {},
  isSubmitted: false,
  setIsSubmitted: (_isSubmitted: boolean): void => {},
});

export default WriteAssessmentContext;
