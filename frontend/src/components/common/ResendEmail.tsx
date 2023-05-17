import React, { useState } from "react";
import { Button, Text } from "@chakra-ui/react";

import { ArrowBackOutlineIcon } from "../../assets/icons";

import Toast from "./Toast";

interface ResendEmailProps {
  resendFunction: () => Promise<void>;
}

const ResendEmail = ({
  resendFunction,
}: ResendEmailProps): React.ReactElement => {
  const { showToast } = Toast();
  const [isResending, setIsResending] = useState(false);

  const onResendClick = async () => {
    setIsResending(true);
    await resendFunction();
    showToast({
      message: "Email resent! Check your email to reset your password.",
      status: "success",
    });
    setIsResending(false);
  };

  return (
    <>
      <Text
        style={{ display: "flex", flexDirection: "column" }}
        textAlign="center"
        textStyle="subtitle2"
      >
        Didn’t receive the email?{" "}
        <Button
          color="blue.300"
          display="contents"
          isLoading
          loadingText="Resending"
          onClick={onResendClick}
          style={{ font: "inherit", display: "flex" }}
        >
          Click to resend
        </Button>
      </Text>
      <Button
        leftIcon={<ArrowBackOutlineIcon />}
        onClick={() => window.location.reload()}
        variant="tertiary"
      >
        Back to login page
      </Button>
    </>
  );
};

export default ResendEmail;
