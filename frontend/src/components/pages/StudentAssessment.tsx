/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Text,
  Stack,
  Button,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  JUMP_MATH_LOGO,
  MULTI_SELECT,
  MULTI_CHOICE,
  SHORT_ANSWER,
} from "../../assets/images";
import { STUDENT_LANDING } from "../../constants/Routes";

type BoxProps = {
  children: React.ReactNode;
  marginTop?: string;
  marginLeft?: string;
};

const InnerBox: React.FC<BoxProps> = ({ children, marginTop, marginLeft }) => (
  <Box
    backgroundColor="blue.50"
    borderRadius="10px"
    position="absolute"
    padding="10px"
    gap="40px"
    width="115px"
    height="115px"
    marginTop={marginTop}
    marginLeft={marginLeft}
  >
    {children}
  </Box>
);

const OuterBox: React.FC<BoxProps> = ({ children, marginTop, marginLeft }) => (
  <Box
    backgroundColor="rgba(232, 237, 241, 0.2)"
    borderRadius="10px"
    position="absolute"
    padding="32px"
    width="480px"
    height="376px"
    marginTop={marginTop}
    marginLeft={marginLeft}
  >
    {children}
  </Box>
);

const assessmentMetadata = {
  numOfQuestions: 12,
  totalPoints: "50 + 1 (Bonus)",
  questionTypes: ["Multiple choice", "Multi-Select", "Short Answer"],
  rules:
    "The test WILL be monitored so please close any windows before starting the test. \nYou will have 1 hour to complete this test. No aids are permitted. \nIf you need clarification or assistance, please raise your hand quietly and I will come to you. \nGood Luck! \n- Mr. Roberts",
  questionText: "Number of Questions",
  totalPointsText: "Total Points",
  questionTypesText: "Question Types",
  startTime: "Start Time: September 15, 2022 at 2:00pm",
  test: "Unit 0 Review Test",
};

const questionTypeImages = (
  <HStack marginLeft="2%" marginTop="6%" spacing="15%">
    {assessmentMetadata.questionTypes.map((type, index) => {
      switch (type) {
        case "Multiple choice":
          return (
            <VStack>
              <Text fontSize="14px" marginTop="140%">
                {type}
              </Text>
              <InnerBox key={index}>
                <Image
                  src={MULTI_CHOICE.src}
                  alt="multi-choice"
                  width="70%"
                  marginTop="15%"
                  marginLeft="15%"
                />
              </InnerBox>
            </VStack>
          );
        case "Multi-Select":
          return (
            <VStack marginBottom="4%">
              <Text fontSize="14px" marginTop="175%">
                {type}
              </Text>
              <InnerBox key={index}>
                <Image
                  src={MULTI_SELECT.src}
                  alt="multi-select"
                  width="65%"
                  marginTop="18%"
                  marginLeft="18%"
                />
              </InnerBox>
            </VStack>
          );
        case "Short Answer":
          return (
            <VStack>
              <Text fontSize="14px" marginTop="160%">
                {type}
              </Text>
              <InnerBox key={index}>
                <Image
                  src={SHORT_ANSWER.src}
                  alt="short-answer"
                  width="65%"
                  marginTop="20%"
                  marginLeft="18%"
                />
              </InnerBox>
            </VStack>
          );
        default:
          return null;
      }
    })}
  </HStack>
);

const AssessmentSummary = (): React.ReactElement => {
  const history = useHistory();
  const handleBackToHome = () => {
    history.push(STUDENT_LANDING);
  };

  return (
    <>
      <HStack marginTop="8%" marginLeft="10%">
        <HStack marginLeft="-7%" marginBottom="15%" spacing="3%">
          <Image src={JUMP_MATH_LOGO.src} alt="Jump Math Logo" width="25%" />
          <Text textStyle="header4" color="blue.300">
            {assessmentMetadata.test}
            <Text fontSize="18px" color="blue.300">
              {assessmentMetadata.startTime}
            </Text>
          </Text>
        </HStack>
        <HStack gap={525}>
          <VStack marginLeft="-75%">
            <OuterBox>
              <Text textStyle="subtitle2" color="blue.300">
                Assesment Question Summary
              </Text>
              <Stack
                pos="relative"
                direction="row"
                fontSize="14px"
                marginTop="4%"
              >
                <Text marginRight="56%">{assessmentMetadata.questionText}</Text>
                <Text>{assessmentMetadata.numOfQuestions}</Text>
              </Stack>
              <Stack direction="row" pos="relative" fontSize="14px">
                <Text marginRight="53%">
                  {assessmentMetadata.totalPointsText}
                </Text>
                <Text>{assessmentMetadata.totalPoints}</Text>
              </Stack>
              <Stack pos="relative" marginTop="3%" fontSize="14px">
                <Text>{assessmentMetadata.questionTypesText}:</Text>
              </Stack>
              {questionTypeImages}
            </OuterBox>
          </VStack>
          <VStack>
            <OuterBox>
              <Stack pos="relative" fontSize="14px">
                <Text
                  color="blue.300"
                  textStyle="subtitle2"
                  marginBottom="14px"
                >
                  Rules
                </Text>
                <Stack gap={3}>
                  {assessmentMetadata.rules.split("\n").map((line, index) => (
                    <Text key={index}>{line}</Text>
                  ))}
                </Stack>
              </Stack>
              <HStack gap={4} marginTop="35%" marginLeft="15%">
                <Button
                  type="button"
                  height="10%"
                  size="md"
                  variant="secondary"
                  onClick={handleBackToHome}
                >
                  Back to Home
                </Button>
                <Button type="button" height="10%" size="md" variant="primary">
                  Start Test
                </Button>
              </HStack>
            </OuterBox>
          </VStack>
        </HStack>
      </HStack>
    </>
  );
};

export default AssessmentSummary;
