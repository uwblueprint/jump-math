import React, { useState } from "react";
import { HStack, Input } from "@chakra-ui/react";
import { DeleteOutlineIcon, HamburgerMenuIcon } from "../../../assets/icons";

const TextElement = (): React.ReactElement => {
  const [text, setText] = useState("");

  return (
    <HStack>
      <HamburgerMenuIcon />
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="This is a text component."
      />
      <DeleteOutlineIcon />
    </HStack>
  );
};

export default TextElement;
