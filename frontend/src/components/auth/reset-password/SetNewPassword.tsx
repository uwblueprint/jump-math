import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import {
  ADMIN_SIGNUP_IMAGE,
  TEACHER_SIGNUP_IMAGE,
} from "../../../assets/images";
import { ADMIN_LOGIN, TEACHER_LOGIN } from "../../../constants/Routes";
import { Role } from "../../../types/AuthTypes";
import AuthWrapper from "../AuthWrapper";
import PasswordForm from "../password/PasswordForm";

const SetNewPassword = ({
  role,
  oobCode,
  email,
}: {
  role: Role;
  oobCode: string;
  email: string;
}): React.ReactElement => {
  const [step, setStep] = useState(1);
  const history = useHistory();
  const image = role === "Admin" ? ADMIN_SIGNUP_IMAGE : TEACHER_SIGNUP_IMAGE;

  if (step === 1)
    return (
      <AuthWrapper
        title="Set New Password"
        subtitle="Please ensure that your new password is different than your old one"
        image={image}
        form={
          <PasswordForm
            version="ResetPassword"
            email={email}
            oobCode={oobCode}
            setStep={setStep}
          />
        }
      />
    );
  return (
    <AuthWrapper
      title="Password Reset Successful"
      subtitle={`Your password has been successfully reset\nClick below to log in`}
      image={image}
      form={
        <Button
          variant="primary"
          width="100%"
          onClick={() =>
            history.push(role === "Admin" ? ADMIN_LOGIN : TEACHER_LOGIN)
          }
        >
          Login
        </Button>
      }
    />
  );
};

export default SetNewPassword;
