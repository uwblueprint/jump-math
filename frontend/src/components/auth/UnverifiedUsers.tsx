import React from "react";
import { useMutation } from "@apollo/client";

import { SEND_EMAIL_VERIFICATION_LINK } from "../../APIClients/mutations/AuthMutations";
import { TEACHER_SIGNUP_IMAGE } from "../../assets/images";
import ResendEmail from "../common/ResendEmail";

import AuthWrapper from "./AuthWrapper";

const UnverifiedUsers = ({ email }: { email: string }): React.ReactElement => {
  const [sendEmailVerificationLink] = useMutation<{ resetPassword: boolean }>(
    SEND_EMAIL_VERIFICATION_LINK,
  );

  return (
    <AuthWrapper
      form={
        <ResendEmail
          resendFunction={async () => {
            await sendEmailVerificationLink({ variables: { email } });
          }}
        />
      }
      image={TEACHER_SIGNUP_IMAGE}
      subtitle="Looks like you still need to verify your email before your log in."
      title="Verify your email"
    />
  );
};

export default UnverifiedUsers;
