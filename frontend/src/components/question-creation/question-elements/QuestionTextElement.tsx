import React, { useContext } from "react";
import ResizeTextarea from "react-textarea-autosize";
import { Flex, Text, Textarea } from "@chakra-ui/react";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { QuestionElementType } from "../../../types/QuestionTypes";
import {
  exceedsMaxLength,
  updatedQuestionElement,
} from "../../../utils/QuestionUtils";

interface QuestionTextElementProps {
  id: string;
  data: string;
}

const QuestionTextElement = ({
  id,
  data,
}: QuestionTextElementProps): React.ReactElement => {
  const { questionElements, setQuestionElements } = useContext(
    QuestionEditorContext,
  );

  const questionCount = questionElements.filter(
    (element) => element.type === QuestionElementType.QUESTION,
  ).length;
  const questionLetter = String.fromCharCode(
    "a".charCodeAt(0) +
      (questionElements
        .filter((element) => element.type === QuestionElementType.QUESTION)
        .findIndex((element) => element.id === id) %
        26),
  );

  const updateQuestionTextElement = (updatedQuestion: string) => {
    const error = exceedsMaxLength(updatedQuestion)
      ? "There is a limit of 800 characters in the question block."
      : "";
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedQuestion, prevElements, error);
    });
  };

  return (
    <Flex width="100%">
      {questionCount !== 1 && (
        <Text paddingRight="2" paddingTop="2" textStyle="subtitle2">
          {questionLetter}.
        </Text>
      )}
      <Textarea
        as={ResizeTextarea}
        maxLength={801}
        onChange={(e) => updateQuestionTextElement(e.target.value)}
        placeholder="This is a question component."
        size="question"
        value={data}
        variant="unstyled"
      />
    </Flex>
  );
};

export default QuestionTextElement;
