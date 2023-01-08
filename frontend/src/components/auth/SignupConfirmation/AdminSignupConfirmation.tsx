import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ADMIN_SIGNUP_IMAGE } from "../../../assets/images";
import { ADMIN_LOGIN } from "../../../constants/Routes";
import AuthWrapper from "../AuthWrapper";
import PasswordForm from "../Password/PasswordForm";

const AdminSignupConfirmation = ({
  email,
  oobCode,
}: {
  email: string;
  oobCode: string;
}): React.ReactElement => {
  const [step, setStep] = useState(1);
  const history = useHistory();

  const subtitle =
    step === 1
      ? "Hey, please set a password to complete the sign up process 👋"
      : "You have finalized your account credentials!\nUse the link below to login";

  const setPasswordComponent = (
    <PasswordForm
      version="AdminSignup"
      userRole="Admin"
      email={email}
      oobCode={oobCode}
      setStep={setStep}
    />
  );

  const finalSignupConfirmation = (
    <Button
      variant="primary"
      width="100%"
      onClick={() => history.push(ADMIN_LOGIN)}
    >
      Login
    </Button>
  );

  return (
    <AuthWrapper
      title="Admin Sign Up Confirmation"
      subtitle={subtitle}
      image={ADMIN_SIGNUP_IMAGE}
      form={step === 1 ? setPasswordComponent : finalSignupConfirmation}
    />
  );
};

export default AdminSignupConfirmation;
