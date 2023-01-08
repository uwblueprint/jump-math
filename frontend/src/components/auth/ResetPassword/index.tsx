import { useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GET_USER_BY_EMAIL } from "../../../APIClients/queries/UserQueries";
import {
  ADMIN_SIGNUP_IMAGE,
  TEACHER_SIGNUP_IMAGE,
} from "../../../assets/images";
import { ADMIN_LOGIN, TEACHER_LOGIN } from "../../../constants/Routes";
import { Role } from "../../../types/AuthTypes";
import LoadingState from "../../common/LoadingState";
import AuthWrapper from "../AuthWrapper";
import PasswordForm from "../Password/PasswordForm";

const ResetPassword = ({
  oobCode,
  email,
}: {
  oobCode: string;
  email: string;
}): React.ReactElement => {
  const [step, setStep] = useState(1);
  const [role, setRole] = React.useState<Role | null>(null);
  const [password, setPassword] = React.useState<string>("");
  const history = useHistory();

  useQuery(GET_USER_BY_EMAIL, {
    variables: { email },
    onCompleted: (data) => {
      setRole(data.userByEmail.role);
      setPassword(data.userByEmail.password);
    },
  });

  const image = role === "Admin" ? ADMIN_SIGNUP_IMAGE : TEACHER_SIGNUP_IMAGE;

  if (!role) return <LoadingState fullPage />;
  if (step === 1)
    return (
      <AuthWrapper
        title="Set New Password"
        subtitle="Please ensure that your new password is different than your old one"
        image={image}
        form={
          <PasswordForm
            version="ResetPassword"
            userRole={role}
            email={email}
            oobCode={oobCode}
            setStep={setStep}
          />
        }
      />
    );
  return (
    <AuthWrapper
      title="Password Reset Successful"
      subtitle={`Your password has been successfully reset\nClick below to log in`}
      image={image}
      form={
        <Button
          variant="primary"
          width="100%"
          onClick={() =>
            history.push(role === "Admin" ? ADMIN_LOGIN : TEACHER_LOGIN)
          }
        >
          Login
        </Button>
      }
    />
  );
};

export default ResetPassword;
