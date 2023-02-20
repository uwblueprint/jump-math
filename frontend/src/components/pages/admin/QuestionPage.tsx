import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Flex } from "@chakra-ui/react";

import { HOME_PAGE } from "../../../constants/Routes";
import QuestionSidebar from "../../question-creation/QuestionSidebar";
import QuestionEditor from "../../question-creation/QuestionEditor";

import { QuestionElement } from "../../../types/QuestionTypes";

const QuestionPage = (): React.ReactElement => {
  const [questionElements, setQuestionElements] = React.useState<
    QuestionElement[]
  >([]);

  const addQuestionElement = (newQuestionElement: QuestionElement) => {
    setQuestionElements((prevQuestionElements) => [
      ...prevQuestionElements,
      newQuestionElement,
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Flex margin="0 !important">
        <QuestionSidebar
          addQuestionElement={addQuestionElement}
          backPage={HOME_PAGE}
        />
        <QuestionEditor questionElements={questionElements} />
      </Flex>
    </DndProvider>
  );
};

export default QuestionPage;
