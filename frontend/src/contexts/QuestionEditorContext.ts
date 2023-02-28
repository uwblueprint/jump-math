import { createContext } from "react";
import { QuestionElement } from "../types/QuestionTypes";

type QuestionEditorContextType = {
  questionElements: QuestionElement[];
  setQuestionElements: (
    _questionElements: (prevElements: QuestionElement[]) => QuestionElement[],
  ) => void;
  showShortAnswerModal: boolean;
  setShowShortAnswerModal: (_showShortAnswerModal: boolean) => void;
};

const QuestionEditorContext = createContext<QuestionEditorContextType>({
  questionElements: [],
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  setQuestionElements: (
    _questionElements: (prevElements: QuestionElement[]) => QuestionElement[],
  ): void => {},
  showShortAnswerModal: false,
  setShowShortAnswerModal: (_showShortAnswerModal: boolean): void => {},
});

export default QuestionEditorContext;
