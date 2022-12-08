import { Button, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { LOGIN_PAGE } from "../../../constants/Routes";
import { ArrowBackOutlineIcon } from "../../common/icons";
import { TeacherSignupProps } from "./types";

const TeacherSignupOne = ({
  setPage,
  register,
  errors,
}: TeacherSignupProps): React.ReactElement => {
  const history = useHistory();
  return (
    <VStack>
      <Text textStyle="subtitle2" textAlign="center">
        Enter your credentials below to get access to your classes
      </Text>

      <Button variant="primary" onClick={() => setPage(2)}>
        Continue
      </Button>
      <Button
        leftIcon={<ArrowBackOutlineIcon />}
        variant="tertiary"
        onClick={() => history.push(LOGIN_PAGE)}
      >
        Back to login page
      </Button>
    </VStack>
  );
};

export default TeacherSignupOne;
