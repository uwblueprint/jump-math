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
import { STUDENT_LANDING } from "../../../constants/Routes";
import { assessmentMetadata } from "../../../constants/StudentAssessmentConstants";
import QuestionTypeImages from "../../common/QuestionTypeImages";

const AssessmentSummary = (): React.ReactElement => {
  const history = useHistory();
  const handleBackToHome = () => {
    history.push(STUDENT_LANDING);
  };

  return (
    <HStack alignItems="flex-start" pt="4em">
      <Image
        src={JUMP_MATH_LOGO.src}
        alt="Jump Math Logo"
        width="15%"
        mx="2em"
      />
      <VStack pr="4em" height="85vh" justifyContent="space-between">
        <VStack align="left">
          <Text textStyle="header4" color="blue.300">
            {assessmentMetadata.testName}
          </Text>
          <Text textStyle="paragraph" color="blue.300">
            Start Time: {assessmentMetadata.startDate} at{" "}
            {assessmentMetadata.startTime}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={14} pt="2em">
            <Box
              backgroundColor="rgba(232, 237, 241, 0.2)"
              borderRadius="10px"
              padding="2em"
              marginTop="7%"
            >
              <Text textStyle="subtitle2" color="blue.300" mb="2em">
                Assessment Question Summary
              </Text>
              <HStack justifyContent="space-between">
                {/* TODO: switch to smallerParagraph after Cindy merges her PR */}
                <Text textStyle="paragraph">Number of Questions:</Text>
                <Text textStyle="paragraph">
                  {assessmentMetadata.numOfQuestions}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text textStyle="paragraph">Total Number of Points:</Text>
                <Text textStyle="paragraph">
                  {assessmentMetadata.totalPoints}
                </Text>
              </HStack>
              <br />
              <Text textStyle="paragraph">Question Types:</Text>
              <QuestionTypeImages
                questionTypes={assessmentMetadata.questionTypes}
              />
            </Box>
            <Box
              backgroundColor="rgba(232, 237, 241, 0.2)"
              borderRadius="10px"
              padding="2em"
              marginTop="7%"
            >
              <Text color="blue.300" textStyle="subtitle2" marginBottom="14px">
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
        <HStack spacing="3%" width="100%" justifyContent="flex-end">
          {/* TODO: update size="sm" after Cindy merges her PR */}
          <Button variant="secondary" onClick={handleBackToHome}>
            Back to Home
          </Button>
          <Button variant="primary">Start Test</Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default AssessmentSummary;
