import React, { useContext, useEffect, useState } from "react";
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
  const [error, setError] = useState(false);

  const { questionElements, setQuestionElements } = useContext(
    QuestionEditorContext,
  );

  useEffect(() => {
    setError(questionElements.every((element) => !element.error));
  }, [questionElements]);

  const questionError =
    "Please create a question to be associated with this response";
  const responseError =
    "Please add at least one response type for this question";
  const emptyError =
    "Please ensure all fields are filled. If you do not need this component, please delete this component.";

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

  const setEmptyElementErrors = () => {
    const emptyElement = questionElements.find(
      (element) => element.data === "",
    );
    if (emptyElement) {
      setElementError(emptyElement, emptyError);
    }
  };

  const setQuestionPairErrors = () => {
    let expectQuestion = true;
    let lastQuestionIndex = 0;
    /* eslint-disable-next-line no-plusplus */
    for (let i = 0; i < questionElements.length; ++i) {
      switch (questionElements[i].type) {
        case QuestionElementType.QUESTION: {
          if (!expectQuestion) {
            setElementError(questionElements[lastQuestionIndex], responseError);
          }
          setElementError(questionElements[lastQuestionIndex], ""); // TO CHANGE
          lastQuestionIndex = i;
          expectQuestion = false;
          break;
        }
        case QuestionElementType.SHORT_ANSWER: {
          if (expectQuestion) {
            setElementError(questionElements[i], questionError);
          }
          setElementError(questionElements[i], "");
          expectQuestion = true;
          break;
        }
        default: {
          break;
        }
      }
    }
    if (!expectQuestion) {
      setElementError(questionElements[lastQuestionIndex], responseError);
    }
    setElementError(questionElements[lastQuestionIndex], "");
  };

  const validateQuestionEditorContent = () => {
    setEmptyElementErrors();
    setQuestionPairErrors();
    return questionElements.every((element) => !element.error);
  };

  const handleSave = () => {
    validateQuestionEditorContent();
    if (error) {
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
