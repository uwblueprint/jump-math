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
    <Center height={fullPage ? "100vh" : "auto"}>
      <VStack spacing={6} textAlign="center">
        <Spinner
          color="blue.300"
          emptyColor="gray.200"
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
        <Text color="blue.300" textStyle="paragraph">
          {text ??
            "Please wait for the data to load. It will load momentarily."}
        </Text>
      </VStack>
    </Center>
  );
};

export default LoadingState;
