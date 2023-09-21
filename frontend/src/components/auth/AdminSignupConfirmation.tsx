import type { ReactElement } from "react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/react";

import { VERIFY_PASSWORD_RESET_CODE } from "../../APIClients/queries/AuthQueries";
import { ADMIN_SIGNUP_IMAGE } from "../../assets/images";
import { ADMIN_LOGIN_PAGE } from "../../constants/Routes";
import LoadingState from "../common/info/LoadingState";

import EmailActionError from "./email-action/EmailActionError";
import PasswordForm from "./password/PasswordForm";
import AuthWrapper from "./AuthWrapper";

type AdminSignupConfirmationProps = {
  email: string;
  resetPasswordOobCode: string;
};

const AdminSignupConfirmation = ({
  email,
  resetPasswordOobCode,
}: AdminSignupConfirmationProps): ReactElement => {
  const [step, setStep] = useState(1);
  const history = useHistory();

  const { loading, error } = useQuery<{
    verifyPasswordResetCode: string;
  }>(VERIFY_PASSWORD_RESET_CODE, {
    variables: { oobCode: resetPasswordOobCode },
  });

  const subtitle =
    step === 1
      ? "Hey, please set a password to complete the sign up process 👋"
      : "You have finalized your account credentials!\nUse the link below to login";

  const setPasswordComponent = (
    <PasswordForm
      email={email}
      oobCode={resetPasswordOobCode}
      setStep={setStep}
      version="AdminSignup"
    />
  );

  const finalSignupConfirmation = (
    <Button
      onClick={() => history.push(ADMIN_LOGIN_PAGE)}
      variant="primary"
      width="100%"
    >
      Login
    </Button>
  );

  if (loading)
    return (
      <LoadingState
        fullPage
        text="Please wait while we check your account..."
      />
    );
  if (error) return <EmailActionError mode="resetPassword" />;

  return (
    <AuthWrapper
      form={step === 1 ? setPasswordComponent : finalSignupConfirmation}
      image={ADMIN_SIGNUP_IMAGE}
      subtitle={subtitle}
      title="Admin Sign Up Confirmation"
    />
  );
};

export default AdminSignupConfirmation;
