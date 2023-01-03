import { useMutation, useQuery } from "@apollo/client";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CONFIRM_PASSWORD_RESET } from "../../../../APIClients/mutations/AuthMutations";
import { GET_USER_BY_EMAIL } from "../../../../APIClients/queries/UserQueries";
import { LOGIN_PAGE } from "../../../../constants/Routes";
import PasswordRequirement from "../../Password/PasswordRequirement";
import ErrorMessage from "../../TeacherSignup/ErrorMessage";
import NavigationButtons from "../../TeacherSignup/NavigationButtons";

const SetNewPassword = ({
  oobCode,
  email,
  setStep,
}: {
  oobCode: string;
  email: string;
  setStep: (step: number) => void;
}): React.ReactElement => {
  const history = useHistory();

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

  const [displaySamePasswordError, setDisplaySamePasswordError] = useState(
    false,
  );

  const { data } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email },
  });

  const [confirmPasswordReset] = useMutation<{ confirmPasswordReset: boolean }>(
    CONFIRM_PASSWORD_RESET,
    {
      onCompleted() {
        setStep(2);
      },
    },
  );

  // TODO: handle submission of data to the backend
  const onSubmit = async () => {
    setDisplayMatchError(false);
    setDisplayRequirementError(false);
    setDisplaySamePasswordError(false);

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
    if (password === data.getUserByEmail.password) {
      setDisplaySamePasswordError(true);
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

  return (
    <>
      <Text textStyle="header4" textAlign="center" pb={4}>
        Set New Password
      </Text>
      <VStack>
        <Text
          textStyle="subtitle2"
          textAlign="center"
          pb={
            displayMatchError ||
            displayRequirementError ||
            displaySamePasswordError
              ? 0
              : 14
          }
        >
          Please ensure that your new password is different than your old one
        </Text>
        {displayMatchError && (
          <ErrorMessage message="Please ensure passwords match" />
        )}
        {displayRequirementError && (
          <ErrorMessage message="Password does not meet all of the requirements" />
        )}
        {displaySamePasswordError && (
          <ErrorMessage message="Password is the same as before. Please choose a new one." />
        )}
        <FormControl isRequired pb={6}>
          <FormLabel color="grey.400">Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={
              displayMatchError ||
              displayRequirementError ||
              displaySamePasswordError
            }
          />
        </FormControl>
        <FormControl isRequired pb={6}>
          <FormLabel color="grey.400">Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            isInvalid={
              displayMatchError ||
              displayRequirementError ||
              displaySamePasswordError
            }
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
            <PasswordRequirement
              isFulfilled={hasNum}
              requirement="one number"
            />
          </VStack>
        </HStack>

        <NavigationButtons
          onContinueClick={onSubmit}
          onBackClick={() => history.push(LOGIN_PAGE)} // TODO: Update to teacher login page
          continueButtonText="Reset Password"
          backButtonText="Back to login page"
        />
      </VStack>
    </>
  );
};

export default SetNewPassword;
