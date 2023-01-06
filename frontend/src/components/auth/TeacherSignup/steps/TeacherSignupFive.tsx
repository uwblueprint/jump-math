import { VStack, Text } from "@chakra-ui/react";
import React from "react";

const TeacherSignupFive = (): React.ReactElement => {
  return (
    <VStack pt={28}>
      {/* TODO: remove extra heading in refactor */}
      <Text textStyle="header4" textAlign="center" pb={4}>
        Teacher Sign Up Confirmation
      </Text>
      <Text textStyle="subtitle2" textAlign="center">
        Please check your inbox for a confirmation email so that you are able to
        login
      </Text>
    </VStack>
  );
};

export default TeacherSignupFive;
