import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";

import {
  RESET_PASSWORD_CODE,
  VERIFY_PASSWORD_RESET,
} from "../../APIClients/mutations/AuthMutations";
import { ADMIN_SIGNUP_IMAGE } from "../../assets/images";
import { ADMIN_LOGIN_PAGE } from "../../constants/Routes";
import LoadingState from "../common/info/LoadingState";

import EmailActionError from "./email-action/EmailActionError";
import PasswordForm from "./password/PasswordForm";
import AuthWrapper from "./AuthWrapper";

export type VerifyPasswordResetPayloadType = {
  verifyPasswordReset: {
    email: string;
  };
};

export type VerifyPasswordResetVariables = {
  oobCode: string;
};

type ResetPasswordCodePayloadType = {
  resetPasswordCode: {
    oobCode: string;
  };
};

type ResetPasswordCodeVariables = {
  email: string;
};

const AdminSignupConfirmation = ({
  email,
}: {
  email: string;
}): React.ReactElement => {
  const [step, setStep] = useState(1);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [oobCode, setOobCode] = React.useState<string>("");
  const [verified, setVerified] = React.useState(false);

  const [verifyPasswordReset] = useMutation<
    VerifyPasswordResetPayloadType,
    VerifyPasswordResetVariables
  >(VERIFY_PASSWORD_RESET, {
    onCompleted() {
      setVerified(true);
      setLoading(false);
    },
    onError() {
      setLoading(false);
    },
  });

  const [resetPasswordCode] = useMutation<
    ResetPasswordCodePayloadType,
    ResetPasswordCodeVariables
  >(RESET_PASSWORD_CODE, {
    onCompleted: async (data) => {
      setOobCode(data.resetPasswordCode.oobCode);
      await verifyPasswordReset({
        variables: { oobCode },
      });
    },
  });

  useEffect(() => {
    resetPasswordCode({ variables: { email } });
  }, [email, resetPasswordCode]);

  const subtitle =
    step === 1
      ? "Hey, please set a password to complete the sign up process 👋"
      : "You have finalized your account credentials!\nUse the link below to login";

  const setPasswordComponent = (
    <PasswordForm
      email={email}
      oobCode={oobCode}
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

  return (
    <>
      {loading && <LoadingState fullPage />}
      {verified ? (
        <AuthWrapper
          form={step === 1 ? setPasswordComponent : finalSignupConfirmation}
          image={ADMIN_SIGNUP_IMAGE}
          subtitle={subtitle}
          title="Admin Sign Up Confirmation"
        />
      ) : (
        <EmailActionError mode="resetPassword" />
      )}
    </>
  );
};

export default AdminSignupConfirmation;
