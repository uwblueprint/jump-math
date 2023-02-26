import React, { useContext } from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";

interface TextElementProps {
  id: string;
  data: string;
}

const TextElement = ({ id, data }: TextElementProps): React.ReactElement => {
  const { setQuestionElements } = useContext(QuestionEditorContext);
  const updateQuestionElement = (updatedText: string) => {
    setQuestionElements((prevElements) =>
      prevElements.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            data: updatedText,
            error:
              updatedText.length > 800
                ? "There is a limit of 800 characters in the text block."
                : "",
          };
        }
        return element;
      }),
    );
  };

  return (
    <Textarea
      value={data}
      onChange={(e) => updateQuestionElement(e.target.value)}
      placeholder="This is a text component which can be added for any additional information."
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

export default TextElement;
