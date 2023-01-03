import { useMutation } from "@apollo/client";
import React from "react";
import {
  VERIFY_EMAIL,
  VERIFY_PASSWORD_RESET,
} from "../../APIClients/mutations/AuthMutations";
import LoadingState from "../common/LoadingState";
import NotFound from "../pages/NotFound";
import ResetPassword from "./ResetPassword";
import SignupConfirmation from "./SignupConfirmation";

const FirebaseAction = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");
  const oobCode: string = urlParams.get("oobCode") ?? "";

  const [emailVerified, setEmailVerified] = React.useState(false);
  const [passwordResetVerified, setPasswordResetVerified] = React.useState(
    false,
  );
  const [email, setEmail] = React.useState("");
  const [executed, setExecuted] = React.useState(false);

  const [verifyEmail] = useMutation<{ verifyEmail: string }>(VERIFY_EMAIL, {
    onCompleted(data) {
      setExecuted(true);
      if (data.verifyEmail !== "") {
        setEmail(data.verifyEmail);
        setEmailVerified(true);
      }
    },
    onError(error) {
      console.log(error);
      setExecuted(true);
    },
  });
  const [verifyPasswordReset] = useMutation<{ verifyPasswordReset: string }>(
    VERIFY_PASSWORD_RESET,
    {
      onCompleted(data) {
        setExecuted(true);
        if (data.verifyPasswordReset !== "") {
          setEmail(data.verifyPasswordReset);
          setPasswordResetVerified(true);
        }
      },
      onError(error) {
        console.log(error);
        setExecuted(true);
      },
    },
  );

  const handleVerifyEmail = async () => verifyEmail({ variables: { oobCode } });
  const handleResetPassword = async () =>
    verifyPasswordReset({ variables: { oobCode } });

  switch (mode) {
    case "verifyEmail":
      if (emailVerified) return <SignupConfirmation email={email} />;
      if (!executed) handleVerifyEmail();
      return <LoadingState fullPage />;
    case "resetPassword":
      if (passwordResetVerified)
        return <ResetPassword oobCode={oobCode ?? ""} email={email} />;
      if (!executed) handleResetPassword();
      return <LoadingState fullPage />;
    default:
      return <NotFound />;
  }
};
export default FirebaseAction;
