import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { UseFormSetValue } from "react-hook-form";
import PasswordRequirement from "./PasswordRequirement";
import { TeacherSignupForm } from "../../../types/TeacherSignupTypes";
import { CONFIRM_PASSWORD_RESET } from "../../../APIClients/mutations/AuthMutations";
import NavigationButtons from "../TeacherSignup/NavigationButtons";
import FormError from "../FormError";
import { TEACHER_LOGIN } from "../../../constants/Routes";

interface PasswordFormProps {
  version: "AdminSignup" | "TeacherSignup" | "ResetPassword";
  email?: string;
  oobCode?: string;
  oldPassword?: string;
  setValue?: UseFormSetValue<TeacherSignupForm>;
  setStep?: (step: number) => void;
  handleSubmitCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PasswordForm = ({
  version,
  email = undefined,
  oobCode = undefined,
  oldPassword = undefined,
  setValue = undefined,
  setStep = undefined,
  handleSubmitCallback = undefined,
}: PasswordFormProps): React.ReactElement => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [displayMatchError, setDisplayMatchError] = useState(false);
  const [displayRequirementError, setDisplayRequirementError] = useState(false);
  const [displaySamePasswordError, setDisplaySamePasswordError] = useState(
    false,
  );

  const [minNineChars, setMinNineChars] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [hasNum, setHasNum] = useState(false);

  const history = useHistory();
  const hasError =
    displayMatchError || displayRequirementError || displaySamePasswordError;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) setValue("password", e.target.value);
    setPassword(e.target.value);
  };

  const [confirmPasswordReset] = useMutation<{ confirmPasswordReset: boolean }>(
    CONFIRM_PASSWORD_RESET,
    {
      onCompleted() {
        if (setStep) setStep(2);
      },
    },
  );

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setDisplayMatchError(false);
    setDisplayRequirementError(false);
    if (version === "ResetPassword") setDisplaySamePasswordError(false);

    if (password !== confirmPassword) {
      setDisplayMatchError(true);
      return;
    }
    if (
      !minNineChars ||
      !hasUppercase ||
      !hasLowercase ||
      !hasSpecial ||
      !hasNum
    ) {
      setDisplayRequirementError(true);
      return;
    }

    if (version === "ResetPassword" && password === oldPassword) {
      setDisplaySamePasswordError(true);
      return;
    }

    if (handleSubmitCallback) {
      handleSubmitCallback(e);
    } else {
      await confirmPasswordReset({ variables: { oobCode, password } });
    }
  };

  useEffect(() => {
    setMinNineChars(password.length >= 9);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasSpecial(/[~`! @#$%^&*()_\-+={[}\]|\\:;“’<,>.?/]/.test(password));
    setHasNum(/[0-9]/.test(password));
  }, [password]);

  return (
    <VStack>
      {displayMatchError && (
        <FormError message="Please ensure passwords match" />
      )}
      {displayRequirementError && (
        <FormError message="Password does not meet all of the requirements" />
      )}
      {displaySamePasswordError && (
        <FormError message="Password is the same as before. Please choose a new one." />
      )}
      {version === "AdminSignup" && (
        <FormControl isRequired pb={6}>
          <FormLabel color="grey.400">Email Address</FormLabel>
          <Input type="email" value={email} disabled />
        </FormControl>
      )}
      <FormControl isRequired pb={6}>
        <FormLabel color="grey.400">Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Password"
          onChange={handlePasswordChange}
          isInvalid={hasError}
        />
      </FormControl>
      <FormControl isRequired pb={6}>
        <FormLabel color="grey.400">Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          isInvalid={hasError}
        />
      </FormControl>
      <HStack alignItems="top" pb={6}>
        <VStack alignItems="left" mr={4}>
          <PasswordRequirement
            isFulfilled={minNineChars}
            requirement="minimum of 9 characters"
          />
          <PasswordRequirement
            isFulfilled={hasUppercase}
            requirement="one uppercase letter"
          />
          <PasswordRequirement
            isFulfilled={hasLowercase}
            requirement="one lowercase letter"
          />
        </VStack>
        <VStack alignItems="left">
          <PasswordRequirement
            isFulfilled={hasSpecial}
            requirement="one special character"
          />
          <PasswordRequirement isFulfilled={hasNum} requirement="one number" />
        </VStack>
      </HStack>
      {version === "AdminSignup" && (
        <Button
          variant="primary"
          width="100%"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e)}
        >
          Create Account
        </Button>
      )}
      {version === "ResetPassword" && (
        <NavigationButtons
          onContinueClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            onClick(e)
          }
          onBackClick={() => history.push(TEACHER_LOGIN)}
          continueButtonText="Reset Password"
          backButtonText="Back to login page"
        />
      )}
      {version === "TeacherSignup" && (
        <NavigationButtons
          onContinueClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            onClick(e)
          }
          onBackClick={() => setStep && setStep(3)} // TODO: Back button can either go to page 2 or 3 depending on whether school exists or not
          continueButtonText="Continue"
          backButtonText="Back"
        />
      )}
    </VStack>
  );
};

export default PasswordForm;
