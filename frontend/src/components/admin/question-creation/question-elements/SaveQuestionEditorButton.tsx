import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import update from "immutability-helper";
import { v4 as uuidv4 } from "uuid";

import AssessmentContext from "../../../../contexts/AssessmentContext";
import QuestionEditorContext from "../../../../contexts/QuestionEditorContext";
import type {
  ImageMetadataRequest,
  QuestionTextMetadata,
  TextMetadata,
} from "../../../../types/QuestionMetadataTypes";
import type { QuestionElement } from "../../../../types/QuestionTypes";
import {
  QuestionElementType,
  ResponseElementType,
} from "../../../../types/QuestionTypes";
import { updatedQuestionElement } from "../../../../utils/QuestionUtils";

interface SaveQuestionEditorButtonProps {
  closeQuestionEditor: () => void;
}

const SaveQuestionEditorButton = ({
  closeQuestionEditor,
}: SaveQuestionEditorButtonProps): React.ReactElement => {
  const questionError =
    "Please create a question to be associated with this response";
  const responseError =
    "Please add at least one response type for this question";
  const emptyElementError =
    "Please ensure this field is filled. If you do not need this item, please delete it.";

  const { questionIndex } = useParams<{ questionIndex?: string }>();
  const { questions, setQuestions } = useContext(AssessmentContext);
  const { questionElements, setQuestionElements, setShowEditorError } =
    useContext(QuestionEditorContext);

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

  const isQuestionPairError = (elementError: string) => {
    return elementError === questionError || elementError === responseError;
  };

  const validateNoQuestionPairErrors = () => {
    const questionPairs = questionElements.filter(
      (element) =>
        element.type === QuestionElementType.QUESTION_TEXT ||
        element.type in ResponseElementType,
    );
    for (let index = 0; index < questionPairs.length; index += 1) {
      const element = questionPairs[index];
      const isExistingError =
        element.error && !isQuestionPairError(element.error);
      if (!isExistingError) {
        if (element.type === QuestionElementType.QUESTION_TEXT) {
          const isLastElement = index === questionPairs.length - 1;
          if (
            isLastElement ||
            !(questionPairs[index + 1].type in ResponseElementType)
          ) {
            setElementError(element, responseError);
            return false;
          }
        }
        if (element.type in ResponseElementType) {
          const isFirstElement = index === 0;
          if (
            isFirstElement ||
            questionPairs[index - 1].type !== QuestionElementType.QUESTION_TEXT
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
      (element) =>
        (element.type === QuestionElementType.QUESTION_TEXT &&
          (element.data as QuestionTextMetadata).questionText === "") ||
        (element.type === QuestionElementType.TEXT &&
          (element.data as TextMetadata).text === "") ||
        (element.type === QuestionElementType.IMAGE &&
          (element.data as ImageMetadataRequest).previewUrl === undefined),
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

  const validateNoMissingQuestionError = () => {
    const emptyEditor =
      questionElements.filter(
        (element) => element.type === QuestionElementType.QUESTION_TEXT,
      ).length === 0;
    setShowEditorError(emptyEditor);
    return !emptyEditor;
  };

  const addQuestion = (newQuestionElements: QuestionElement[]) => {
    setQuestions((prevQuestions) => {
      return [
        ...prevQuestions,
        { id: uuidv4(), elements: newQuestionElements },
      ];
    });
  };

  const updateQuestion = (
    id: string,
    updatedQuestionElements: QuestionElement[],
  ) => {
    setQuestions((prevQuestions) => {
      const indexToUpdate = prevQuestions.findIndex(
        (question) => question.id === id,
      );
      return update(prevQuestions, {
        [indexToUpdate]: {
          $merge: {
            elements: updatedQuestionElements,
          },
        },
      });
    });
  };

  const handleSave = () => {
    if (
      validateNoMissingQuestionError() &&
      validateNoQuestionPairErrors() &&
      validateNoEmptyElementErrors() &&
      validateNoExistingErrors()
    ) {
      const validatedQuestionElements = questionElements.map((element) => {
        return {
          ...element,
          error: "",
        };
      });

      const editorQuestion = questions[Number(questionIndex) - 1];
      if (!editorQuestion) {
        addQuestion(validatedQuestionElements);
      } else {
        updateQuestion(editorQuestion.id, validatedQuestionElements);
      }
      closeQuestionEditor();
    }
  };
  return (
    <Button minWidth={0} onClick={handleSave} variant="primary">
      Save
    </Button>
  );
};

export default SaveQuestionEditorButton;
