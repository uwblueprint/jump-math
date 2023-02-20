import React, { useState } from "react";
import { HStack, Input, Box } from "@chakra-ui/react";
import { DeleteOutlineIcon, HamburgerMenuIcon } from "../../../assets/icons";

const TextElement = (): React.ReactElement => {
  const [text, setText] = useState("");

  return (
    <HStack spacing="6">
      <Box color="grey.300">
        <HamburgerMenuIcon />
      </Box>
      <Input
        maxLength={800}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Welcome to the question creation module."
        variant="unstyled"
      />
      <Box color="grey.300">
        <DeleteOutlineIcon />
      </Box>
    </HStack>
  );
};

export default TextElement;
