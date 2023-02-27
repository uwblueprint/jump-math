import React, { useContext } from "react";
import update from "immutability-helper";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";

interface QuestionTextElementProps {
  id: string;
  data: string;
}

const QuestionTextElement = ({
  id,
  data,
}: QuestionTextElementProps): React.ReactElement => {
  const { setQuestionElements } = useContext(QuestionEditorContext);
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
  );
};

export default QuestionTextElement;
