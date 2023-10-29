import React, { type ReactElement, useMemo } from "react";
import type {
  Control,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import { Controller } from "react-hook-form";
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

import type { TestRequest } from "../../../APIClients/types/TestClientTypes";
import { UseCase } from "../../../types/AssessmentTypes";
import { gradeOptions } from "../../../utils/AssessmentUtils";
import ControlledSelect from "../../common/form/ControlledSelect";
import FormRadio from "../../common/form/FormRadio";
import ErrorToast from "../../common/info/toasts/ErrorToast";

interface BasicInformationProps {
  register: UseFormRegister<TestRequest>;
  control: Control<TestRequest, unknown>;
  errors: Partial<FieldErrorsImpl<TestRequest>>;
  errorMessage: string;
}

const BasicInformation = ({
  register,
  control,
  errors,
  errorMessage,
}: BasicInformationProps): ReactElement => {
  const countryOptions = useMemo(() => countryList().getData(), []);

  return (
    <Box width="100%">
      <VStack align="left" spacing={8} width="75%">
        {errorMessage && <ErrorToast errorMessage={errorMessage} />}
        <Text textStyle="eyebrow">Basic Information</Text>
        <FormControl isInvalid={Boolean(errors.name)} isRequired>
          <FormLabel color="grey.400">Assessment Name</FormLabel>
          <Input
            placeholder="e.g. Ontario Grade 5 Pre-Term Assessment"
            {...register("name", {
              required: "Please enter a name for the assessment",
            })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <Box width="50%">
          <FormControl isInvalid={!!errors.grade} isRequired>
            <FormLabel color="grey.400">Grade Level</FormLabel>
            <ControlledSelect
              isRequired
              name="grade"
              options={gradeOptions}
              placeholder="Select a grade"
            />
            <FormErrorMessage>{errors.grade?.message}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box width="50%">
          <Controller
            control={control}
            name="assessmentType"
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
            <FormControl
              isInvalid={!!errors.curriculumCountry?.message}
              isRequired
              mr={2}
              variant="paragraph"
            >
              <FormLabel color="grey.400">Country</FormLabel>
              <ControlledSelect
                isRequired
                name="curriculumCountry"
                options={countryOptions}
                placeholder="Select a country"
              />
              <FormErrorMessage>{errors.grade?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.curriculumRegion}
              isRequired
              variant="paragraph"
            >
              <FormLabel color="grey.400">Region</FormLabel>
              <Input
                placeholder="Enter a region"
                {...register("curriculumRegion", {
                  required: "Please enter a region",
                })}
              />
              <FormErrorMessage>
                {errors.curriculumRegion?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default BasicInformation;
