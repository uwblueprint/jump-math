import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  VERIFY_EMAIL,
  VERIFY_PASSWORD_RESET,
} from "../../../APIClients/mutations/AuthMutations";
import { GET_USER_BY_EMAIL } from "../../../APIClients/queries/UserQueries";
import { Role } from "../../../types/AuthTypes";
import LoadingState from "../../common/LoadingState";
import NotFound from "../../pages/NotFound";
import ResetPassword from "../ResetPassword";
import AdminSignupConfirmation from "../SignupConfirmation/AdminSignupConfirmation";
import TeacherSignupConfirmation from "../SignupConfirmation/TeacherSignupConfirmation";
import FirebaseActionError from "./FirebaseActionError";

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
  const [role, setRole] = React.useState<Role | null>(null);

  useQuery(GET_USER_BY_EMAIL, {
    variables: { email },
    onCompleted: (data) => {
      setRole(data.userByEmail.role);
    },
    skip: !error || !mode || !oobCode,
  });

  const [verifyEmail] = useMutation<{ verifyEmail: string }>(VERIFY_EMAIL, {
    onCompleted(data: { verifyEmail: string }) {
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
      onCompleted(data: { verifyPasswordReset: string }) {
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
      {error && mode && <FirebaseActionError mode={mode} />}

      {emailVerified && role === "Teacher" && <TeacherSignupConfirmation />}
      {emailVerified && role === "Admin" && (
        <AdminSignupConfirmation email={email} />
      )}

      {passwordResetVerified && role && (
        <ResetPassword role={role} oobCode={oobCode} email={email} />
      )}
    </>
  );
};
export default FirebaseAction;
