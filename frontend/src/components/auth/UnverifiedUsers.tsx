import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Text, useToast } from "@chakra-ui/react";

import { SEND_EMAIL_VERIFICATION_LINK } from "../../APIClients/mutations/AuthMutations";
import { ArrowBackOutlineIcon } from "../../assets/icons";
import { TEACHER_SIGNUP_IMAGE } from "../../assets/images";

import AuthWrapper from "./AuthWrapper";

const UnverifiedUsers = ({ email }: { email: string }): React.ReactElement => {
  const [sendEmailVerificationLink] = useMutation<{ resetPassword: boolean }>(
    SEND_EMAIL_VERIFICATION_LINK,
  );

  const toast = useToast();

  const onResendClick = async () => {
    await sendEmailVerificationLink({ variables: { email } });
    toast({
      title: "Resent email!",
      description: "Check your email to reset your password.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <AuthWrapper
      form={
        <>
          <Text textAlign="center" textStyle="subtitle2">
            Didn’t receive the email?{" "}
            <Button
              color="blue.300"
              display="contents"
              onClick={onResendClick}
              style={{ font: "inherit" }}
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
      }
      image={TEACHER_SIGNUP_IMAGE}
      subtitle="Looks like you still need to verify your email before your log in."
      title="Verify your email"
    />
  );
};

export default UnverifiedUsers;
