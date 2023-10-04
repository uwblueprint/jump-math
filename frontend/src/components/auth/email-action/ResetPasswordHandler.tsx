import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { VERIFY_PASSWORD_RESET_CODE } from "../../../APIClients/queries/AuthQueries";
import { GET_USER_BY_EMAIL } from "../../../APIClients/queries/UserQueries";
import type { Role } from "../../../types/AuthTypes";
import LoadingState from "../../common/info/LoadingState";
import SetNewPassword from "../reset-password/SetNewPassword";

import EmailActionError from "./EmailActionError";

const ResetPasswordHandler = ({
  oobCode,
}: {
  oobCode: string;
}): React.ReactElement => {
  const [passwordResetVerified, setPasswordResetVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = React.useState<Role | null>(null);

  const { loading: roleLoading } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email },
    onCompleted: (data) => {
      setRole(data.userByEmail.role);
    },
    skip: !!role || !email,
  });

  const { loading: verifyCodeLoading } = useQuery<{
    verifyPasswordResetCode: string;
  }>(VERIFY_PASSWORD_RESET_CODE, {
    onCompleted(data: { verifyPasswordResetCode: string }) {
      setEmail(data.verifyPasswordResetCode);
      setPasswordResetVerified(true);
    },
    variables: { oobCode },
  });

  const isLoading = verifyCodeLoading || roleLoading;
  if (isLoading) {
    return (
      <LoadingState
        fullPage
        text="Please wait while we check your account..."
      />
    );
  }
  if (!passwordResetVerified || !role) {
    return <EmailActionError mode="resetPassword" />;
  }

  return <SetNewPassword email={email} oobCode={oobCode} role={role} />;
};
export default ResetPasswordHandler;
