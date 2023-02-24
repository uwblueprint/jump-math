import React, { useContext } from "react";
import { Text, Box, VStack } from "@chakra-ui/react";
import { useDrop } from "react-dnd";

import WelcomeMessage from "./WelcomeMessage";
import HoverMessage from "./HoverMessage";
import TextElement from "./question-elements/TextElement";

import QuestionEditorContext from "../../contexts/QuestionEditorContext";
import { QuestionElementType } from "../../types/QuestionTypes";
import { DragTypes } from "../../types/DragTypes";

const renderQuestionElement = (
  questionElement: QuestionElementType,
  index: number,
) => {
  switch (questionElement) {
    case QuestionElementType.QUESTION:
      return <Text key={index}>this is a question element.</Text>;
    case QuestionElementType.TEXT:
      return <TextElement key={index} />;
    case QuestionElementType.IMAGE:
      return <Text key={index}>this is an image element.</Text>;
    case QuestionElementType.MULTIPLE_CHOICE:
      return <Text key={index}>this is a multiple choice element.</Text>;
    case QuestionElementType.SHORT_ANSWER:
      return <Text key={index}>this is a short answer element.</Text>;
    case QuestionElementType.MULTI_SELECT:
      return <Text key={index}>this is a multi select element.</Text>;
    default:
      return null;
  }
};

const QuestionEditor = (): React.ReactElement => {
  const { questionElements, setQuestionElements } = useContext(
    QuestionEditorContext,
  );
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DragTypes.QUESTION_ELEMENT,
    drop: () => ({ name: "Question Editor" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isHovering = canDrop && isOver;

  return (
    <Box flex="1" ref={drop} overflow="auto">
      <VStack margin="3em 5em" align="left" color="grey.400">
        {isHovering && <HoverMessage />}
        {!isHovering && !questionElements.length && <WelcomeMessage />}
        {!isHovering &&
          questionElements.length &&
          questionElements.map((questionElement, index) =>
            renderQuestionElement(questionElement.type, index),
          )}
      </VStack>
    </Box>
  );
};

export default QuestionEditor;
