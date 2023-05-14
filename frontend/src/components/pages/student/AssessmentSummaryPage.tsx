import React, { useContext, useState } from "react";
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
import {
  ASSESSMENT_EXPERIENCE_PAGE,
  HOME_PAGE,
} from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import StudentContext from "../../../contexts/StudentContext";
import { getReadableDateTime } from "../../../utils/GeneralUtils";
import AssessmentInfo from "../../assessments/student-experience/pre-assessment/AssessmentInfo";
import AssessmentRules from "../../assessments/student-experience/pre-assessment/AssessmentRules";
import Modal from "../../common/Modal";

const AssessmentSummaryPage = (): React.ReactElement => {
  const { test, testSession } = useContext(StudentContext);

  const history = useHistory();
  const { setAuthenticatedUser } = useContext(AuthContext);
  const handleBackToHome = () => {
    setAuthenticatedUser(null);
    history.push(HOME_PAGE);
  };

  const [showBeginTestModal, setShowBeginTestModal] = useState(false);
  const handleStartTest = () => {
    history.push(ASSESSMENT_EXPERIENCE_PAGE);
  };

  return (
    <>
      {test && testSession && (
        <HStack alignItems="flex-start" pt="4em">
          <Image
            alt="Jump Math Logo"
            mx="2em"
            src={JUMP_MATH_LOGO.src}
            width="15%"
          />
          <VStack
            align="left"
            height="85vh"
            justifyContent="space-between"
            pr="4em"
            width="100%"
          >
            <VStack align="left">
              <Text color="blue.300" textStyle="header4">
                {test.name}
              </Text>
              <Text color="blue.300" textStyle="paragraph">
                Start Time: {getReadableDateTime(testSession.startDate)}
              </Text>
              <VStack align="center">
                <SimpleGrid
                  columns={{ base: 1, md: testSession.notes ? 2 : 1 }}
                  gap={14}
                  pt="3em"
                  width={testSession.notes ? "100%" : "50%"}
                >
                  <AssessmentInfo questions={test.questions} />
                  {testSession.notes && (
                    <AssessmentRules body={testSession.notes} />
                  )}
                </SimpleGrid>
              </VStack>
            </VStack>
            <HStack justifyContent="flex-end" spacing="1%" width="100%">
              <Button onClick={handleBackToHome} variant="secondary">
                Back to Home
              </Button>
              <Button
                onClick={() => setShowBeginTestModal(true)}
                variant="primary"
              >
                Start Test
              </Button>
            </HStack>
          </VStack>
        </HStack>
      )}
      <Modal
        body="Once you start, you may not exit the browser or it will end the test automatically."
        header="Begin the test?"
        isOpen={showBeginTestModal}
        onClose={() => setShowBeginTestModal(false)}
        onSubmit={handleStartTest}
      />
    </>
  );
};

export default AssessmentSummaryPage;
