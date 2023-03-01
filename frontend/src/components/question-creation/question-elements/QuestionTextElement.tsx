import React, { useContext } from "react";
import { Flex, Text, Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { QuestionElementType } from "../../../types/QuestionTypes";
import { updatedQuestionElement } from "../../../utils/QuestionUtils";

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

  const updateQuestionElement = (updatedQuestion: string) => {
    const error =
      updatedQuestion.length > 800
        ? "There is a limit of 800 characters in the question block."
        : "";
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedQuestion, error, prevElements);
    });
  };

  return (
    <Flex width="100%">
      {questionCount !== 1 && (
        <Text paddingTop="2" paddingRight="2" textStyle="subtitle2">
          {questionLetter}.
        </Text>
      )}
      <Textarea
        size="question"
        value={data}
        onChange={(e) => updateQuestionElement(e.target.value)}
        placeholder="This is a question component."
        maxLength={801}
        variant="unstyled"
        as={ResizeTextarea}
      />
    </Flex>
  );
};

export default QuestionTextElement;
