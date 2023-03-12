import React, { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";

import { CONFIRM_PASSWORD_RESET } from "../../../APIClients/mutations/AuthMutations";
import { TeacherSignupForm } from "../../../types/TeacherSignupTypes";
import FormError from "../../common/FormError";
import NavigationButtons from "../teacher-signup/NavigationButtons";

import PasswordRequirement from "./PasswordRequirement";

interface PasswordFormProps {
  version: "AdminSignup" | "TeacherSignup" | "ResetPassword";
  email?: string;
  oobCode?: string;
  setValue?: UseFormSetValue<TeacherSignupForm>;
  setStep?: (step: number) => void;
  handleSubmitCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PasswordForm = ({
  version,
  email = undefined,
  oobCode = undefined,
  setValue = undefined,
  setStep = undefined,
  handleSubmitCallback = undefined,
}: PasswordFormProps): React.ReactElement => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [displayMatchError, setDisplayMatchError] = useState(false);
  const [displayRequirementError, setDisplayRequirementError] = useState(false);

  const [minNineChars, setMinNineChars] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [hasNum, setHasNum] = useState(false);

  const history = useHistory();
  const hasError = displayMatchError || displayRequirementError;

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

    if (handleSubmitCallback) {
      handleSubmitCallback(e);
    } else {
      await confirmPasswordReset({
        variables: { oobCode, newPassword: password },
      });
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
      {version === "AdminSignup" && (
        <FormControl isRequired pb={6}>
          <FormLabel color="grey.400">Email Address</FormLabel>
          <Input disabled type="email" value={email} />
        </FormControl>
      )}
      <FormControl isRequired pb={6}>
        <FormLabel color="grey.400">Password</FormLabel>
        <Input
          isInvalid={hasError}
          onChange={handlePasswordChange}
          placeholder="Enter Password"
          type="password"
        />
      </FormControl>
      <FormControl isRequired pb={6}>
        <FormLabel color="grey.400">Confirm Password</FormLabel>
        <Input
          isInvalid={hasError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          placeholder="Enter Password"
          type="password"
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
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e)}
          variant="primary"
          width="100%"
        >
          Create Account
        </Button>
      )}
      {version === "ResetPassword" && (
        <NavigationButtons
          backButtonText="Back to login page"
          continueButtonText="Reset Password"
          onBackClick={() => history.goBack()}
          onContinueClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            onClick(e)
          }
        />
      )}
      {version === "TeacherSignup" && (
        <NavigationButtons
          onBackClick={() => setStep && setStep(3)}
          onContinueClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            onClick(e)
          } // TODO: Back button can either go to page 2 or 3 depending on whether school exists or not
        />
      )}
    </VStack>
  );
};

export default PasswordForm;