import React, { useState } from "react";
import { TEACHER_SIGNUP_IMAGE } from "../../../assets/images";
import LoadingState from "../../common/LoadingState";
import AuthWrapper from "../AuthWrapper";
import PasswordResetSuccess from "./steps/PasswordResetSuccess";
import SetNewPassword from "./steps/SetNewPassword";

const ResetPassword = ({
  oobCode,
  email,
}: {
  oobCode: string;
  email: string;
}): React.ReactElement => {
  const [step, setStep] = useState(1);

  if (!oobCode || !email) {
    return <LoadingState fullPage />;
  }

  return (
    <>
      {step === 1 ? (
        <AuthWrapper
          title="Set New Password"
          image={TEACHER_SIGNUP_IMAGE}
          form={
            <SetNewPassword oobCode={oobCode} email={email} setStep={setStep} />
          }
        />
      ) : (
        <AuthWrapper
          title="Password Reset Successful"
          image={TEACHER_SIGNUP_IMAGE}
          form={<PasswordResetSuccess />}
        />
      )}
    </>
  );
};

export default ResetPassword;
