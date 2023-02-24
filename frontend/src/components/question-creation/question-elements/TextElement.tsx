import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

interface TextElementProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const TextElement = ({ setError }: TextElementProps): React.ReactElement => {
  const [text, setText] = useState("");

  if (text.length > 800) {
    setError("There is a limit of 800 characters in the text block.");
  } else {
    setError("");
  }

  return (
    <Textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
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
