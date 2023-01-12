import { VStack, Text, Spinner, Center } from "@chakra-ui/react";
import React from "react";

const LoadingState = ({
  fullPage,
}: {
  fullPage?: boolean;
}): React.ReactElement => {
  return (
    <Center height={fullPage ? "100vh" : "auto"}>
      <VStack spacing={6} textAlign="center">
        <Spinner
          color="blue.300"
          size="xl"
          thickness="4px"
          emptyColor="gray.200"
          speed="0.65s"
        />
        <Text textStyle="paragraph" color="blue.300">
          Please wait for the data to load. It will load momentarily.
        </Text>
      </VStack>
    </Center>
  );
};

export default LoadingState;
