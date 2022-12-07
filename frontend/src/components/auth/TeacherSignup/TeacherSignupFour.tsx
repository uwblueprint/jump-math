import { Button, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowBackOutlineIcon } from "../../common/icons";
import { TeacherSignupProps } from "./types";

const TeacherSignupFour = ({
  setPage,
  register,
  handleSubmit,
  errors,
}: TeacherSignupProps): React.ReactElement => {
  // TODO: handle submission of data to the backend
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <VStack>
      <Text textStyle="subtitle2" textAlign="center">
        Please set a secure password for your account
      </Text>

      <Button variant="primary" onClick={onSubmit}>
        Continue
      </Button>
      <Button
        leftIcon={<ArrowBackOutlineIcon />}
        variant="tertiary"
        onClick={() => setPage(3)}
      >
        Back
      </Button>
    </VStack>
  );
};

export default TeacherSignupFour;
