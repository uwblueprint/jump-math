import { useMutation } from "@apollo/client";
import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import {
  VERIFY_EMAIL,
  VERIFY_PASSWORD_RESET,
} from "../../APIClients/mutations/AuthMutations";
import ResetPassword from "./ResetPassword";
import SignupConfirmation from "./SignupConfirmation";

const FirebaseAction = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");
  const oobCode = urlParams.get("oobCode");

  const [emailVerified, setEmailVerified] = React.useState(false);
  const [passwordResetVerified, setPasswordResetVerified] = React.useState(
    false,
  );
  const [email, setEmail] = React.useState("");

  const [verifyEmail] = useMutation<{ verifyEmail: boolean }>(VERIFY_EMAIL);
  const [verifyPasswordReset] = useMutation<{ verifyPasswordReset: string }>(
    VERIFY_PASSWORD_RESET,
  );

  const handleVerifyEmail = async () => {
    const verifyEmailResponse = await verifyEmail({
      variables: { oobCode: oobCode ?? "" },
    });
    if (verifyEmailResponse) {
      setEmailVerified(true);
    }
  };

  const handleResetPassword = async () => {
    const confirmPasswordResetResponse = await verifyPasswordReset({
      variables: { oobCode: oobCode ?? "" },
    });
    if (confirmPasswordResetResponse) {
      setEmail(confirmPasswordResetResponse.data?.verifyPasswordReset ?? "");
      setPasswordResetVerified(true);
    }
  };

  switch (mode) {
    case "verifyEmail":
      handleVerifyEmail();
      return emailVerified ? (
        <SignupConfirmation />
      ) : (
        <Center>
          <Spinner />
        </Center>
      );
    case "resetPassword":
      handleResetPassword();
      return passwordResetVerified ? (
        <ResetPassword oobCode={oobCode ?? ""} email={email} />
      ) : (
        <Center>
          <Spinner />
        </Center>
      );
    default:
      return <></>;
  }
};
export default FirebaseAction;
