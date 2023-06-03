import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import type { SingleValue } from "chakra-react-select";
import { Select } from "chakra-react-select";

import { GET_CLASS_BY_TEST_SESSION } from "../../../APIClients/queries/ClassQueries";
import type { StudentResponse } from "../../../APIClients/types/ClassClientTypes";
import type { TestSessionSetupData } from "../../../APIClients/types/TestSessionClientTypes";
import { STUDENT_SIGNUP_IMAGE } from "../../../assets/images";
import { HOME_PAGE, STUDENT_LANDING_PAGE } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import type { StudentOption } from "../../../types/SelectInputTypes";
import AuthWrapper from "../AuthWrapper";
import NavigationButtons from "../teacher-signup/NavigationButtons";

interface NameSelectionProps {
  testId: string;
  testSession: TestSessionSetupData;
}

const NameSelection = ({
  testId,
  testSession,
}: NameSelectionProps): React.ReactElement => {
  const { setAuthenticatedUser } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_CLASS_BY_TEST_SESSION, {
    variables: { testSessionId: testSession.id },
  });
  const students: StudentResponse[] = data?.classByTestSession.students ?? [];
  const className = data?.classByTestSession.className ?? "";

  const [selectedStudent, setSelectedStudent] = useState<StudentOption>();
  const [error, setError] = useState(false);
  const handleStudentChange = (option: SingleValue<StudentOption>) => {
    if (option) {
      setSelectedStudent(option);
      setError(false);
    }
  };

  const history = useHistory();
  const title = "Student Login";
  const subtitle = "Please enter your name in the field or search for it below";
  const image = STUDENT_SIGNUP_IMAGE;
  const form = (
    <>
      <Box pb="10%" width="100%">
        <FormControl isInvalid={error} isRequired>
          <FormLabel color="grey.400">Student Name</FormLabel>
          <Select
            isLoading={loading}
            onChange={handleStudentChange}
            options={students.map((student) => ({
              value: student,
              label: student.studentNumber
                ? `${student.firstName} ${student.lastName} (${student.studentNumber})`
                : `${student.firstName} ${student.lastName}`,
            }))}
            placeholder="Search for your name by typing it in the field"
            useBasicStyles
            value={selectedStudent}
          />
          <FormErrorMessage>Please select your name</FormErrorMessage>
        </FormControl>
      </Box>
      <NavigationButtons
        backButtonText="Back to Home"
        onBackClick={() => {
          history.push(HOME_PAGE);
        }}
        onContinueClick={() => {
          if (!selectedStudent) {
            setError(true);
          } else {
            setAuthenticatedUser({
              ...selectedStudent.value,
              role: "Student",
            });
            history.push({
              pathname: STUDENT_LANDING_PAGE,
              state: {
                testId,
                testSession,
                className,
              },
            });
          }
        }}
      />
    </>
  );

  return (
    <AuthWrapper form={form} image={image} subtitle={subtitle} title={title} />
  );
};

export default NameSelection;
