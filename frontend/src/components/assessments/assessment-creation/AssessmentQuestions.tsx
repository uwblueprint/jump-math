import React from "react";
import { useHistory } from "react-router-dom";
import { Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { CREATE_QUESTION } from "../../../constants/Routes";
import { QuestionType } from "../../../types/QuestionTypes";

import AddQuestion from "./AddQuestion";
import QuestionCard from "./QuestionCard";
import QuestionSummary from "./QuestionSummary";

const AssessmentQuestions = (): React.ReactElement => {
  const history = useHistory();
  return (
    <VStack align="left" paddingBottom="22" spacing="12" width="100%">
      <HStack>
        <Text textStyle="eyebrow">Assessment Questions</Text>
        <Spacer />
        <Button
          leftIcon={<PlusOutlineIcon />}
          onClick={() => history.push(CREATE_QUESTION)}
          variant="outline"
        >
          Add Question
        </Button>
      </HStack>
      <HStack alignItems="flex-start" display="flex">
        <VStack alignItems="left" spacing="6" width="60%">
          <QuestionCard
            points={5}
            questionNumber={1}
            questions={[
              "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
              "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
              "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
              "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
              "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
            ]}
            tags={[
              { type: QuestionType.MULTIPLE_CHOICE, count: 2 },
              { type: QuestionType.SHORT_ANSWER, count: 1 },
              { type: QuestionType.MULTI_SELECT, count: 1 },
            ]}
          />
          <AddQuestion />
        </VStack>
        <Spacer />
        <QuestionSummary pointCount={0} questionCount={0} />
      </HStack>
    </VStack>
  );
};

export default AssessmentQuestions;
