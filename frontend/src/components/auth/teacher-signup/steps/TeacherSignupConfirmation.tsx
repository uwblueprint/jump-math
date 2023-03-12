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
      title="Teacher Sign Up Confirmation"
      subtitle={`You have finalized your account credentials\nUse the link below to login`}
      image={TEACHER_SIGNUP_IMAGE}
      form={
        <Button
          variant="primary"
          width="100%"
          onClick={() => history.push(TEACHER_LOGIN)}
        >
          Login
        </Button>
      }
    />
  );
};

export default TeacherSignupConfirmation;
