import React from "react";
import { useHistory } from "react-router-dom";
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

import { JUMP_MATH_LOGO } from "../../../assets/images";
import { STUDENT_LANDING_PAGE } from "../../../constants/Routes";
import { assessmentMetadata } from "../../../constants/StudentAssessmentConstants";
import QuestionSummary from "../../assessments/assessment-creation/QuestionSummary";
import QuestionTypeImages from "../../common/QuestionTypeImages";

const AssessmentSummaryPage = (): React.ReactElement => {
  const history = useHistory();
  const handleBackToHome = () => {
    history.push(STUDENT_LANDING_PAGE);
  };

  return (
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
            {assessmentMetadata.testName}
          </Text>
          <Text color="blue.300" textStyle="paragraph">
            Start Time: {assessmentMetadata.startDate} at{" "}
            {assessmentMetadata.startTime}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={14} pt="3em">
            <QuestionSummary
              pointCount={assessmentMetadata.totalPoints}
              questionCount={assessmentMetadata.numOfQuestions}
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
              <Text color="blue.300" marginBottom="14px" textStyle="subtitle2">
                Rules
              </Text>
              <Stack gap={3}>
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
  );
};

export default AssessmentSummaryPage;
