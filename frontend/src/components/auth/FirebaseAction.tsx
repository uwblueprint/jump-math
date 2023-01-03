import { useMutation } from "@apollo/client";
import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import {
  VERIFY_EMAIL,
  VERIFY_PASSWORD_RESET,
} from "../../APIClients/mutations/AuthMutations";
import NotFound from "../pages/NotFound";
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
  const [executed, setExecuted] = React.useState(false);

  const [verifyEmail] = useMutation<{ verifyEmail: string }>(VERIFY_EMAIL, {
    onCompleted(data) {
      console.log(data);
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
        console.log(data);
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

  const handleVerifyEmail = async () => {
    await verifyEmail({
      variables: { oobCode: oobCode ?? "" },
    });
  };

  const handleResetPassword = async () => {
    await verifyPasswordReset({
      variables: { oobCode: oobCode ?? "" },
    });
  };

  switch (mode) {
    case "verifyEmail":
      if (emailVerified) return <SignupConfirmation email={email} />;
      if (!executed) handleVerifyEmail();
      return (
        <Center height="100vh">
          <Spinner />
        </Center>
      );
    case "resetPassword":
      if (passwordResetVerified)
        return <ResetPassword oobCode={oobCode ?? ""} email={email} />;
      if (!executed) handleResetPassword();
      return (
        <Center height="100vh">
          <Spinner />
        </Center>
      );
    default:
      return <NotFound />;
  }
};
export default FirebaseAction;
