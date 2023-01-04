import React from "react";
import { useHistory } from "react-router-dom";
import { Text, Button } from "@chakra-ui/react";
import { LOGIN_PAGE } from "../../../constants/Routes";

const FinalSignupConfirmation = (): React.ReactElement => {
  const history = useHistory();
  return (
    <>
      <Text textStyle="subtitle2" textAlign="center" pb={8}>
        You have finalized your account credentials!
        <br />
        Use the link below to login
      </Text>
      {/* TODO: Update to teacher login page */}
      <Button
        variant="primary"
        width="100%"
        onClick={() => history.push(LOGIN_PAGE)}
      >
        Login
      </Button>
    </>
  );
};

export default FinalSignupConfirmation;
