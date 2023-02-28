import React, { useContext } from "react";
import update from "immutability-helper";
import { Flex, Text, Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { QuestionElementType } from "../../../types/QuestionTypes";

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
    setQuestionElements((prevElements) => {
      const indexToUpdate = prevElements.findIndex(
        (element) => element.id === id,
      );
      return update(prevElements, {
        [indexToUpdate]: {
          $merge: {
            data: updatedQuestion,
            error:
              updatedQuestion.length > 800
                ? "There is a limit of 800 characters in the question block."
                : "",
          },
        },
      });
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
        sx={{ fontSize: "20px", fontWeight: "500", lineHeight: "26px" }}
        value={data}
        onChange={(e) => updateQuestionElement(e.target.value)}
        placeholder="This is a question component."
        maxLength={801}
        variant="unstyled"
        minH="unset"
        overflow="hidden"
        resize="none"
        minRows={1}
        as={ResizeTextarea}
      />
    </Flex>
  );
};

export default QuestionTextElement;
