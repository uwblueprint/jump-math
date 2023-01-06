import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  CheckmarkCircleFillIcon,
  CheckmarkCircleOutlineIcon,
} from "../../../../assets/icons";
import NavigationButtons from "../NavigationButtons";
import {
  TeacherSignupForm,
  TeacherSignupProps,
} from "../../../../types/TeacherSignupTypes";
import AuthWrapper from "../../AuthWrapper";
import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";

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
  handleSubmitCallback,
}: TeacherSignupProps): React.ReactElement => {
  const { setValue } = useFormContext<TeacherSignupForm>();
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("password", e.target.value);
    setPassword(e.target.value);
  };

  // TODO: handle submission of data to the backend
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    handleSubmitCallback(e);
  };

  useEffect(() => {
    setMatch(password === confirmPassword);
    setMinNineChars(password.length >= 9);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasSpecial(/[~`! @#$%^&*()_\-+={[}\]|\\:;“’<,>.?/]/.test(password));
    setHasNum(/[0-9]/.test(password));
  }, [password, confirmPassword]);

  const title = "Teacher Sign Up";
  const subtitle = "Please set a secure password for your account";
  const image = TEACHER_SIGNUP_IMAGE;
  const form = (
    <VStack>
      <FormControl isRequired pb={6}>
        <FormLabel color="grey.400">Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Password"
          onChange={handlePasswordChange}
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

      {/* TODO: Back button can either go to page 2 or 3 depending on whether school exists or not */}
      <NavigationButtons
        onContinueClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          onSubmit(e)
        }
        onBackClick={() => setPage(3)}
      />
    </VStack>
  );

  const error = () => {
    if (displayMatchError) {
      return "Please ensure passwords match";
    }
    if (displayRequirementError) {
      return "Password does not meet all of the requirements";
    }
    return "";
  };

  return (
    <AuthWrapper
      title={title}
      subtitle={subtitle}
      image={image}
      form={form}
      error={error()}
    />
  );
};

export default TeacherSignupFour;
