import React from "react";
import { Text, Box, VStack } from "@chakra-ui/react";
import { useDrop } from "react-dnd";

import WelcomeMessage from "./WelcomeMessage";
import HoverMessage from "./HoverMessage";
import TextElement from "./question-elements/TextElement";

import QuestionElement from "./types/QuestionTypes";
import { DragTypes } from "./types/DragTypes";

interface QuestionEditorProps {
  questionElements: QuestionElement[];
}

const renderQuestionElement = (
  questionElement: QuestionElement,
  index: number,
) => {
  switch (questionElement) {
    case QuestionElement.QUESTION:
      return <Text key={index}>this is a question element.</Text>;
    case QuestionElement.TEXT:
      return <TextElement key={index} />;
    case QuestionElement.IMAGE:
      return <Text key={index}>this is an image element.</Text>;
    case QuestionElement.MULTIPLE_CHOICE:
      return <Text key={index}>this is a multiple choice element.</Text>;
    case QuestionElement.SHORT_ANSWER:
      return <Text key={index}>this is a short answer element.</Text>;
    case QuestionElement.MULTI_SELECT:
      return <Text key={index}>this is a multi select element.</Text>;
    default:
      return null;
  }
};

const QuestionEditor = ({
  questionElements,
}: QuestionEditorProps): React.ReactElement => {
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
    <div ref={drop}>
      <Box flex="1">
        <VStack margin="3em 5em" align="left" color="grey.400">
          {isHovering && <HoverMessage />}
          {!isHovering && !questionElements.length && <WelcomeMessage />}
          {!isHovering &&
            questionElements.length &&
            questionElements.map((questionElement, index) =>
              renderQuestionElement(questionElement, index),
            )}
        </VStack>
      </Box>
    </div>
  );
};

export default QuestionEditor;
