import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { VERIFY_PASSWORD_RESET } from "../../../APIClients/mutations/AuthMutations";
import { GET_USER_BY_EMAIL } from "../../../APIClients/queries/UserQueries";
import type { Role } from "../../../types/AuthTypes";
import LoadingState from "../../common/LoadingState";
import SetNewPassword from "../reset-password/SetNewPassword";

import EmailActionError from "./EmailActionError";

const ResetPasswordHandler = ({
  oobCode,
}: {
  oobCode: string;
}): React.ReactElement => {
  const [passwordResetVerified, setPasswordResetVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = React.useState<Role | null>(null);

  useQuery(GET_USER_BY_EMAIL, {
    variables: { email },
    onCompleted: (data) => {
      setRole(data.userByEmail.role);
    },
    skip: !!role || !email,
  });

  const [verifyPasswordReset] = useMutation<{ verifyPasswordReset: string }>(
    VERIFY_PASSWORD_RESET,
    {
      onCompleted(data: { verifyPasswordReset: string }) {
        setEmail(data.verifyPasswordReset);
        setPasswordResetVerified(true);
        setLoading(false);
      },
      onError() {
        setLoading(false);
      },
    },
  );

  useEffect(() => {
    verifyPasswordReset({ variables: { oobCode } });
  }, [oobCode, verifyPasswordReset]);

  return (
    <>
      {loading && <LoadingState fullPage />}
      {passwordResetVerified && role && (
        <SetNewPassword email={email} oobCode={oobCode} role={role} />
      )}
      {!loading && !passwordResetVerified && (
        <EmailActionError mode="resetPassword" />
      )}
    </>
  );
};
export default ResetPasswordHandler;
