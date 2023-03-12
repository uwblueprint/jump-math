import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Flex } from "@chakra-ui/react";

import QuestionSidebar from "../../question-creation/QuestionSidebar";
import QuestionEditor from "../../question-creation/QuestionEditor";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { QuestionElement } from "../../../types/QuestionTypes";

import AddShortAnswerModal from "../../question-creation/question-elements/modals/short-answer/AddShortAnswerModal";
import AddMultipleChoiceModal from "../../question-creation/question-elements/modals/multiple-choice/AddMultipleChoiceModal";

const QuestionPage = (): React.ReactElement => {
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
          <QuestionSidebar />
          <QuestionEditor />
        </Flex>
        <AddShortAnswerModal />
        <AddMultipleChoiceModal />
      </QuestionEditorContext.Provider>
    </DndProvider>
  );
};

export default QuestionPage;
