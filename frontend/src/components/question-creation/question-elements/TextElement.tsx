import React, { useContext } from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { updatedQuestionElement } from "../../../utils/QuestionUtils";

interface TextElementProps {
  id: string;
  data: string;
}

const TextElement = ({ id, data }: TextElementProps): React.ReactElement => {
  const { setQuestionElements } = useContext(QuestionEditorContext);
  const error = "There is a limit of 800 characters in the text block.";
  const updateTextElement = (updatedText: string) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedText, error, prevElements);
    });
  };

  return (
    <Textarea
      sx={{ fontSize: "18px", fontWeight: "400", lineHeight: "23px" }}
      value={data}
      onChange={(e) => updateTextElement(e.target.value)}
      placeholder="This is a text component which can be added for any additional information."
      maxLength={801}
      variant="unstyled"
      minH="unset"
      overflow="hidden"
      resize="none"
      minRows={1}
      as={ResizeTextarea}
      paddingLeft="6"
    />
  );
};

export default TextElement;
