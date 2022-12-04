import { Button, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowBackOutlineIcon } from "../../common/icons";
import { TeacherSignupProps } from "./types";

const TeacherSignupTwo = ({
  setPage,
  register,
  errors,
}: TeacherSignupProps): React.ReactElement => {
  return (
    <VStack>
      <Text textStyle="subtitle2" textAlign="center">
        Enter your credentials below to get access to your classes
      </Text>

      <Button variant="primary" onClick={() => setPage(3)}>
        Continue
      </Button>
      <Button
        leftIcon={<ArrowBackOutlineIcon />}
        variant="tertiary"
        onClick={() => setPage(1)}
      >
        Back
      </Button>
    </VStack>
  );
};

export default TeacherSignupTwo;
