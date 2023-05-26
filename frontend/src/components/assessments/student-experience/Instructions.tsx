import React from "react";
import { Text } from "@chakra-ui/react";

const Instructions = (): React.ReactElement => {
  return (
    <Text color="grey.300" textStyle="subtitle1">
      All responses will be autosaved. Make sure you answer all the questions
      before submitting your test. You can also do the questions in ANY order
      meaning that can skip a question and come back to it later!
    </Text>
  );
};

export default Instructions;
