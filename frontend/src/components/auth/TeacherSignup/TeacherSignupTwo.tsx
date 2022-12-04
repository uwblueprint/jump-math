/* eslint-disable react/jsx-props-no-spreading */
import { Button, VStack, Text, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import { ArrowBackOutlineIcon } from "../../common/icons";
import SelectFormInput from "./SelectFormInput";
import { TeacherSignupProps } from "./types";

const TeacherSignupTwo = ({
  setPage,
  register,
  errors,
}: TeacherSignupProps): React.ReactElement => {
  return (
    <VStack>
      <Text textStyle="subtitle2" textAlign="center" pb={10}>
        Enter your credentials below to get access to your classes
      </Text>

      <FormControl>
        <FormLabel color="grey.400">
          Are you currently teaching Jump Math in the classroom?
        </FormLabel>
        <SelectFormInput
          register={register}
          name="currentlyTeachingJM"
          options={["Yes", "No"]}
          placeholder="Select Response"
          required
        />
        {errors.currentlyTeachingJM && <p>Field is required.</p>}
      </FormControl>

      <FormControl>
        <FormLabel color="grey.400">School</FormLabel>
        <SelectFormInput
          register={register}
          name="school"
          options={["yes", "no"]}
          placeholder="Search School by typing it in field"
          required
        />
        {errors.currentlyTeachingJM && <p>School is required.</p>}
      </FormControl>

      <Text textStyle="subtitle2" color="grey.400">
        If your school is not listed, click here.
      </Text>

      <Button variant="primary" onClick={() => setPage(3)}>
        Continue
      </Button>
      <Button
        leftIcon={<ArrowBackOutlineIcon />}
        variant="tertiary"
        onClick={() => setPage(1)}
      >
        Back
      </Button>
    </VStack>
  );
};

export default TeacherSignupTwo;
