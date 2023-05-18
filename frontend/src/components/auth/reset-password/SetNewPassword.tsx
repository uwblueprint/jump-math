import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import {
  ADMIN_SIGNUP_IMAGE,
  TEACHER_SIGNUP_IMAGE,
} from "../../../assets/images";
import {
  ADMIN_LOGIN_PAGE,
  TEACHER_LOGIN_PAGE,
} from "../../../constants/Routes";
import type { Role } from "../../../types/AuthTypes";
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
        form={
          <PasswordForm
            email={email}
            oobCode={oobCode}
            setStep={setStep}
            version="ResetPassword"
          />
        }
        image={image}
        subtitle="Please ensure that your new password is different than your old one"
        title="Set New Password"
      />
    );
  return (
    <AuthWrapper
      form={
        <Button
          onClick={() =>
            history.push(
              role === "Admin" ? ADMIN_LOGIN_PAGE : TEACHER_LOGIN_PAGE,
            )
          }
          variant="primary"
          width="100%"
        >
          Login
        </Button>
      }
      image={image}
      subtitle={`Your password has been successfully reset\nClick below to log in`}
      title="Password Reset Successful"
    />
  );
};

export default SetNewPassword;
