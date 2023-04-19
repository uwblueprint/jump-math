import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import { STUDENT_SIGNUP_IMAGE } from "../../../assets/images";
import { ASSESSMENT_SUMMARY_PAGE, HOME_PAGE } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import AuthWrapper from "../AuthWrapper";
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

interface NameSelectionProps {
  testId: string;
  testSessionId: string;
}

const NameSelection = ({
  testId,
  testSessionId,
}: NameSelectionProps): React.ReactElement => {
  const { setAuthenticatedUser } = useContext(AuthContext);
  const history = useHistory();
  const { control } = useForm();
  const title = "Student Login";
  const subtitle = "Please enter your name in the field or search for it below";
  const image = STUDENT_SIGNUP_IMAGE;
  const form = (
    <>
      <Box pb="10%" width="100%">
        <Controller
          control={control}
          name="grade"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={Boolean(error)} isRequired>
              <FormLabel color="grey.400">First Name</FormLabel>
              <Select
                name={name}
                onChange={onChange}
                options={students}
                placeholder="Search Name by typing it in field"
                useBasicStyles
                value={value}
              />
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
          rules={{ required: "Please select a grade" }}
        />
      </Box>
      <NavigationButtons
        backButtonText="Back to Home"
        onBackClick={() => {
          history.push(HOME_PAGE);
        }}
        onContinueClick={() => {
          setAuthenticatedUser({
            id: "temporary",
            firstName: "temporary",
            lastName: "temporary",
            studentNumber: "temporary",
            role: "Student",
          });
          history.push(ASSESSMENT_SUMMARY_PAGE);
        }}
      />
    </>
  );

  return (
    <AuthWrapper form={form} image={image} subtitle={subtitle} title={title} />
  );
};

export default NameSelection;
