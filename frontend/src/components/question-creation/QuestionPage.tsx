import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Flex } from "@chakra-ui/react";
import QuestionSidebar from "./QuestionSidebar";
import { HOME_PAGE } from "../../constants/Routes";
import QuestionEditor from "./QuestionEditor";

import QuestionElement from "./types/QuestionTypes";

const QuestionPage = (): React.ReactElement => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Flex margin="0 !important">
        <QuestionSidebar backPage={HOME_PAGE} />
        <QuestionEditor elements={[]} />
      </Flex>
    </DndProvider>
  );
};

export default QuestionPage;
