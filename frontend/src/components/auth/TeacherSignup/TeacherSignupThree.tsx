import { VStack, Text } from "@chakra-ui/react";
import React from "react";
import NavigationButtons from "./NavigationButtons";
import { TeacherSignupProps } from "./types";

const TeacherSignupThree = ({
  setPage,
  register,
  errors,
}: TeacherSignupProps): React.ReactElement => {
  return (
    <VStack>
      <Text textStyle="subtitle2" textAlign="center">
        Enter your credentials below to get access to your classes
      </Text>

      <NavigationButtons
        onContinueClick={() => setPage(4)}
        onBackClick={() => setPage(2)}
      />
    </VStack>
  );
};

export default TeacherSignupThree;
