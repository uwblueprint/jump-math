import { Text, Button } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { LOGIN_PAGE } from "../../../constants/Routes";
import TeacherWrapper from "../../common/TeacherWrapper";

const TeacherSignupConfirmation = (): React.ReactElement => {
  const history = useHistory();

  const TeacherSignupConfirmationComponent = (
    <>
      <Text textStyle="subtitle2" textAlign="center" pb={8}>
        You have finalized your account credientials!
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

  return (
    <TeacherWrapper
      header="Teacher Sign Up Confirmation"
      paddingTop
      component={TeacherSignupConfirmationComponent}
    />
  );
};

export default TeacherSignupConfirmation;
