import React from "react";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import countryList from "react-select-country-list";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import gradeOptions from "../../../constants/CreateAssessmentConstants";
import { AssessmentData, UseCase } from "../../../types/AssessmentTypes";
import ErrorToast from "../../common/ErrorToast";
import FormRadio from "../../common/FormRadio";

interface BasicInformationProps {
  setAssessmentName: React.Dispatch<React.SetStateAction<string>>;
  register: UseFormRegister<AssessmentData>;
  control: Control<AssessmentData, any>;
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>;
  validSubmit: boolean;
}

const BasicInformation = ({
  setAssessmentName,
  register,
  control,
  errors,
  validSubmit,
}: BasicInformationProps): React.ReactElement => {
  const countryOptions = React.useMemo(() => countryList().getData(), []);

  return (
    <Box width="100%">
      <VStack align="left" spacing={8} width="75%">
        <Text textStyle="eyebrow">Basic Information</Text>

        {!validSubmit && (
          <ErrorToast errorMessage="Please resolve all issues before publishing or saving" />
        )}

        <FormControl isInvalid={Boolean(errors.assessmentName)} isRequired>
          <FormLabel color="grey.400">Assessment Name</FormLabel>
          <Input
            placeholder="e.g. Ontario Grade 5 Pre-Term Assessment"
            {...register("assessmentName", {
              onChange: (e) => {
                setAssessmentName(e.target.value);
              },
              required: "Please enter a name for the assessment",
            })}
          />
          <FormErrorMessage>{errors.assessmentName?.message}</FormErrorMessage>
        </FormControl>

        <Box width="50%">
          <Controller
            control={control}
            name="grade"
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) => (
              <FormControl isInvalid={Boolean(error)} isRequired>
                <FormLabel color="grey.400">Grade Level</FormLabel>
                <Select
                  name={name}
                  onChange={onChange}
                  options={gradeOptions}
                  placeholder=""
                  useBasicStyles
                  value={value}
                />
                <FormErrorMessage>{error?.message}</FormErrorMessage>
              </FormControl>
            )}
            rules={{ required: "Please select a grade" }}
          />
        </Box>

        <Box width="50%">
          <Controller
            control={control}
            name="type"
            render={({
              field: { onChange, value, name, ref },
              fieldState: { error },
            }) => (
              <FormControl isInvalid={Boolean(error)} isRequired>
                <FormLabel color="grey.400">Type of Assessment</FormLabel>
                <RadioGroup
                  ref={ref}
                  name={name}
                  onChange={onChange}
                  value={value}
                >
                  <VStack align="left" spacing={2}>
                    <FormRadio
                      isSelected={value === UseCase.BEGINNING}
                      text="Beginning of Grade"
                      value={UseCase.BEGINNING}
                    />
                    <FormRadio
                      isSelected={value === UseCase.END}
                      text="End of Grade"
                      value={UseCase.END}
                    />
                  </VStack>
                </RadioGroup>
                <FormErrorMessage>{error?.message}</FormErrorMessage>
              </FormControl>
            )}
            rules={{ required: "Please select a type of assessment" }}
          />
        </Box>

        <FormControl>
          <Text mb="2" textStyle="subtitle2">
            Curriculum
          </Text>
          <HStack alignItems="flex-start" width="100%">
            <Controller
              control={control}
              name="country"
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <FormControl
                  isInvalid={Boolean(error)}
                  isRequired
                  mr={2}
                  variant="paragraph"
                >
                  <FormLabel color="grey.400">Country</FormLabel>
                  <Select
                    name={name}
                    onChange={onChange}
                    options={countryOptions}
                    placeholder=""
                    useBasicStyles
                    value={value}
                  />
                  <FormErrorMessage>{error?.message}</FormErrorMessage>
                </FormControl>
              )}
              rules={{ required: "Please select a country" }}
            />

            <FormControl
              isInvalid={Boolean(errors.region)}
              isRequired
              variant="paragraph"
            >
              <FormLabel color="grey.400">Region</FormLabel>
              <Input
                {...register("region", { required: "Please enter a region" })}
              />
              <FormErrorMessage> {errors.region?.message} </FormErrorMessage>
            </FormControl>
          </HStack>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default BasicInformation;
