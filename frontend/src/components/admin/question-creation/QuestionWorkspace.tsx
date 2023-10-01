import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { Box, Divider, VStack } from "@chakra-ui/react";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { DragTypes } from "../../../types/DragTypes";
import ErrorToast from "../../common/info/toasts/ErrorToast";

import QuestionElementItem from "./QuestionElementItem";
import WelcomeMessage from "./WelcomeMessage";

const QuestionWorkspace = (): React.ReactElement => {
  const { questionElements, showEditorError, editorError } = useContext(
    QuestionEditorContext,
  );
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
      <VStack align="left" margin="3em 5em">
        {showEditorError && (
          <Box paddingBottom="4">
            <ErrorToast errorMessage={editorError} />
          </Box>
        )}
        {!isHovering && !questionElements.length && <WelcomeMessage />}
        {questionElements.length &&
          questionElements.map((questionElement, index) => (
            <QuestionElementItem
              key={questionElement.id}
              content={questionElement}
              index={index}
            />
          ))}
        {isHovering && (
          <Box padding="2">
            <Divider
              backgroundColor="blue.300"
              borderColor="blue.300"
              borderWidth="2px"
              boxShadow="0px 4px 4px rgba(0, 67, 121, 0.3)"
              opacity="100%"
              orientation="horizontal"
            />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default QuestionWorkspace;
