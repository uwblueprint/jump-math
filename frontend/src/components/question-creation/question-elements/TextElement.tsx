import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import QuestionElement from "../QuestionElement";

const TextElement = (): React.ReactElement => {
  const [text, setText] = useState("");

  return (
    <QuestionElement>
      <Input
        maxLength={800}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="This is a text component which can be added for any additional information."
        variant="unstyled"
      />
    </QuestionElement>
  );
};

export default TextElement;
