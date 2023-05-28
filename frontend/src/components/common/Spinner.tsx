import React from "react";
import type { SpinnerProps } from "@chakra-ui/react";
import { Spinner as ChakraSpinner } from "@chakra-ui/react";

ChakraSpinner.defaultProps = {
  emptyColor: "gray.200",
  speed: "0.65s",
  thickness: "4px",
};

const Spinner = (props: SpinnerProps): React.ReactElement => (
  <ChakraSpinner {...props} />
);

export default Spinner;
