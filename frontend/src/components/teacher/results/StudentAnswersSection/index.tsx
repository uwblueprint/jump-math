import React from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";

import { type TestResponse } from "../../../../APIClients/types/TestClientTypes";

import QuestionList from "./QuestionList";

const StudentAnswersSection = ({
  test,
  answers,
  breakdown,
}: {
  test: Pick<TestResponse, "questions">;
  answers: number[][][];
  breakdown: boolean[][];
}) => (
  <Flex direction="column" gap={6} w="100%">
    <Text color="grey.300" textStyle="eyebrow">
      ANSWERS
    </Text>
    <Flex direction="column" gap={10} w="100%">
      <VStack align="left" spacing={20}>
        {test.questions.map((_, index) => {
          return (
            <QuestionList
              key={index}
              answers={answers[index]}
              breakdown={breakdown[index]}
              currentQuestionIndex={index}
              questions={test.questions[index]}
            />
          );
        })}
      </VStack>
    </Flex>
  </Flex>
);

export default StudentAnswersSection;
