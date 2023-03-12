import { VStack, Text } from "@chakra-ui/react";
import React from "react";
import { AlertIcon } from "../../assets/icons";

const ErrorState = (): React.ReactElement => (
  <VStack spacing={6} textAlign="center">
    <AlertIcon />
    <Text textStyle="paragraph" color="blue.300">
      The data has not loaded properly. Please reload the page or contact Jump
      Math.
    </Text>
  </VStack>
);

export default ErrorState;
