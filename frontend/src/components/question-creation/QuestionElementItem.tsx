import React, { useState, useContext } from "react";
import { Button, IconButton, Text, HStack, Box } from "@chakra-ui/react";
import { DeleteOutlineIcon, HamburgerMenuIcon } from "../../assets/icons";
import {
  QuestionElement,
  QuestionElementType,
} from "../../types/QuestionTypes";
import TextElement from "./question-elements/TextElement";
import QuestionEditorContext from "../../contexts/QuestionEditorContext";

export interface QuestionElementItemProps {
  content: QuestionElement;
}

const renderQuestionContent = (
  content: QuestionElement,
  setError: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { id, type, data } = content;
  switch (type) {
    case QuestionElementType.QUESTION:
      return <Text key={id}>this is a question element.</Text>;
    case QuestionElementType.TEXT:
      return <TextElement key={id} id={id} data={data} setError={setError} />;
    case QuestionElementType.IMAGE:
      return <Text key={id}>this is an image element.</Text>;
    case QuestionElementType.MULTIPLE_CHOICE:
      return <Text key={id}>this is a multiple choice element.</Text>;
    case QuestionElementType.SHORT_ANSWER:
      return <Text key={id}>this is a short answer element.</Text>;
    case QuestionElementType.MULTI_SELECT:
      return <Text key={id}>this is a multi select element.</Text>;
    default:
      return null;
  }
};

const QuestionElementItem = ({
  content,
}: QuestionElementItemProps): React.ReactElement => {
  const { id, type, data } = content;
  const [error, setError] = useState("");
  const { setQuestionElements } = useContext(QuestionEditorContext);

  const removeQuestionElement = () => {
    setQuestionElements((prevElements) =>
      prevElements.filter((item) => item.id !== id),
    );
  };

  return (
    <>
      <HStack spacing="6" fontSize="24px" alignItems="flex-start">
        <Box color="grey.300">
          <HamburgerMenuIcon />
        </Box>
        {renderQuestionContent(content, setError)}
        <Button
          onClick={removeQuestionElement}
          as={IconButton}
          icon={<DeleteOutlineIcon />}
          color="grey.300"
          fontSize="24px"
        />
      </HStack>
      {error && <Text color="red.200">{error}</Text>}
    </>
  );
};

export default QuestionElementItem;
