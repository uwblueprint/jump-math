import React from "react";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

const LoadingState = ({
  fullPage,
  text,
}: {
  fullPage?: boolean;
  text?: string;
}): React.ReactElement => {
  return (
    <Center flex="1" height={fullPage ? "100vh" : "auto"}>
      <VStack spacing={6} textAlign="center">
        <Spinner size="xl" />
        <Text color="blue.300" textStyle="paragraph">
          {text ??
            "Please wait for the data to load. It will load momentarily."}
        </Text>
      </VStack>
    </Center>
  );
};

export default LoadingState;
