import React, { useState } from "react";
import {
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../../APIClients/mutations/AuthMutations";
import ErrorMessage from "../TeacherSignup/ErrorMessage";
import { ArrowBackOutlineIcon } from "../../../assets/icons";

const TeacherResetPassword = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}): React.ReactElement => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [resetPassword] = useMutation<{ resetPassword: boolean }>(
    RESET_PASSWORD,
  );

  const onResetPasswordClick = async () => {
    if (!email) {
      setEmailError(true);
      return;
    }

    setStep(2);
    await resetPassword({ variables: { email } });
  };

  return (
    <>
      {step === 1 && (
        <>
          <Text textStyle="header4" textAlign="center" pb={4}>
            Forgot Password?
          </Text>
          <VStack>
            <Text
              textStyle="subtitle2"
              textAlign="center"
              pb={emailError ? 0 : 14}
            >
              Don’t worry about it, we will send you instructions!
            </Text>
            {emailError && (
              <ErrorMessage message="Please ensure field is filled" />
            )}
            <FormControl pt={4} isInvalid={emailError} isRequired>
              <FormLabel color="grey.400">Email Address</FormLabel>
              <Input
                type="text"
                value={email}
                placeholder="Enter Email Address"
                onChange={(e) => {
                  setEmailError(false);
                  setEmail(e.target.value);
                }}
              />
            </FormControl>

            <Button
              variant="primary"
              width="100%"
              onClick={onResetPasswordClick}
            >
              Submit
            </Button>
            <Button
              leftIcon={<ArrowBackOutlineIcon />}
              variant="tertiary"
              onClick={() => setPage(1)}
            >
              Back to login page
            </Button>
          </VStack>
        </>
      )}
      {step === 2 && (
        <>
          <Text textStyle="header4" textAlign="center" pb={4}>
            Check your email
          </Text>
          <VStack>
            <Text textStyle="subtitle2" textAlign="center">
              We sent a password reset link to {email}
            </Text>
            <Text textStyle="subtitle2" textAlign="center">
              Didn’t receive the email?{" "}
              <Button
                onClick={onResetPasswordClick}
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
              onClick={() => setPage(1)}
            >
              Back to login page
            </Button>
          </VStack>
        </>
      )}
    </>
  );
};

export default TeacherResetPassword;
