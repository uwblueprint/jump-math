import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import {
  QuestionElement,
  QuestionElementType,
} from "../../../types/QuestionTypes";
import { updatedQuestionElement } from "../../../utils/QuestionUtils";

interface SaveQuestionEditorButtonProps {
  setShowQuestionEditor: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionElement[][]>>;
}

const SaveQuestionEditorButton = ({
  setShowQuestionEditor,
  setQuestions,
}: SaveQuestionEditorButtonProps): React.ReactElement => {
  const questionError =
    "Please create a question to be associated with this response";
  const responseError =
    "Please add at least one response type for this question";
  const emptyElementError =
    "Please ensure all fields are filled. If you do not need this component, please delete this component.";

  const {
    questionElements,
    setQuestionElements,
    setShowEditorError,
  } = useContext(QuestionEditorContext);

  const setElementError = (element: QuestionElement, errorText: string) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(
        element.id,
        element.data,
        prevElements,
        errorText,
      );
    });
  };

  const isResponseType = (elementType: QuestionElementType) => {
    return (
      elementType === QuestionElementType.MULTIPLE_CHOICE ||
      elementType === QuestionElementType.SHORT_ANSWER ||
      elementType === QuestionElementType.MULTI_SELECT
    );
  };

  const isQuestionPairError = (elementError: string) => {
    return elementError === questionError || elementError === responseError;
  };

  const validateNoQuestionPairErrors = () => {
    const questionPairs = questionElements.filter(
      (element) =>
        element.type === QuestionElementType.QUESTION ||
        isResponseType(element.type),
    );
    for (let index = 0; index < questionPairs.length; index += 1) {
      const element = questionPairs[index];
      const isExistingError =
        element.error && !isQuestionPairError(element.error);
      if (!isExistingError) {
        if (element.type === QuestionElementType.QUESTION) {
          const isLastElement = index === questionPairs.length - 1;
          if (isLastElement || !isResponseType(questionPairs[index + 1].type)) {
            setElementError(element, responseError);
            return false;
          }
        }
        if (isResponseType(element.type)) {
          const isFirstElement = index === 0;
          if (
            isFirstElement ||
            questionPairs[index - 1].type !== QuestionElementType.QUESTION
          ) {
            setElementError(element, questionError);
            return false;
          }
        }
        setElementError(element, "");
      }
    }
    return true;
  };

  const validateNoEmptyElementErrors = () => {
    const emptyElement = questionElements.find(
      (element) => element.data === "",
    );
    if (emptyElement) {
      setElementError(emptyElement, emptyElementError);
      return false;
    }
    return true;
  };

  const validateNoExistingErrors = () => {
    return questionElements.every(
      (element) =>
        !element.error ||
        isQuestionPairError(element.error) ||
        element.error === emptyElementError,
    );
  };

  const validateNoEmptyEditorError = () => {
    const emptyEditor = questionElements.length === 0;
    setShowEditorError(emptyEditor);
    return !emptyEditor;
  };

  const handleSave = () => {
    if (
      validateNoQuestionPairErrors() &&
      validateNoEmptyElementErrors() &&
      validateNoExistingErrors() &&
      validateNoEmptyEditorError()
    ) {
      setQuestions((prevQuestions) => {
        return [...prevQuestions, questionElements];
      });
      setShowQuestionEditor(false);
    }
  };
  return (
    <Button minWidth={0} onClick={handleSave} variant="primary">
      Save
    </Button>
  );
};

export default SaveQuestionEditorButton;
