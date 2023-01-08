import React from "react";
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
import NavigationButtons from "../TeacherSignup/NavigationButtons";
import { ArrowBackOutlineIcon } from "../../../assets/icons";
import { GET_USERS_BY_ROLE } from "../../../APIClients/queries/UserQueries";
import { UserResponse } from "../../../APIClients/types/UserClientTypes";
import { Role } from "../../../types/AuthTypes";

interface ForgotPasswordProps {
  role: Role;
  hasError: boolean;
  email: string;
  step: number;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailNotFoundError: React.Dispatch<React.SetStateAction<boolean>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ForgotPassword = ({
  role,
  hasError,
  email,
  step,
  setEmail,
  setEmailError,
  setEmailNotFoundError,
  setStep,
}: ForgotPasswordProps): React.ReactElement => {
  const toast = useToast();
  const { data } = useQuery(GET_USERS_BY_ROLE, {
    variables: { role },
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

  return (
    <>
      {step === 1 && (
        <>
          <FormControl isInvalid={hasError} isRequired>
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
};

export default ForgotPassword;
