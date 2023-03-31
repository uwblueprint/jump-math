import React from "react";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
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
import { Select, SingleValue } from "chakra-react-select";

import { TestRequest } from "../../../APIClients/types/TestClientTypes";
import { Grade } from "../../../APIClients/types/UserClientTypes";
import gradeOptions from "../../../constants/CreateAssessmentConstants";
import { UseCase } from "../../../types/AssessmentTypes";
import ErrorToast from "../../common/ErrorToast";
import FormRadio from "../../common/FormRadio";

interface BasicInformationProps {
  setName: React.Dispatch<React.SetStateAction<string>>;
  register: UseFormRegister<TestRequest>;
  setValue: UseFormSetValue<TestRequest>;
  watch: UseFormWatch<TestRequest>;
  control: Control<TestRequest, any>;
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>;
  errorMessage: string;
}

const BasicInformation = ({
  setName,
  register,
  setValue,
  watch,
  control,
  errors,
  errorMessage,
}: BasicInformationProps): React.ReactElement => {
  const handleGradeChange = (
    option: SingleValue<{ value: Grade; label: string }>,
  ) => {
    if (option) {
      setValue("grade", option.value);
    }
  };

  const handleCountryChange = (
    option: SingleValue<{ value: string; label: string }>,
  ) => {
    if (option) {
      setValue("curriculumCountry", option.value);
    }
  };

  const countryOptions = React.useMemo(() => countryList().getData(), []);

  return (
    <Box width="100%">
      <VStack align="left" spacing={8} width="75%">
        <Text textStyle="eyebrow">Basic Information</Text>

        {errorMessage && <ErrorToast errorMessage={errorMessage} />}

        <FormControl isInvalid={Boolean(errors.name)} isRequired>
          <FormLabel color="grey.400">Assessment Name</FormLabel>
          <Input
            placeholder="e.g. Ontario Grade 5 Pre-Term Assessment"
            {...register("name", {
              onChange: (e) => {
                setName(e.target.value);
              },
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
