import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import QuestionElement from "../QuestionElement";

const TextElement = (): React.ReactElement => {
  const [text, setText] = useState("");
  const error = "There is a limit of 800 characters in the text block.";

  return (
    <>
      <QuestionElement error={text.length > 800 ? error : ""}>
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
      </QuestionElement>
    </>
  );
};

export default TextElement;
