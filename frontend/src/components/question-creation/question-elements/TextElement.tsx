import React, { useContext } from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

import QuestionEditorContext from "../../../contexts/QuestionEditorContext";

interface TextElementProps {
  id: string;
  data: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const TextElement = ({
  id,
  data,
  setError,
}: TextElementProps): React.ReactElement => {
  const { setQuestionElements } = useContext(QuestionEditorContext);

  const updateQuestionElement = (updatedText: string) => {
    setQuestionElements((prevElements) =>
      prevElements.map((element) => {
        if (element.id === id) {
          return { ...element, data: updatedText };
        }
        return element;
      }),
    );
  };

  if (data.length > 800) {
    setError("There is a limit of 800 characters in the text block.");
  } else {
    setError("");
  }

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
