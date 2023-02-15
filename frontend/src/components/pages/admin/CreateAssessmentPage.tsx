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
  HStack,
  Radio,
  Box,
  Text,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import gradeOptions from "../../../constants/CreateAssessmentConstants";
import ErrorToast from "../../assessment-creation/ErrorToast";

const CreateAssessmentPage = (): React.ReactElement => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  const [validSubmit, setValidSubmit] = useState(true);

  const onSubmit = (data: any, e: any) => {
    setValidSubmit(true);
    console.log(data, e);
  };
  const onError = (errs: any, e: any) => {
    setValidSubmit(false);
  };

  const countryOptions = React.useMemo(() => countryList().getData(), []);

  return (
    <VStack align="left" width="75%" spacing={8}>
      <Text textStyle="eyebrow">Basic Information</Text>

      {!validSubmit && (
        <ErrorToast errorMessage="Please resolve all issues before publishing or saving" />
      )}

      <FormControl isRequired isInvalid={Boolean(errors.assessmentName)}>
        <FormLabel color="grey.400">Assessment Name</FormLabel>
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
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <FormControl isRequired isInvalid={Boolean(error)}>
              <FormLabel color="grey.400">Grade Level</FormLabel>
              <Select
                name={name}
                onChange={onChange}
                value={value}
                options={gradeOptions}
                placeholder=""
                useBasicStyles
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
              <FormLabel color="grey.400">Type of Assessment</FormLabel>
              <RadioGroup
                name={name}
                ref={ref}
                onChange={onChange}
                value={value}
              >
                <VStack align="left" spacing={0.5}>
                  <Radio value="beginning">Beginning of Grade</Radio>
                  <Radio value="end">End of Grade</Radio>
                </VStack>
              </RadioGroup>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </Box>

      <FormControl>
        <Text textStyle="subtitle2" mb="2">
          Curriculum
        </Text>
        <HStack width="100%">
          <Controller
            control={control}
            name="country"
            rules={{ required: "Please select a country" }}
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) => (
              <FormControl isRequired isInvalid={Boolean(error)} mr={2}>
                <FormLabel color="grey.400">Country</FormLabel>
                <Select
                  name={name}
                  onChange={onChange}
                  value={value}
                  options={countryOptions}
                  placeholder=""
                  useBasicStyles
                />
                <FormErrorMessage>{error?.message}</FormErrorMessage>
              </FormControl>
            )}
          />

          <FormControl isRequired isInvalid={Boolean(errors.region)}>
            <FormLabel color="grey.400">Region</FormLabel>
            <Input
              {...register("region", { required: "Please enter a region" })}
            />
            <FormErrorMessage> {errors.region?.message} </FormErrorMessage>
          </FormControl>
        </HStack>
      </FormControl>

      <Button onClick={handleSubmit(onSubmit, onError)}>Submit</Button>
    </VStack>
  );
};

export default CreateAssessmentPage;
