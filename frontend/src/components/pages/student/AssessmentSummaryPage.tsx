import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { JUMP_MATH_LOGO } from "../../../assets/images";
import { HOME_PAGE } from "../../../constants/Routes";
import { assessmentMetadata } from "../../../constants/StudentAssessmentConstants";
import AuthContext from "../../../contexts/AuthContext";
import StudentContext from "../../../contexts/StudentContext";
import AssessmentInfo from "../../assessments/student-experience/AssessmentInfo";
import AssessmentRules from "../../assessments/student-experience/AssessmentRules";

const AssessmentSummaryPage = (): React.ReactElement => {
  const { test } = useContext(StudentContext);

  const history = useHistory();
  const { setAuthenticatedUser } = useContext(AuthContext);
  const handleBackToHome = () => {
    setAuthenticatedUser(null);
    history.push(HOME_PAGE);
  };

  return (
    <>
      {test && (
        <HStack alignItems="flex-start" pt="4em">
          <Image
            alt="Jump Math Logo"
            mx="2em"
            src={JUMP_MATH_LOGO.src}
            width="15%"
          />
          <VStack height="85vh" justifyContent="space-between" pr="4em">
            <VStack align="left">
              <Text color="blue.300" textStyle="header4">
                {test.name}
              </Text>
              <Text color="blue.300" textStyle="paragraph">
                {/* update after test session backend is updated */}
                Start Time: {assessmentMetadata.startDate} at{" "}
                {assessmentMetadata.startTime}
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={14} pt="3em">
                <AssessmentInfo questions={test.questions} />
                {/* update after test session backend is updated */}
                <AssessmentRules body={assessmentMetadata.rules} />
              </SimpleGrid>
            </VStack>
            <HStack justifyContent="flex-end" spacing="1%" width="100%">
              <Button onClick={handleBackToHome} variant="secondary">
                Back to Home
              </Button>
              <Button variant="primary">Start Test</Button>
            </HStack>
          </VStack>
        </HStack>
      )}{" "}
    </>
  );
};

export default AssessmentSummaryPage;
