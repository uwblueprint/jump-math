/* eslint-disable react/prop-types */
import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Stack,
  Flex,
  BoxProps,
} from "@chakra-ui/react";
import { JUMP_MATH_LOGO } from "../../assets/images";
import theme from "../../themes";

type CustomBoxProps = {
  children: React.ReactNode;
  marginTop?: string;
  marginLeft?: string;
};

const CustomBox: React.FC<CustomBoxProps> = ({
  children,
  marginTop,
  marginLeft,
}) => (
  <Box
    backgroundColor="#E8EDF1"
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

type AssessmentSummaryProps = {
  numOfQuestions: number;
  totalPoints: string;
  questionTypes: string[];
  rules: string;
  questionText: string;
  totalPointsText: string;
  questionTypesText: string;
};

const AssessmentSummary = ({
  numOfQuestions,
  totalPoints,
  questionTypes,
  rules,
  questionText,
  totalPointsText,
  questionTypesText,
}: AssessmentSummaryProps): React.ReactElement => {
  return (
    <ChakraProvider theme={theme}>
      <Box
        backgroundColor="rgba(232, 237, 241, 0.3)"
        borderRadius="10px"
        position="absolute"
        padding="32px"
        gap="40px"
        width="480px"
        height="376px"
        left="300px"
        top="240px"
      >
        <AssessmentSummary
          numOfQuestions={12}
          totalPoints="50 + 1 (Bonus)"
          questionTypes={["Multiple choice", "Multi-Select", "Short Answer"]}
          rules="The test WILL be monitored so please close any windows before
    starting the test \n You will have 1 hour to complete this test. No aids are permitted. \n  If you need clarification or assistance, please raise your hand
    quietly and I will come to you. \n Good Luck! \n - Mr.Roberts"
          questionText="Number of Questions"
          totalPointsText="Total Number of Points"
          questionTypesText="Question Types:"
        />

        <div>
          <Stack direction="row" pos="absolute" top="75px" fontSize="14px">
            <div>{questionText}</div>
            <div style={{ marginLeft: "260px" }}>{numOfQuestions}</div>
          </Stack>

          <Stack direction="row" pos="absolute" top="100px" fontSize="14px">
            <div>{totalPointsText}</div>
            <div style={{ marginLeft: "175px" }}>{totalPoints} </div>
          </Stack>

          <Stack pos="absolute" top="150px" fontSize="14px">
            <div>{questionTypesText}:</div>
          </Stack>

          <Stack direction="row" pos="absolute" top="100px" fontSize="14px">
            <div>{questionTypes[0]}</div>
            <div style={{ marginLeft: "15px" }}>{questionTypes[1]} </div>
            <div style={{ marginLeft: "15px" }}>{questionTypes[2]} </div>
          </Stack>
        </div>

        <CustomBox marginTop="160px" marginLeft="10px">
          <div>Custom box content</div>
        </CustomBox>

        <CustomBox marginTop="160px" marginLeft="150px">
          <div>Custom box content</div>
        </CustomBox>

        <CustomBox marginTop="160px" marginLeft="290px">
          <div>Custom box content</div>
        </CustomBox>
      </Box>

      <Box
        backgroundColor="rgba(232, 237, 241, 0.3)"
        borderRadius="10px"
        position="absolute"
        padding="32px"
        gap="40px"
        width="480px"
        height="376px"
        left="825px"
        top="240px"
      >
        <Stack pos="absolute" fontSize="14px">
          <Text
            style={{
              marginBottom: "14px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#154472",
            }}
          >
            {" "}
            Rules
          </Text>

          <Stack marginBottom="18px" fontSize="14px">
            <div>{rules}:</div>
          </Stack>
        </Stack>
      </Box>

      <img
        src={JUMP_MATH_LOGO.src}
        alt="Jump Math Logo"
        style={{
          width: "200px",
          height: "auto",
          marginTop: "-600px",
          marginLeft: "-275px",
        }}
      />

      <button
        type="button"
        style={{
          backgroundColor: "#154472",
          color: "#fff",
          borderRadius: "10px",
          outline: "none",
          width: "225px",
          height: "40px",
          marginTop: "600px",
          marginLeft: "765px",
          fontWeight: "bold",
        }}
      >
        Start Test
      </button>
    </ChakraProvider>
  );
};

export default AssessmentSummary;
