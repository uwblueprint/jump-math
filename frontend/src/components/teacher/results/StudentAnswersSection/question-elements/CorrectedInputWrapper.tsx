import React from "react";
import { Box } from "@chakra-ui/react";

type CorrectedInputWrapperProps = {
  isUnstyled?: boolean;
  isWrongAnswer: boolean;
  children: React.ReactNode;
} & React.ComponentProps<typeof Box>;

const CorrectedInputWrapper = ({
  isUnstyled,
  isWrongAnswer,
  children,
  ...styleOverrides
}: CorrectedInputWrapperProps) => {
  const styleProps = isUnstyled
    ? {
        borderColor: "transparent",
      }
    : {
        bg: isWrongAnswer ? "red.50" : "green.50",
        borderColor: isWrongAnswer ? "red.200" : "green.300",
      };

  return (
    <Box
      borderRadius={8}
      borderWidth={1}
      p={4}
      w={300}
      {...styleProps}
      {...styleOverrides}
    >
      {children}
    </Box>
  );
};

export default CorrectedInputWrapper;
