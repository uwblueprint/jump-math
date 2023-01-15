import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { VERIFY_PASSWORD_RESET } from "../../../APIClients/mutations/AuthMutations";
import { GET_USER_BY_EMAIL } from "../../../APIClients/queries/UserQueries";
import { Role } from "../../../types/AuthTypes";
import LoadingState from "../../common/LoadingState";
import SetNewPassword from "../ResetPassword/SetNewPassword";
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
    },
  );

  useEffect(() => {
    const handleResetPassword = async () => {
      await verifyPasswordReset({ variables: { oobCode } });
    };

    handleResetPassword();
  }, [oobCode]);

  return (
    <>
      {loading && <LoadingState fullPage />}
      {passwordResetVerified && role && (
        <SetNewPassword role={role} oobCode={oobCode} email={email} />
      )}
      {!loading && !passwordResetVerified && (
        <EmailActionError mode="resetPassword" />
      )}
    </>
  );
};
export default ResetPasswordHandler;
