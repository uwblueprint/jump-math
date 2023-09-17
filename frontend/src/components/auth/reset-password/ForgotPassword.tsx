import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import { RESET_PASSWORD } from "../../../APIClients/mutations/AuthMutations";
import { GET_USER_BY_EMAIL } from "../../../APIClients/queries/UserQueries";
import type { UserResponse } from "../../../APIClients/types/UserClientTypes";
import {
  ADMIN_SIGNUP_IMAGE,
  TEACHER_SIGNUP_IMAGE,
} from "../../../assets/images";
import AuthWrapper from "../AuthWrapper";
import ResendEmail from "../ResendEmail";
import NavigationButtons from "../teacher-signup/NavigationButtons";

interface ForgotPasswordProps {
  isAdmin: boolean;
}

const ForgotPassword = ({
  isAdmin,
}: ForgotPasswordProps): React.ReactElement => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailNotFoundError, setEmailNotFoundError] = useState(false);
  const [step, setStep] = useState(1);

  const [getUserByEmail] = useLazyQuery<{
    userByEmail: UserResponse;
  }>(GET_USER_BY_EMAIL, {
    onError() {
      setEmailNotFoundError(true);
    },
  });
  const [resetPassword] = useMutation<{ resetPassword: boolean }>(
    RESET_PASSWORD,
    {
      onCompleted() {
        setStep(2);
      },
    },
  );

  const onResetPasswordClick = async () => {
    if (!email) {
      setEmailError(true);
      return;
    }

    try {
      const { data } = await getUserByEmail({ variables: { email } });
      if (data?.userByEmail?.role === (isAdmin ? "Admin" : "Teacher")) {
        setEmailNotFoundError(true);
        return;
      }
    } catch (e) {
      setEmailNotFoundError(true);
      return;
    }

    await resetPassword({ variables: { email } });
  };

  const title = step === 1 ? "Forgot Password?" : "Check your email";
  const subtitle =
    step === 1
      ? "Don’t worry about it, we will send you instructions!"
      : `We sent a password reset link to ${email}`;
  const image = isAdmin ? ADMIN_SIGNUP_IMAGE : TEACHER_SIGNUP_IMAGE;
  const form = (
    <>
      {step === 1 && (
        <>
          <FormControl isInvalid={emailError || emailNotFoundError} isRequired>
            <FormLabel color="grey.400">Email Address</FormLabel>
            <Input
              onChange={(e) => {
                setEmailError(false);
                setEmailNotFoundError(false);
                setEmail(e.target.value);
              }}
              placeholder="Enter Email Address"
              type="text"
              value={email}
            />
          </FormControl>
          <NavigationButtons
            backButtonText="Back to login page"
            continueButtonText="Submit"
            onBackClick={() => window.location.reload()}
            onContinueClick={onResetPasswordClick}
          />
        </>
      )}
      {step === 2 && <ResendEmail resendFunction={onResetPasswordClick} />}
    </>
  );

  let error: string;
  if (emailNotFoundError) {
    error = "Email is not in our database. Please re-enter it.";
  } else if (emailError) {
    error = "Please ensure fields are filled";
  } else {
    error = "";
  }

  return (
    <AuthWrapper
      error={error}
      form={form}
      image={image}
      subtitle={subtitle}
      title={title}
    />
  );
};

export default ForgotPassword;
