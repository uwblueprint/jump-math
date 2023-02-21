import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import QuestionElement from "../QuestionElement";

const TextElement = (): React.ReactElement => {
  const [text, setText] = useState("");

  return (
    <QuestionElement>
      <Textarea
        maxLength={800}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="This is a text component which can be added for any additional information."
        variant="unstyled"
        minH="unset"
        overflow="hidden"
        resize="none"
        minRows={1}
        as={ResizeTextarea}
      />
    </QuestionElement>
  );
};

export default TextElement;
