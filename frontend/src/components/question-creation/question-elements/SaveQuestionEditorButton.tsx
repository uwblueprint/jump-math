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
  const emptyEditorError =
    "Please add at least one element to the editor before saving";
  const emptyElementError =
    "Please ensure all fields are filled. If you do not need this component, please delete this component.";

  const { questionElements, setQuestionElements } = useContext(
    QuestionEditorContext,
  );

  const setElementError = (
    questionElement: QuestionElement,
    errorText: string,
  ) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(
        questionElement.id,
        questionElement.data,
        prevElements,
        errorText,
      );
    });
  };

  const validateQuestionPairs = () => {
    let valid = true;
    const questionPairs = questionElements.filter(
      (element) =>
        element.type === QuestionElementType.QUESTION ||
        element.type === QuestionElementType.MULTIPLE_CHOICE ||
        element.type === QuestionElementType.SHORT_ANSWER ||
        element.type === QuestionElementType.MULTI_SELECT,
    );
    questionPairs.forEach((element, index) => {
      if (
        !element.error ||
        element.error === questionError ||
        element.error === responseError
      ) {
        if (element.type === QuestionElementType.QUESTION) {
          if (
            index === questionPairs.length - 1 ||
            questionPairs[index + 1].type === QuestionElementType.QUESTION
          ) {
            setElementError(element, responseError);
            valid = false;
          } else {
            setElementError(element, "");
          }
        } else {
          /* eslint-disable-next-line no-lonely-if */
          if (
            index === 0 ||
            questionPairs[index - 1].type !== QuestionElementType.QUESTION
          ) {
            setElementError(element, questionError);
            valid = false;
          } else {
            setElementError(element, "");
          }
        }
      }
    });
    return valid;
  };

  const validateNoEmptyElements = () => {
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
    return questionElements.every((element) => !element.error);
  };

  const validateQuestionEditorContent = () => {
    return (
      validateQuestionPairs() &&
      validateNoEmptyElements() &&
      validateNoExistingErrors()
    );
  };

  const handleSave = () => {
    if (validateQuestionEditorContent()) {
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
