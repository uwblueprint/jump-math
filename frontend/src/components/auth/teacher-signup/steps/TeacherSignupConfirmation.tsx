import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";
import { TEACHER_LOGIN } from "../../../../constants/Routes";
import AuthWrapper from "../../AuthWrapper";

const TeacherSignupConfirmation = (): React.ReactElement => {
  const history = useHistory();
  return (
    <AuthWrapper
      form={
        <Button
          onClick={() => history.push(TEACHER_LOGIN)}
          variant="primary"
          width="100%"
        >
          Login
        </Button>
      }
      image={TEACHER_SIGNUP_IMAGE}
      subtitle={`You have finalized your account credentials\nUse the link below to login`}
      title="Teacher Sign Up Confirmation"
    />
  );
};

export default TeacherSignupConfirmation;
