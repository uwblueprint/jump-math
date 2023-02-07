/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import countryList from "react-select-country-list";
import { useForm } from "react-hook-form";
import { Select } from "chakra-react-select";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
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

  const countryOptions = React.useMemo(() => countryList().getData(), []);

  const gradeOptions = [
    {
      label: "K",
      value: "k",
    },
    {
      label: "Grade 1",
      value: "1",
    },
    {
      label: "Grade 2",
      value: "2",
    },
    {
      label: "Grade 3",
      value: "3",
    },
    {
      label: "Grade 4",
      value: "4",
    },
    {
      label: "Grade 5",
      value: "5",
    },
    {
      label: "Grade 6",
      value: "6",
    },
    {
      label: "Grade 7",
      value: "7",
    },
    {
      label: "Grade 8",
      value: "8",
    },
  ];

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
        <Select
          options={gradeOptions}
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              bg: "transparent",
              px: 2,
              cursor: "inherit",
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: "none",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "grey.300",
            }),
          }}
        />
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
            <Select
              options={countryOptions}
              chakraStyles={{
                dropdownIndicator: (provided) => ({
                  ...provided,
                  bg: "transparent",
                  px: 2,
                  cursor: "inherit",
                }),
                indicatorSeparator: (provided) => ({
                  ...provided,
                  display: "none",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "grey.300",
                }),
              }}
            />
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
