import React, { useState } from "react";
import TeacherWrapper from "../../common/TeacherWrapper";
import NotFound from "../../pages/NotFound";
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

  switch (step) {
    case 1:
      return (
        <TeacherWrapper
          header="Set New Password"
          component={
            <SetNewPassword oobCode={oobCode} email={email} setStep={setStep} />
          }
        />
      );
    case 2:
      return (
        <TeacherWrapper
          header="Password Reset Successful"
          component={<PasswordResetSuccess />}
        />
      );
    default:
      return <NotFound />;
  }
};

export default ResetPassword;
