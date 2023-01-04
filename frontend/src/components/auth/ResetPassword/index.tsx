import React, { useState } from "react";
import LoadingState from "../../common/LoadingState";
import TeacherWrapper from "../../common/TeacherWrapper";
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
        <TeacherWrapper
          header="Set New Password"
          component={
            <SetNewPassword oobCode={oobCode} email={email} setStep={setStep} />
          }
        />
      ) : (
        <TeacherWrapper
          header="Password Reset Successful"
          component={<PasswordResetSuccess />}
        />
      )}
    </>
  );
};

export default ResetPassword;
