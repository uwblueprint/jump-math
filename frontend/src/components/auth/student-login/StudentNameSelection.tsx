import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import { STUDENT_SIGNUP_IMAGE } from "../../../assets/images";
import * as Routes from "../../../constants/Routes";
import NavigationButtons from "../teacher-signup/NavigationButtons";

const students = [
  {
    label: "Evans",
    value: "Evans",
  },
  {
    label: "Tony",
    value: "Tony",
  },
  {
    label: "John",
    value: "John",
  },
  {
    label: "Enzo",
    value: "Enzo",
  },
  {
    label: "Julia",
    value: "Julia",
  },
  {
    label: "Emily",
    value: "Emily",
  },
  {
    label: "Afsana",
    value: "Afsana",
  },
  {
    label: "George",
    value: "George",
  },
  {
    label: "Cyrus",
    value: "Cyrus",
  },
];
const StudentNameSelection = (): React.ReactElement => {
  const history = useHistory();
  const { control } = useForm();
  const title = "Student Login";
  const subtitle = "Please enter your name in the field or search for it below";
  const image = STUDENT_SIGNUP_IMAGE;
  const form = (
    <>
      <Box width="100%" pb="10%">
        <Controller
          control={control}
          name="grade"
          rules={{ required: "Please select a grade" }}
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <FormControl isRequired isInvalid={Boolean(error)}>
              <FormLabel color="grey.400">First Name</FormLabel>
              <Select
                name={name}
                onChange={onChange}
                options={students}
                value={value}
                placeholder="Search Name by typing it in field"
                useBasicStyles
              />
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </Box>
      <NavigationButtons
        onContinueClick={() => undefined}
        onBackClick={() => {
          history.push(Routes.HOME_PAGE);
        }}
        backButtonText="Back to Home"
      />
    </>
  );

  return (
    <AuthWrapper title={title} subtitle={subtitle} image={image} form={form} />
  );
};

export default StudentNameSelection;
