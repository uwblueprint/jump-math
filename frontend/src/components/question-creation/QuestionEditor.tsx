import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";

import AssessmentContext from "../../contexts/AssessmentContext";
import QuestionEditorContext from "../../contexts/QuestionEditorContext";
import type { QuestionElement } from "../../types/QuestionTypes";

import AddMultiOptionModal from "./question-elements/modals/multi-option/AddMultiOptionModal";
import AddShortAnswerModal from "./question-elements/modals/short-answer/AddShortAnswerModal";
import QuestionSidebar from "./QuestionSidebar";
import QuestionWorkspace from "./QuestionWorkspace";

const QuestionEditor = (): React.ReactElement => {
  const { editorQuestion } = useContext(AssessmentContext);
  const [questionElements, setQuestionElements] = React.useState<
    QuestionElement[]
  >(editorQuestion ? editorQuestion.elements : []);
  const [showAddShortAnswerModal, setShowAddShortAnswerModal] = React.useState(
    false,
  );
  const [
    showAddMultipleChoiceModal,
    setShowAddMultipleChoiceModal,
  ] = React.useState(false);
  const [showAddMultiSelectModal, setShowAddMultiSelectModal] = React.useState(
    false,
  );
  const [showEditorError, setShowEditorError] = React.useState(false);

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
        showEditorError,
        setShowEditorError,
      }}
    >
      <Flex minHeight="100vh">
        <QuestionSidebar />
        <QuestionWorkspace />
      </Flex>
      <AddShortAnswerModal />
      <AddMultiOptionModal />
    </QuestionEditorContext.Provider>
  );
};

export default QuestionEditor;
