import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Flex } from "@chakra-ui/react";

import { HOME_PAGE } from "../../../constants/Routes";
import QuestionSidebar from "../../question-creation/QuestionSidebar";
import QuestionEditor from "../../question-creation/QuestionEditor";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { QuestionElement } from "../../../types/QuestionTypes";
import ShortAnswerElementModal from "../../question-creation/question-elements/ShortAnswerElementModal";

const QuestionPage = (): React.ReactElement => {
  const [questionElements, setQuestionElements] = React.useState<
    QuestionElement[]
  >([]);
  const [showShortAnswerModal, setShowShortAnswerModal] = React.useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <QuestionEditorContext.Provider
        value={{
          questionElements,
          setQuestionElements,
          showShortAnswerModal,
          setShowShortAnswerModal,
        }}
      >
        <Flex minHeight="100vh">
          <QuestionSidebar backPage={HOME_PAGE} />
          <QuestionEditor />
        </Flex>
        <ShortAnswerElementModal />
      </QuestionEditorContext.Provider>
    </DndProvider>
  );
};

export default QuestionPage;
