import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { GET_TEST } from "../../../APIClients/queries/TestQueries";
import { TestResponse } from "../../../APIClients/types/TestClientTypes";
import { JUMP_MATH_LOGO } from "../../../assets/images";
import { HOME_PAGE } from "../../../constants/Routes";
import { assessmentMetadata } from "../../../constants/StudentAssessmentConstants";
import AuthContext from "../../../contexts/AuthContext";
import StudentContext from "../../../contexts/StudentContext";
import QuestionSummary from "../../assessments/assessment-creation/QuestionSummary";
import ErrorState from "../../common/ErrorState";
import LoadingState from "../../common/LoadingState";
import QuestionTypeImages from "../../common/QuestionTypeImages";

const AssessmentSummaryPage = (): React.ReactElement => {
  const { state } = useLocation<string>();
  const { testId, setTestId } = useContext(StudentContext);

  useEffect(() => {
    setTestId(state);
  }, [state, setTestId]);

  const { loading, data, error } = useQuery<{ test: TestResponse }>(GET_TEST, {
    fetchPolicy: "cache-and-network",
    variables: { id: testId },
    skip: !testId,
  });

  const history = useHistory();
  const { setAuthenticatedUser } = useContext(AuthContext);
  const handleBackToHome = () => {
    setAuthenticatedUser(null);
    history.push(HOME_PAGE);
  };

  return (
    <>
      {loading && <LoadingState fullPage />}
      {error && <ErrorState fullPage />}
      {data && (
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
                {data.test.name}
              </Text>
              <Text color="blue.300" textStyle="paragraph">
                {/* update after test session backend is updated */}
                Start Time: {assessmentMetadata.startDate} at{" "}
                {assessmentMetadata.startTime}
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={14} pt="3em">
                <QuestionSummary
                  pointCount={assessmentMetadata.totalPoints}
                  questionCount={data.test.questions.length}
                >
                  <VStack align="left" width="100%">
                    <br />
                    <Text paddingBottom="2" textStyle="smaller-paragraph">
                      Question Types:
                    </Text>
                    <QuestionTypeImages
                      questionTypes={assessmentMetadata.questionTypes}
                    />
                  </VStack>
                </QuestionSummary>
                <Box
                  backgroundColor="rgba(232, 237, 241, 0.2)"
                  borderRadius="10px"
                  padding="2em"
                >
                  <Text
                    color="blue.300"
                    marginBottom="14px"
                    textStyle="subtitle2"
                  >
                    Rules
                  </Text>
                  <Stack gap={3}>
                    {/* update after test session backend is updated */}
                    {assessmentMetadata.rules.split("\n").map((line, index) => (
                      <Text key={index} textStyle="paragraph">
                        {line}
                      </Text>
                    ))}
                  </Stack>
                </Box>
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
      )}
    </>
  );
};

export default AssessmentSummaryPage;
