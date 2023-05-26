import React from "react";
import { Box } from "@chakra-ui/react";

type CorrectedInputWrapperProps = {
  isWrongAnswer: boolean;
  children: React.ReactNode;
} & React.ComponentProps<typeof Box>;

const CorrectedInputWrapper = ({
  isWrongAnswer,
  children,
  ...styleProps
}: CorrectedInputWrapperProps) => (
  <Box
    bg={isWrongAnswer ? "red.50" : "green.50"}
    borderColor={isWrongAnswer ? "red.200" : "green.300"}
    borderRadius={8}
    borderWidth={1}
    p={4}
    w={300}
    {...styleProps}
  >
    {children}
  </Box>
);

export default CorrectedInputWrapper;
