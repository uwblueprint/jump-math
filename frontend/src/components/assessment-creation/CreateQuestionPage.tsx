import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Flex } from "@chakra-ui/react";
import CreateQuestionSidebar from "./CreateQuestionSidebar";
import { HOME_PAGE } from "../../constants/Routes";
import Playground from "./Playground";

const CreateQuestionPage = (): React.ReactElement => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Flex margin="0 !important">
        <CreateQuestionSidebar pageToNavigate={HOME_PAGE} />
        <Playground />
      </Flex>
    </DndProvider>
  );
};

export default CreateQuestionPage;
