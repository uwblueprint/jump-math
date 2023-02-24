import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Flex } from "@chakra-ui/react";

import { HOME_PAGE } from "../../../constants/Routes";
import QuestionSidebar from "../../question-creation/QuestionSidebar";
import QuestionEditor from "../../question-creation/QuestionEditor";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { QuestionElement } from "../../../types/QuestionTypes";

const QuestionPage = (): React.ReactElement => {
  const [questionElements, setQuestionElements] = React.useState<
    QuestionElement[]
  >([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <QuestionEditorContext.Provider
        value={{ questionElements, setQuestionElements }}
      >
        <Flex minHeight="100vh">
          <QuestionSidebar backPage={HOME_PAGE} />
          <QuestionEditor />
        </Flex>
      </QuestionEditorContext.Provider>
    </DndProvider>
  );
};

export default QuestionPage;
