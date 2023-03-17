import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { Box, VStack } from "@chakra-ui/react";

import QuestionEditorContext from "../../contexts/QuestionEditorContext";
import { DragTypes } from "../../types/DragTypes";

import HoverMessage from "./HoverMessage";
import QuestionElementItem from "./QuestionElementItem";
import WelcomeMessage from "./WelcomeMessage";

const QuestionWorkspace = (): React.ReactElement => {
  const { questionElements } = useContext(QuestionEditorContext);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DragTypes.QUESTION_SIDEBAR_ITEM,
    drop: () => ({ name: "Question Editor" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isHovering = canDrop && isOver;

  return (
    <Box ref={drop} flex="1" overflow="auto">
      <VStack align="left" color="grey.400" margin="3em 5em">
        {isHovering && <HoverMessage />}
        {!isHovering && !questionElements.length && <WelcomeMessage />}
        {!isHovering &&
          questionElements.length &&
          questionElements.map((questionElement, index) => (
            <QuestionElementItem
              key={questionElement.id}
              content={questionElement}
              index={index}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default QuestionWorkspace;
