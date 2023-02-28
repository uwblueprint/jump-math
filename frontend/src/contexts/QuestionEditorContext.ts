import { createContext } from "react";
import { QuestionElement } from "../types/QuestionTypes";

type QuestionEditorContextType = {
  questionElements: QuestionElement[];
  setQuestionElements: (
    _questionElements: (prevElements: QuestionElement[]) => QuestionElement[],
  ) => void;
};

const QuestionEditorContext = createContext<QuestionEditorContextType>({
  questionElements: [],
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  setQuestionElements: (
    _questionElements: (prevElements: QuestionElement[]) => QuestionElement[],
  ): void => {},
});

export default QuestionEditorContext;
