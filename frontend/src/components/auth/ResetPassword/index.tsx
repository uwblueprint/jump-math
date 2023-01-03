import { HStack, VStack, Image } from "@chakra-ui/react";
import React, { useState } from "react";
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

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <SetNewPassword oobCode={oobCode} email={email} setStep={setStep} />
        );
      case 2:
        return <PasswordResetSuccess />;
      default:
        return <NotFound />;
    }
  };
  return (
    <HStack>
      <Image
        src="https://storage.googleapis.com/jump-math-98edf.appspot.com/teacher-signup.png"
        alt="Teacher-Signup"
        fit="cover"
        width="50%"
        height="100vh"
      />
      <VStack width="50%" height="100vh" padding={6}>
        <Image
          src="https://storage.googleapis.com/jump-math-98edf.appspot.com/jump_math_logo_short_ver.png"
          alt="Jump-Math-Logo"
          py={5}
        />
        {renderComponent}
      </VStack>
    </HStack>
  );
};

export default ResetPassword;
