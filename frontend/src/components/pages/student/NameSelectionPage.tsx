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
<<<<<<<< HEAD:frontend/src/components/auth/student-login/NameSelection.tsx
import { ASSESSMENT_SUMMARY_PAGE, HOME_PAGE } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import AuthWrapper from "../AuthWrapper";
import NavigationButtons from "../teacher-signup/NavigationButtons";
========
import { HOME_PAGE } from "../../../constants/Routes";
import AuthWrapper from "../../auth/AuthWrapper";
import NavigationButtons from "../../auth/teacher-signup/NavigationButtons";
>>>>>>>> 81cd3d0 (initial commit):frontend/src/components/pages/student/NameSelectionPage.tsx

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
<<<<<<<< HEAD:frontend/src/components/auth/student-login/NameSelection.tsx
const NameSelection = (): React.ReactElement => {
  const { setAuthenticatedUser } = useContext(AuthContext);
========
const NameSelectionPage = (): React.ReactElement => {
>>>>>>>> 81cd3d0 (initial commit):frontend/src/components/pages/student/NameSelectionPage.tsx
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
            role: "Student",
            testId: "temporary",
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

<<<<<<<< HEAD:frontend/src/components/auth/student-login/NameSelection.tsx
export default NameSelection;
========
export default NameSelectionPage;
>>>>>>>> 81cd3d0 (initial commit):frontend/src/components/pages/student/NameSelectionPage.tsx
