import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  ArrowBackOutlineIcon,
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
      {isFulfilled ? <CheckmarkCircleOutlineIcon /> : <ArrowBackOutlineIcon />}
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
  // TODO: handle submission of data to the backend
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <VStack>
      <Text textStyle="subtitle2" textAlign="center" pb={14}>
        Please set a secure password for your account
      </Text>
      <FormControl isRequired pb={6}>
        <FormLabel>Password</FormLabel>
        <Input
          type="text"
          placeholder="Enter Password"
          onChange={(e) => console.log(e)}
          width="458px"
        />
      </FormControl>
      <FormControl isRequired pb={6}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="text"
          placeholder="Enter Password"
          onChange={(e) => console.log(e)}
          width="458px"
        />
      </FormControl>
      <HStack alignItems="top">
        <VStack alignItems="left" mr={4}>
          <PasswordRequirement
            isFulfilled
            requirement="minimum of 9 characters"
          />
          <PasswordRequirement
            isFulfilled={false}
            requirement="one uppercase letter"
          />
          <PasswordRequirement isFulfilled requirement="one lowercase letter" />
        </VStack>
        <VStack alignItems="left">
          <PasswordRequirement
            isFulfilled
            requirement="one special character"
          />
          <PasswordRequirement isFulfilled requirement="one number" />
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
