import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import GET_CLASS_BY_TEST_SESSION from "../../../APIClients/queries/ClassQueries";
import { StudentResponse } from "../../../APIClients/types/ClassClientTypes";
import { STUDENT_SIGNUP_IMAGE } from "../../../assets/images";
import { ASSESSMENT_SUMMARY_PAGE, HOME_PAGE } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import AuthWrapper from "../AuthWrapper";
import NavigationButtons from "../teacher-signup/NavigationButtons";

interface NameSelectionProps {
  testId: string;
  testSessionId: string;
}

const NameSelection = ({
  testId,
  testSessionId,
}: NameSelectionProps): React.ReactElement => {
  const [students, setStudents] = useState<StudentResponse[]>([]);
  useQuery(GET_CLASS_BY_TEST_SESSION, {
    variables: { testSessionId },
    onCompleted: (data) => {
      setStudents(
        data.classByTestSession.students.map(
          (student: StudentResponse) => student,
        ),
      );
    },
  });

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
            fieldState: { error: fieldError },
          }) => (
            <FormControl isInvalid={Boolean(fieldError)} isRequired>
              <FormLabel color="grey.400">First Name</FormLabel>
              <Select
                name={name}
                onChange={onChange}
                options={students.map((student) => ({
                  value: student.id,
                  label: student.studentNumber
                    ? `${student.firstName} ${student.lastName} (${student.studentNumber})`
                    : `${student.firstName} ${student.lastName}`,
                }))}
                placeholder="Search Name by typing it in field"
                useBasicStyles
                value={value}
              />
              <FormErrorMessage>{fieldError?.message}</FormErrorMessage>
            </FormControl>
          )}
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
