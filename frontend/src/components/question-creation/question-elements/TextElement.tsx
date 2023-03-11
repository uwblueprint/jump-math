import React, { useContext } from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import {
  updatedQuestionElement,
  exceedsMaxLength,
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
      size="text"
      value={data}
      onChange={(e) => updateTextElement(e.target.value)}
      placeholder="This is a text component which can be added for any additional information."
      maxLength={801}
      variant="unstyled"
      as={ResizeTextarea}
      paddingLeft="6"
    />
  );
};

export default TextElement;
