import { useMutation } from "@apollo/client";
import {
  Button,
  VStack,
  Input,
  HStack,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { CONFIRM_PASSWORD_RESET } from "../../../APIClients/mutations/AuthMutations";
import TeacherWrapper from "../../common/TeacherWrapper";
import PasswordRequirement from "../Password/PasswordRequirement";
import ErrorMessage from "../TeacherSignup/ErrorMessage";
import FinalSignupConfirmation from "./FinalSignupConfirmation";

const AdminSignupConfirmation = ({
  email,
  oobCode,
}: {
  email: string;
  oobCode: string;
}): React.ReactElement => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(true);
  const [displayMatchError, setDisplayMatchError] = useState(false);
  const [displayRequirementError, setDisplayRequirementError] = useState(false);
  const [minNineChars, setMinNineChars] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [hasNum, setHasNum] = useState(false);
  const [step, setStep] = useState(1);

  const [confirmPasswordReset] = useMutation<{ confirmPasswordReset: boolean }>(
    CONFIRM_PASSWORD_RESET,
    {
      onCompleted() {
        setStep(2);
      },
    },
  );

  const onCreateAccount = async () => {
    setDisplayMatchError(false);
    setDisplayRequirementError(false);

    if (!match) {
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
    await confirmPasswordReset({ variables: { oobCode, password } });
  };

  useEffect(() => {
    setMatch(password === confirmPassword);
    setMinNineChars(password.length >= 9);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasSpecial(/[~`! @#$%^&*()_\-+={[}\]|\\:;“’<,>.?/]/.test(password));
    setHasNum(/[0-9]/.test(password));
  }, [password, confirmPassword]);

  const setPasswordComponent = (
    <VStack>
      <Text
        textStyle="subtitle2"
        textAlign="center"
        pb={displayMatchError || displayRequirementError ? 0 : 14}
      >
        Hey, please set a password to complete the sign up process 👋
      </Text>
      {displayMatchError && (
        <ErrorMessage message="Please ensure passwords match" />
      )}
      {displayRequirementError && (
        <ErrorMessage message="Password does not meet all of the requirements" />
      )}
      <FormControl isRequired pb={6}>
        <FormLabel color="grey.400">Email Address</FormLabel>
        <Input type="email" value={email} disabled />
      </FormControl>
      <FormControl isRequired pb={6}>
        <FormLabel color="grey.400">Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={displayMatchError || displayRequirementError}
        />
      </FormControl>
      <FormControl isRequired pb={6}>
        <FormLabel color="grey.400">Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          isInvalid={displayMatchError || displayRequirementError}
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

      <Button variant="primary" width="100%" onClick={onCreateAccount}>
        Create Account
      </Button>
    </VStack>
  );

  return (
    <TeacherWrapper
      header="Admin Sign Up Confirmation"
      component={step === 1 ? setPasswordComponent : FinalSignupConfirmation}
    />
  );
};

export default AdminSignupConfirmation;
