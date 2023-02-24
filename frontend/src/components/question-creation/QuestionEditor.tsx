import React, { useContext } from "react";
import { Text, Box, VStack } from "@chakra-ui/react";
import { useDrop } from "react-dnd";

import WelcomeMessage from "./WelcomeMessage";
import HoverMessage from "./HoverMessage";
import TextElement from "./question-elements/TextElement";

import QuestionEditorContext from "../../contexts/QuestionEditorContext";
import {
  QuestionElement,
  QuestionElementType,
} from "../../types/QuestionTypes";
import { DragTypes } from "../../types/DragTypes";

const renderQuestionElement = (questionElement: QuestionElement) => {
  switch (questionElement.type) {
    case QuestionElementType.QUESTION:
      return <Text key={questionElement.id}>this is a question element.</Text>;
    case QuestionElementType.TEXT:
      return <TextElement key={questionElement.id} />;
    case QuestionElementType.IMAGE:
      return <Text key={questionElement.id}>this is an image element.</Text>;
    case QuestionElementType.MULTIPLE_CHOICE:
      return (
        <Text key={questionElement.id}>this is a multiple choice element.</Text>
      );
    case QuestionElementType.SHORT_ANSWER:
      return (
        <Text key={questionElement.id}>this is a short answer element.</Text>
      );
    case QuestionElementType.MULTI_SELECT:
      return (
        <Text key={questionElement.id}>this is a multi select element.</Text>
      );
    default:
      return null;
  }
};

const QuestionEditor = (): React.ReactElement => {
  const { questionElements } = useContext(QuestionEditorContext);
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
          questionElements.map((questionElement) =>
            renderQuestionElement(questionElement),
          )}
      </VStack>
    </Box>
  );
};

export default QuestionEditor;
