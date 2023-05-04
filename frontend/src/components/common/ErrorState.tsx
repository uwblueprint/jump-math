import React from "react";
import { Center, Text, VStack } from "@chakra-ui/react";

import { AlertIcon } from "../../assets/icons";

const ErrorState = ({
  fullPage,
}: {
  fullPage?: boolean;
}): React.ReactElement => (
  <Center height={fullPage ? "100vh" : "auto"}>
    <VStack spacing={6} textAlign="center">
      <AlertIcon />
      <Text color="blue.300" textStyle="paragraph">
        The data has not loaded properly. Please reload the page or contact Jump
        Math.
      </Text>
    </VStack>
  </Center>
);

export default ErrorState;
