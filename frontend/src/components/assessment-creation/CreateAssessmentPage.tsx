/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Text,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

const CreateAssessmentPage = (): React.ReactElement => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <VStack align="left">
      <Text marginBottom={5}>BASIC INFORMATION</Text>

      <FormControl isRequired isInvalid={Boolean(errors.assessmentName)}>
        <FormLabel> Assessment Name </FormLabel>
        <Input
          placeholder="e.g. Ontario Grade 5 Pre-Term Assessment"
          {...register("assessmentName", {
            required: "Please enter a name for the assessment",
          })}
        />
        <FormErrorMessage> {errors.assessmentName?.message} </FormErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormLabel> Grade Level </FormLabel>
        <Select variant="filled" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel> Type of Assessment </FormLabel>
        <RadioGroup>
          <Box borderRadius="md" border="2px" borderColor="gray.200">
            <Radio value="1">Beginning of Grade</Radio>
          </Box>
          <Box borderRadius="md" border="2px" borderColor="gray.200">
            <Radio value="2">End of Grade</Radio>
          </Box>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel> Curriculum </FormLabel>
        <Stack direction="row" width="100%">
          <FormControl isRequired>
            <FormLabel> Country </FormLabel>
            <Select variant="filled" />
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(errors.region)}>
            <FormLabel> Region </FormLabel>
            <Input
              {...register("region", { required: "Please enter a region" })}
            />
            <FormErrorMessage> {errors.region?.message} </FormErrorMessage>
          </FormControl>
        </Stack>
      </FormControl>

      <Button
        onClick={handleSubmit((data) => {
          console.log(data);
          console.log(errors);
        })}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default CreateAssessmentPage;
