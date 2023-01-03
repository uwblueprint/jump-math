import { useMutation } from "@apollo/client";
import React from "react";
import { CONFIRM_PASSWORD_RESET } from "../../APIClients/mutations/AuthMutations";

const ResetPassword = ({
  oobCode,
  email,
}: {
  oobCode: string;
  email: string;
}): React.ReactElement => {
  const [newPassword, setNewPassword] = React.useState("");

  const [confirmPasswordReset] = useMutation<{ confirmPasswordReset: boolean }>(
    CONFIRM_PASSWORD_RESET,
  );

  const onResetPassword = async () => {
    await confirmPasswordReset({ variables: { oobCode, newPassword } });
  };

  return <>Reset Password</>;
};

export default ResetPassword;
