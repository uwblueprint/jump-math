import { VStack, Text, Button } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { LOGIN_PAGE } from "../../../../constants/Routes";

const PasswordResetSuccess = (): React.ReactElement => {
  const history = useHistory();

  return (
    <VStack>
      <Text textStyle="subtitle2" textAlign="center">
        Your password has been successfully reset
        <br />
        Click below to log in
      </Text>
      <Button
        variant="primary"
        width="100%"
        onClick={() => history.push(LOGIN_PAGE)} // TODO: Update to teacher login page
      >
        Login
      </Button>
    </VStack>
  );
};

export default PasswordResetSuccess;
