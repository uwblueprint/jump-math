import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Flex } from "@chakra-ui/react";

import QuestionEditorContext from "../../contexts/QuestionEditorContext";
import { QuestionElement } from "../../types/QuestionTypes";

import AddMultipleChoiceModal from "./question-elements/modals/multiple-choice/AddMultipleChoiceModal";
import AddShortAnswerModal from "./question-elements/modals/short-answer/AddShortAnswerModal";
import QuestionSidebar from "./QuestionSidebar";
import QuestionWorkspace from "./QuestionWorkspace";

interface QuestionEditorProps {
  setShowQuestionEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionEditor = ({
  setShowQuestionEditor,
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
        }}
      >
        <Flex minHeight="100vh">
          <QuestionSidebar setShowQuestionEditor={setShowQuestionEditor} />
          <QuestionWorkspace />
        </Flex>
        <AddShortAnswerModal />
        <AddMultipleChoiceModal />
      </QuestionEditorContext.Provider>
    </DndProvider>
  );
};

export default QuestionEditor;
