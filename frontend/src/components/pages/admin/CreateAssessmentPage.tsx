import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import countryList from "react-select-country-list";
import { useMutation } from "@apollo/client";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import { SAVE_ASSESSMENT } from "../../../APIClients/mutations/TestMutations";
import gradeOptions from "../../../constants/CreateAssessmentConstants";
import {
  Status,
  TestRequest,
  TestResponse,
  UseCase,
} from "../../../types/AssessmentTypes";
import CreateAssessementHeader from "../../assessments/assessment-creation/CreateAssessmentHeader";
import ErrorToast from "../../common/ErrorToast";

const CreateAssessmentPage = (): React.ReactElement => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  const location = useLocation();
  const { date } = location.state as { date: string };
  const [validSubmit, setValidSubmit] = useState(true);
  const [assessmentName, setAssessmentName] = useState("");
  const [createTest] = useMutation<{ createTest: TestResponse }>(
    SAVE_ASSESSMENT,
  );

  const onSubmit = async (data: any, e: any) => {
    setValidSubmit(true);
    const test: TestRequest = {
      name: data.assessmentName,
      questions: [],
      grade: data.grade.value,
      assessmentType: data.type,
      status: Status.DRAFT,
      curriculumCountry: data.country.value,
      curriculumRegion: data.region,
    };
    await createTest({ variables: { test } }).then((response) => {
      console.log("response data: ", response);
    });
    console.log(data);
  };
  const onError = (errs: any, e: any) => {
    setValidSubmit(false);
  };

  const handleSave = handleSubmit(onSubmit, onError);

  const countryOptions = React.useMemo(() => countryList().getData(), []);

  return (
    <Box>
      <CreateAssessementHeader
        assessmentName={assessmentName}
        date={date}
        save={handleSave}
      />
      <Box padding="1.5em 2em 0em 2em">
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
            <FormErrorMessage>
              {errors.assessmentName?.message}
            </FormErrorMessage>
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
                    <VStack align="left" spacing={0.5}>
                      <Radio value={UseCase.BEGINNING}>
                        Beginning of Grade
                      </Radio>
                      <Radio value={UseCase.END}>End of Grade</Radio>
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
            <HStack width="100%">
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
    </Box>
  );
};

export default CreateAssessmentPage;
