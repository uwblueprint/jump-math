import React, { useState } from "react";
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { RESET_PASSWORD } from "../../../APIClients/mutations/AuthMutations";
import NavigationButtons from "../teacher-signup/NavigationButtons";
import { ArrowBackOutlineIcon } from "../../../assets/icons";
import { GET_USERS_BY_ROLE } from "../../../APIClients/queries/UserQueries";
import { UserResponse } from "../../../APIClients/types/UserClientTypes";
import AuthWrapper from "../AuthWrapper";
import {
  ADMIN_SIGNUP_IMAGE,
  TEACHER_SIGNUP_IMAGE,
} from "../../../assets/images";

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

  const toast = useToast();
  const { data } = useQuery(GET_USERS_BY_ROLE, {
    variables: { role: isAdmin ? "Admin" : "Teacher" },
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

    if (!data.usersByRole?.find((user: UserResponse) => user.email === email)) {
      setEmailNotFoundError(true);
      return;
    }

    await resetPassword({ variables: { email } });
  };

  const onResendClick = async () => {
    await onResetPasswordClick();
    toast({
      title: "Resent email!",
      description: "Check your email to reset your password.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
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
              type="text"
              value={email}
              placeholder="Enter Email Address"
              onChange={(e) => {
                setEmailError(false);
                setEmailNotFoundError(false);
                setEmail(e.target.value);
              }}
            />
          </FormControl>
          <NavigationButtons
            onContinueClick={onResetPasswordClick}
            onBackClick={() => window.location.reload()}
            continueButtonText="Submit"
            backButtonText="Back to login page"
          />
        </>
      )}
      {step === 2 && (
        <>
          <Text textStyle="subtitle2" textAlign="center">
            Didn’t receive the email?{" "}
            <Button
              onClick={onResendClick}
              display="contents"
              color="blue.300"
              style={{ font: "inherit" }}
            >
              Click to resend
            </Button>
          </Text>
          <Button
            leftIcon={<ArrowBackOutlineIcon />}
            variant="tertiary"
            onClick={() => window.location.reload()}
          >
            Back to login page
          </Button>
        </>
      )}
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
      title={title}
      subtitle={subtitle}
      image={image}
      form={form}
      error={error}
    />
  );
};

export default ForgotPassword;
