import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  VERIFY_PASSWORD_RESET,
  RESET_PASSWORD_CODE,
} from "../../../APIClients/mutations/AuthMutations";
import { ADMIN_SIGNUP_IMAGE } from "../../../assets/images";
import { ADMIN_LOGIN } from "../../../constants/Routes";
import LoadingState from "../../common/LoadingState";
import AuthWrapper from "../AuthWrapper";
import EmailActionError from "../EmailAction/EmailActionError";
import PasswordForm from "../Password/PasswordForm";

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

  const [verifyPasswordReset] = useMutation<{ verifyPasswordReset: string }>(
    VERIFY_PASSWORD_RESET,
    {
      onCompleted(data: { verifyPasswordReset: string }) {
        if (data.verifyPasswordReset !== "") {
          setVerified(true);
          setLoading(false);
        }
      },
    },
  );

  const [resetPasswordCode] = useMutation<{ resetPasswordCode: string }>(
    RESET_PASSWORD_CODE,
    {
      onCompleted: async (data) => {
        if (data.resetPasswordCode !== "") {
          await verifyPasswordReset({
            variables: { oobCode: data.resetPasswordCode },
          });
          setOobCode(data.resetPasswordCode);
        }
      },
    },
  );

  useEffect(() => {
    const handleResetPassword = async () => {
      await resetPasswordCode({ variables: { email } });
    };

    handleResetPassword();
  }, [email]);

  const subtitle =
    step === 1
      ? "Hey, please set a password to complete the sign up process 👋"
      : "You have finalized your account credentials!\nUse the link below to login";

  const setPasswordComponent = (
    <PasswordForm
      version="AdminSignup"
      email={email}
      oobCode={oobCode}
      setStep={setStep}
    />
  );

  const finalSignupConfirmation = (
    <Button
      variant="primary"
      width="100%"
      onClick={() => history.push(ADMIN_LOGIN)}
    >
      Login
    </Button>
  );

  return (
    <>
      {loading && <LoadingState fullPage />}
      {verified ? (
        <AuthWrapper
          title="Admin Sign Up Confirmation"
          subtitle={subtitle}
          image={ADMIN_SIGNUP_IMAGE}
          form={step === 1 ? setPasswordComponent : finalSignupConfirmation}
        />
      ) : (
        <EmailActionError mode="resetPassword" />
      )}
    </>
  );
};

export default AdminSignupConfirmation;
