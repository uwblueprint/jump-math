import React, { type ReactElement, useContext, useState } from "react";
import { Prompt, useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import confirmUnsavedChangesText from "../../../constants/GeneralConstants";
import AssessmentContext from "../../../contexts/AssessmentContext";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import type { QuestionElement } from "../../../types/QuestionTypes";
import useReloadPrompt from "../../common/navigation/useReloadPrompt";

import AddFractionModal from "./question-elements/modals/fraction/AddFractionModal";
import AddMultiOptionModal from "./question-elements/modals/multi-option/AddMultiOptionModal";
import AddShortAnswerModal from "./question-elements/modals/short-answer/AddShortAnswerModal";
import QuestionPreview from "./QuestionPreview";
import QuestionSidebar from "./QuestionSidebar";
import QuestionWorkspace from "./QuestionWorkspace";

const QuestionEditor = (): ReactElement => {
  const { questionIndex } = useParams<{ questionIndex?: string }>();
  const { questions } = useContext(AssessmentContext);
  const editorQuestion = questions[Number(questionIndex) - 1];

  const [questionElements, setQuestionElements] = useState<QuestionElement[]>(
    editorQuestion?.elements ?? [],
  );
  const [showAddShortAnswerModal, setShowAddShortAnswerModal] = useState(false);
  const [showAddMultipleChoiceModal, setShowAddMultipleChoiceModal] =
    useState(false);
  const [showAddMultiSelectModal, setShowAddMultiSelectModal] = useState(false);
  const [showAddFractionModal, setShowAddFractionModal] = useState(false);
  const [showEditorError, setShowEditorError] = useState(false);
  const [showQuestionPreview, setShowQuestionPreview] = useState(false);

  const isDirty = editorQuestion
    ? editorQuestion.elements !== questionElements
    : questionElements.length > 0;

  useReloadPrompt(isDirty);

  return (
    <QuestionEditorContext.Provider
      value={{
        questionElements,
        setQuestionElements,
        showAddShortAnswerModal,
        setShowAddShortAnswerModal,
        showAddMultipleChoiceModal,
        setShowAddMultipleChoiceModal,
        showAddMultiSelectModal,
        setShowAddMultiSelectModal,
        showAddFractionModal,
        setShowAddFractionModal,
        showEditorError,
        setShowEditorError,
        showQuestionPreview,
        setShowQuestionPreview,
      }}
    >
      <Prompt message={confirmUnsavedChangesText} when={isDirty} />
      {showQuestionPreview ? (
        <QuestionPreview />
      ) : (
        <>
          <Flex minHeight="100vh">
            <QuestionSidebar />
            <QuestionWorkspace />
          </Flex>
          <AddShortAnswerModal />
          <AddMultiOptionModal />
          <AddFractionModal />
        </>
      )}
    </QuestionEditorContext.Provider>
  );
};

export default QuestionEditor;
