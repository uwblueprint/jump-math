/* eslint-disable react/prop-types */
import React from "react";
import { ChakraProvider, Box, Text, Stack, Button } from "@chakra-ui/react";
import {
  JUMP_MATH_LOGO,
  MULTI_SELECT,
  MULTI_CHOICE,
  SHORT_ANSWER,
} from "../../assets/images";
import theme from "../../themes";

type BoxProps = {
  children: React.ReactNode;
  top?: string;
  left?: string;
};

const InnerBox: React.FC<BoxProps> = ({ children, top, left }) => (
  <Box
    backgroundColor="blue.50"
    borderRadius="10px"
    position="relative"
    padding="10px"
    gap="40px"
    width="115px"
    height="115px"
    top={top}
    left={left}
  >
    {children}
  </Box>
);

const OutterBox: React.FC<BoxProps> = ({ children, top, left }) => (
  <Box
    backgroundColor="rgba(232, 237, 241, 0.3)"
    borderRadius="10px"
    position="absolute"
    padding="32px"
    gap="40px"
    width="480px"
    height="376px"
    top={top}
    left={left}
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

const questionTypeImages = assessmentMetadata.questionTypes.map(
  (type, index) => {
    switch (type) {
      case "Multiple choice":
        return (
          <InnerBox key={index} top="130px">
            <img
              src={MULTI_CHOICE.src}
              alt="multi-choice"
              style={{ width: "65px", marginTop: "17px", marginLeft: "15px" }}
            />
          </InnerBox>
        );
      case "Multi-Select":
        return (
          <InnerBox key={index} top="130px" left={`${25 + index * 2}px`}>
            <img
              src={MULTI_SELECT.src}
              alt="multi-select"
              style={{ width: "60px", marginTop: "20px", marginLeft: "20px" }}
            />
          </InnerBox>
        );
      case "Short Answer":
        return (
          <InnerBox key={index} top="130px" left={`${48 + index * 2}px`}>
            <img
              src={SHORT_ANSWER.src}
              alt="short-answer"
              style={{ width: "60px", marginTop: "20px", marginLeft: "18px" }}
            />
          </InnerBox>
        );
      default:
        return null;
    }
  },
);

const AssessmentSummary = (): React.ReactElement => {
  return (
    <>
      <img
        src={JUMP_MATH_LOGO.src}
        alt="Jump Math Logo"
        style={{ width: "200px", marginTop: "100px", marginLeft: "75px" }}
      />
      <Text
        style={{
          marginLeft: "300px",
          marginTop: "-73px",
          fontSize: "30px",
          color: "#154472",
        }}
      >
        {assessmentMetadata.test}
        <Text
          style={{ fontSize: "18px", color: "#154472", fontWeight: "normal" }}
        >
          {assessmentMetadata.startTime}
        </Text>
      </Text>
      <OutterBox top="140px" left="300px">
        <Text
          style={{
            marginBottom: "14px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#154472",
          }}
        >
          Assesment Question Summary
        </Text>
        <Text>
          <Stack direction="row" pos="absolute" top="75px" fontSize="14px">
            <Text>{assessmentMetadata.questionText}</Text>
            <Text style={{ marginLeft: "260px" }}>
              {assessmentMetadata.numOfQuestions}
            </Text>
          </Stack>
          <Stack direction="row" pos="absolute" top="100px" fontSize="14px">
            <Text>{assessmentMetadata.totalPointsText}</Text>
            <Text style={{ marginLeft: "250px" }}>
              {assessmentMetadata.totalPoints}{" "}
            </Text>
          </Stack>
          <Stack pos="absolute" top="150px" fontSize="14px">
            <Text>{assessmentMetadata.questionTypesText}:</Text>
          </Stack>
          <Stack
            direction="row"
            pos="absolute"
            top="325px"
            left="42px"
            fontSize="14px"
          >
            <Text>{assessmentMetadata.questionTypes[0]}</Text>
            <Text style={{ marginLeft: "59px" }}>
              {assessmentMetadata.questionTypes[1]}{" "}
            </Text>
            <Text style={{ marginLeft: "66px" }}>
              {assessmentMetadata.questionTypes[2]}{" "}
            </Text>
          </Stack>
        </Text>
        <Stack direction="row">{questionTypeImages}</Stack>
      </OutterBox>
      <OutterBox top="140px" left="825px">
        <Stack pos="absolute" fontSize="14px">
          <Text
            style={{
              marginBottom: "14px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#154472",
            }}
          >
            Rules
          </Text>
          <Stack>
            {assessmentMetadata.rules.split("\n").map((line, index) => (
              <Text key={index} style={{ marginBottom: "10px" }}>
                {line}
              </Text>
            ))}
          </Stack>
        </Stack>
      </OutterBox>
      <Button
        type="button"
        width="14%"
        height="10%"
        marginTop="520px"
        marginLeft="1100px"
        size="md"
        variant="primary"
      >
        Start Test
      </Button>
      <Button
        type="button"
        width="14%"
        height="10%"
        marginTop="-67px"
        marginLeft="875px"
        size="md"
        variant="secondary"
      >
        Back to Home
      </Button>
    </>
  );
};

export default AssessmentSummary;
