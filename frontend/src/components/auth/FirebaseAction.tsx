import { useMutation } from "@apollo/client";
import { Center, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  VERIFY_EMAIL,
  VERIFY_PASSWORD_RESET,
} from "../../APIClients/mutations/AuthMutations";
import LoadingState from "../common/LoadingState";
import NotFound from "../pages/NotFound";
import ResetPassword from "./ResetPassword";
import SignupConfirmation from "./SignupConfirmation";

const FirebaseAction = (): React.ReactElement => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");
  const oobCode: string = urlParams.get("oobCode") ?? "";

  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordResetVerified, setPasswordResetVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [verifyEmail] = useMutation<{ verifyEmail: string }>(VERIFY_EMAIL, {
    onCompleted(data) {
      if (data.verifyEmail !== "") {
        setEmail(data.verifyEmail);
        setEmailVerified(true);
      } else {
        setError(true);
      }
    },
    onError() {
      setError(true);
    },
  });
  const [verifyPasswordReset] = useMutation<{ verifyPasswordReset: string }>(
    VERIFY_PASSWORD_RESET,
    {
      onCompleted(data) {
        if (data.verifyPasswordReset !== "") {
          setEmail(data.verifyPasswordReset);
          setPasswordResetVerified(true);
        } else {
          setError(true);
        }
      },
      onError() {
        setError(true);
      },
    },
  );

  useEffect(() => {
    const handleVerifyEmail = async () => {
      await verifyEmail({ variables: { oobCode } });
      setLoading(false);
    };
    const handleResetPassword = async () => {
      await verifyPasswordReset({ variables: { oobCode } });
      setLoading(false);
    };

    switch (mode) {
      case "verifyEmail":
        handleVerifyEmail();
        break;
      case "resetPassword":
        handleResetPassword();
        break;
      default:
        setNotFound(true);
    }
  }, [mode, oobCode]);

  return (
    <>
      {notFound && <NotFound />}
      {!notFound && loading && <LoadingState fullPage />}
      {error && (
        <Center height="100vh" flexDirection="column" textAlign="center">
          <Text textStyle="header4">Try verifying your email again</Text>
          <Text textStyle="subtitle2">
            Your request to verify your email has expired or the link has
            already been used.
          </Text>
        </Center>
      )}
      {emailVerified && <SignupConfirmation email={email} oobCode={oobCode} />}
      {passwordResetVerified && (
        <ResetPassword oobCode={oobCode} email={email} />
      )}
    </>
  );
};
export default FirebaseAction;
