import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Flex } from "@chakra-ui/react";

import QuestionEditorContext from "../../contexts/QuestionEditorContext";
import { Question, QuestionElement } from "../../types/QuestionTypes";

import AddMultiOptionModal from "./question-elements/modals/multi-option/AddMultiOptionModal";
import AddShortAnswerModal from "./question-elements/modals/short-answer/AddShortAnswerModal";
import QuestionSidebar from "./QuestionSidebar";
import QuestionWorkspace from "./QuestionWorkspace";

interface QuestionEditorProps {
  setShowQuestionEditor: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuestionEditor = ({
  setShowQuestionEditor,
  setQuestions,
}: QuestionEditorProps): React.ReactElement => {
  const [questionElements, setQuestionElements] = React.useState<
    QuestionElement[]
  >([]);
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
    <DndProvider backend={HTML5Backend}>
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
          <QuestionSidebar
            setQuestions={setQuestions}
            setShowQuestionEditor={setShowQuestionEditor}
          />
          <QuestionWorkspace />
        </Flex>
        <AddShortAnswerModal />
        <AddMultiOptionModal />
      </QuestionEditorContext.Provider>
    </DndProvider>
  );
};

export default QuestionEditor;
