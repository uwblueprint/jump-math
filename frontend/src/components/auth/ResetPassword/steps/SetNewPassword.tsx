import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_BY_EMAIL } from "../../../../APIClients/queries/UserQueries";
import PasswordForm from "../../Password/PasswordForm";

const SetNewPassword = ({
  oobCode,
  email,
  setStep,
}: {
  oobCode: string;
  email: string;
  setStep: (step: number) => void;
}): React.ReactElement => {
  const { data } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email },
  });

  return (
    <PasswordForm
      version="ResetPassword"
      subtitle="Please ensure that your new password is different than your old one"
      email={email}
      oobCode={oobCode}
      oldPassword={data.getUserByEmail.password}
      setStep={setStep}
    />
  );
};

export default SetNewPassword;
