import React from "react";
import {
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import { STUDENT_SIGNUP_IMAGE } from "../../../assets/images";
import { LeftArrowIcon } from "../../../assets/icons";
import * as Routes from "../../../constants/Routes";

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
    <Controller
      control={control}
      name="grade"
      rules={{ required: "Please select a grade" }}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
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
          <Button variant="primary" mt="10%" width="100%">
            Continue
          </Button>
          <Button
            onClick={() => {
              history.push(Routes.HOME_PAGE);
            }}
            mt="10%"
            width="100%"
            leftIcon={<LeftArrowIcon />}
            textStyle="paragraph"
            fontWeight="500"
            variant="link"
            _hover={{ color: "blue.200", textDecoration: "none" }}
            color="blue.300"
          >
            Back to Home
          </Button>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );

  return (
    <AuthWrapper title={title} subtitle={subtitle} image={image} form={form} />
  );
};

export default StudentNameSelection;
