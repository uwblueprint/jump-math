import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import AuthContext from "../../contexts/AuthContext";
import { RESET_PASSWORD } from "../../APIClients/mutations/AuthMutations";

const ForgotPassword = (): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);

  const [resetPassword] = useMutation<{ resetPassword: boolean }>(
    RESET_PASSWORD,
  );

  const onResetPasswordClick = async () => {
    await resetPassword({ variables: { email: authenticatedUser?.email } });
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={onResetPasswordClick}
    >
      Reset Password
    </button>
  );
};

export default ForgotPassword;
