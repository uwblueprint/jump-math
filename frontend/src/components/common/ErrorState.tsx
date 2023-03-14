import React from "react";
import { Text, VStack } from "@chakra-ui/react";

import { AlertIcon } from "../../assets/icons";

const ErrorState = (): React.ReactElement => (
  <VStack spacing={6} textAlign="center">
    <AlertIcon />
    <Text color="blue.300" textStyle="paragraph">
      The data has not loaded properly. Please reload the page or contact Jump
      Math.
    </Text>
  </VStack>
);

export default ErrorState;
