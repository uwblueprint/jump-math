import React from "react";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

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
