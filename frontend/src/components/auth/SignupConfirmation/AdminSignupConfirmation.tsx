import React, { useState } from "react";
import TeacherWrapper from "../../common/TeacherWrapper";
import PasswordForm from "../Password/PasswordForm";
import FinalSignupConfirmation from "./FinalSignupConfirmation";

const AdminSignupConfirmation = ({
  email,
  oobCode,
}: {
  email: string;
  oobCode: string;
}): React.ReactElement => {
  const [step, setStep] = useState(1);

  const setPasswordComponent = (
    <PasswordForm
      version="AdminSignup"
      email={email}
      oobCode={oobCode}
      subtitle="Hey, please set a password to complete the sign up process 👋"
      setStep={setStep}
    />
  );

  return (
    <TeacherWrapper
      header="Admin Sign Up Confirmation"
      component={step === 1 ? setPasswordComponent : FinalSignupConfirmation}
    />
  );
};

export default AdminSignupConfirmation;
