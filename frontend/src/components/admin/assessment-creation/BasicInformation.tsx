import React from "react";
import type {
  Control,
  FieldErrorsImpl,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
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
import type { SingleValue } from "chakra-react-select";
import { Select } from "chakra-react-select";

import type { TestRequest } from "../../../APIClients/types/TestClientTypes";
import { UseCase } from "../../../types/AssessmentTypes";
import type {
  GradeOption,
  StringOption,
} from "../../../types/SelectInputTypes";
import { gradeOptions } from "../../../utils/AssessmentUtils";
import FormRadio from "../../common/form/FormRadio";
import ErrorToast from "../../common/info/toasts/ErrorToast";

interface BasicInformationProps {
  register: UseFormRegister<TestRequest>;
  setValue: UseFormSetValue<TestRequest>;
  watch: UseFormWatch<TestRequest>;
  control: Control<TestRequest, unknown>;
  errors: Partial<FieldErrorsImpl<TestRequest>>;
  errorMessage: string;
  clearErrors: UseFormClearErrors<TestRequest>;
}

const BasicInformation = ({
  register,
  setValue,
  watch,
  control,
  errors,
  errorMessage,
  clearErrors,
}: BasicInformationProps): React.ReactElement => {
  const handleGradeChange = (option: SingleValue<GradeOption>) => {
    if (option) {
      setValue("grade", option.value);
      clearErrors("grade");
    }
  };

  const handleCountryChange = (option: SingleValue<StringOption>) => {
    if (option) {
      setValue("curriculumCountry", option.value);
      clearErrors("curriculumCountry");
    }
  };

  const countryOptions = React.useMemo(() => countryList().getData(), []);

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
          <Controller
            control={control}
            name="grade"
            render={({ field: { name }, fieldState: { error } }) => (
              <FormControl isInvalid={Boolean(error)} isRequired>
                <FormLabel color="grey.400">Grade Level</FormLabel>
                <Select
                  name={name}
                  onChange={handleGradeChange}
                  options={gradeOptions}
                  placeholder="Select a grade"
                  selectedOptionStyle="check"
                  useBasicStyles
                  value={
                    gradeOptions.find(
                      (option) => option.value === watch("grade"),
                    ) || undefined
                  }
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
            <Controller
              control={control}
              name="curriculumCountry"
              render={({ field: { name }, fieldState: { error } }) => (
                <FormControl
                  isInvalid={Boolean(error)}
                  isRequired
                  mr={2}
                  variant="paragraph"
                >
                  <FormLabel color="grey.400">Country</FormLabel>
                  <Select
                    name={name}
                    onChange={handleCountryChange}
                    options={countryOptions}
                    placeholder="Select a country"
                    useBasicStyles
                    value={
                      countryOptions.find(
                        (option) => option.value === watch("curriculumCountry"),
                      ) || undefined
                    }
                  />
                  <FormErrorMessage>{error?.message}</FormErrorMessage>
                </FormControl>
              )}
              rules={{ required: "Please select a country" }}
            />

            <FormControl
              isInvalid={Boolean(errors.curriculumRegion)}
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
