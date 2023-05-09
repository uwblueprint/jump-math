import React from "react";
import { Input } from "@chakra-ui/react";

const ShortAnswer = (): React.ReactElement => {
  return (
    <Input
      borderColor="grey.300"
      borderRadius="8px"
      focusBorderColor="grey.300"
      placeholder="Write your answer here"
      variant="outline"
      width="34%"
    />
  );
};

export default ShortAnswer;
