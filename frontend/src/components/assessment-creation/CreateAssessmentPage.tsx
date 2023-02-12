/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from "react";
import countryList from "react-select-country-list";
import { useForm, Controller } from "react-hook-form";
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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const CreateAssessmentPage = (): React.ReactElement => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  type FormInputs = {
    assessmentName: string;
  };

  const fromErrorMsg = "Please resolve all issues before publishing or saving";
  const [validSubmit, setValidSubmit] = useState(true);

  const onSubmit = (data: any, e: any) => {
    setValidSubmit(true);
    console.log(data, e);
  };
  const onError = (errs: any, e: any) => {
    setValidSubmit(false);
  };

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
    <VStack align="left" width="75%" spacing={8}>
      <Text textStyle="eyebrow">BASIC INFORMATION</Text>

      {!validSubmit && (
        <Alert status="error">
          <AlertIcon />
          {fromErrorMsg}
        </Alert>
      )}

      <FormControl isRequired isInvalid={Boolean(errors.assessmentName)}>
        <FormLabel color="grey.400"> Assessment Name </FormLabel>
        <Input
          placeholder="e.g. Ontario Grade 5 Pre-Term Assessment"
          {...register("assessmentName", {
            required: "Please enter a name for the assessment",
          })}
        />
        <FormErrorMessage> {errors.assessmentName?.message} </FormErrorMessage>
      </FormControl>

      <Box width="50%">
        <Controller
          control={control}
          name="grade"
          rules={{ required: "Please select a grade" }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FormControl isRequired isInvalid={Boolean(error)}>
              <FormLabel color="grey.400"> Grade Level </FormLabel>
              <Select
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={gradeOptions}
                placeholder=""
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
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </Box>

      <Box width="50%">
        <Controller
          control={control}
          name="assessmentType"
          rules={{ required: "Please select a type of assessment" }}
          render={({
            field: { onChange, value, name, ref },
            fieldState: { error },
          }) => (
            <FormControl isRequired isInvalid={Boolean(error)}>
              <FormLabel color="grey.400"> Type of Assessment </FormLabel>
              <RadioGroup
                name={name}
                ref={ref}
                onChange={onChange}
                value={value}
              >
                <Stack direction="column">
                  <Radio value="beginning" _checked={{ iconColor: "green" }}>
                    Beginning of Grade
                  </Radio>
                  <Radio value="end">End of Grade</Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </Box>

      <FormControl>
        <Text textStyle="subtitle2" mb="2">
          {" "}
          Curriculum{" "}
        </Text>
        <Stack direction="row" width="100%">
          <Controller
            control={control}
            name="country"
            rules={{ required: "Please select a country" }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { error },
            }) => (
              <FormControl isRequired isInvalid={Boolean(error)} mr={2}>
                <FormLabel color="grey.400"> Country </FormLabel>
                <Select
                  name={name}
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  options={countryOptions}
                  placeholder=""
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
                <FormErrorMessage>{error?.message}</FormErrorMessage>
              </FormControl>
            )}
          />

          <FormControl isRequired isInvalid={Boolean(errors.region)}>
            <FormLabel color="grey.400"> Region </FormLabel>
            <Input
              {...register("region", { required: "Please enter a region" })}
            />
            <FormErrorMessage> {errors.region?.message} </FormErrorMessage>
          </FormControl>
        </Stack>
      </FormControl>

      <Button onClick={handleSubmit(onSubmit, onError)}>Submit</Button>
    </VStack>
  );
};

export default CreateAssessmentPage;
