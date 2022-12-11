import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  ArrowBackOutlineIcon,
  CheckmarkCircleFillIcon,
  CheckmarkCircleOutlineIcon,
} from "../../common/icons";
import { TeacherSignupProps } from "./types";

type PasswordRequirementProps = {
  isFulfilled: boolean;
  requirement: string;
};

const PasswordRequirement = ({
  isFulfilled,
  requirement,
}: PasswordRequirementProps): React.ReactElement => {
  return (
    <HStack>
      {isFulfilled ? (
        <Box color="green.300" fontSize="20px">
          <CheckmarkCircleFillIcon />
        </Box>
      ) : (
        <Box color="red.200" fontSize="20px">
          <CheckmarkCircleOutlineIcon />
        </Box>
      )}
      <Text textStyle="mobileParagraph">{requirement}</Text>
    </HStack>
  );
};

const TeacherSignupFour = ({
  setPage,
  register,
  handleSubmit,
  errors,
}: TeacherSignupProps): React.ReactElement => {
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
  // TODO: handle submission of data to the backend
  const onSubmit = () => {
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
    handleSubmit((data) => console.log(data));
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
    <VStack>
      <Text
        textStyle="subtitle2"
        textAlign="center"
        pb={displayMatchError || displayRequirementError ? 0 : 14}
      >
        Please set a secure password for your account
      </Text>
      {displayMatchError && (
        <Alert status="error" variant="no-background">
          <AlertIcon color="red.200" />
          Please ensure passwords match.
        </Alert>
      )}
      {displayRequirementError && (
        <Alert status="error" variant="no-background">
          <AlertIcon color="red.200" />
          Password does not meet all of the requirements.
        </Alert>
      )}
      <FormControl isRequired pb={6}>
        <FormLabel color="grey.400">Password</FormLabel>
        <Input
          type="text"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          width="458px"
        />
      </FormControl>
      <FormControl isRequired pb={6}>
        <FormLabel color="grey.400">Confirm Password</FormLabel>
        <Input
          type="text"
          placeholder="Enter Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          width="458px"
        />
      </FormControl>
      <HStack alignItems="top">
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
      <Button variant="primary" onClick={onSubmit}>
        Continue
      </Button>
      <Button
        leftIcon={<ArrowBackOutlineIcon />}
        variant="tertiary"
        onClick={() => setPage(3)}
      >
        Back
      </Button>
    </VStack>
  );
};

export default TeacherSignupFour;
