import React, { useContext } from "react";
import ResizeTextarea from "react-textarea-autosize";
import { Textarea } from "@chakra-ui/react";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import {
  exceedsMaxLength,
  updatedQuestionElement,
} from "../../../utils/QuestionUtils";

interface TextElementProps {
  id: string;
  data: string;
}

const TextElement = ({ id, data }: TextElementProps): React.ReactElement => {
  const { setQuestionElements } = useContext(QuestionEditorContext);

  const updateTextElement = (updatedText: string) => {
    const error = exceedsMaxLength(updatedText)
      ? "There is a limit of 800 characters in the text block."
      : "";
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedText, prevElements, error);
    });
  };

  return (
    <Textarea
      as={ResizeTextarea}
      maxLength={801}
      onChange={(e) => updateTextElement(e.target.value)}
      paddingLeft="6"
      placeholder="This is a text component which can be added for any additional information."
      size="text"
      value={data}
      variant="unstyled"
    />
  );
};

export default TextElement;
