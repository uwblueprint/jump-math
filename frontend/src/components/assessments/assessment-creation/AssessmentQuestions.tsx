import React from "react";
import { useHistory } from "react-router-dom";
import { Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { CREATE_QUESTION } from "../../../constants/Routes";
import { QuestionType } from "../../../types/QuestionTypes";

import AddQuestionCard from "./AddQuestionCard";
import QuestionCard, { QuestionCardProps } from "./QuestionCard";
import QuestionSummary from "./QuestionSummary";

interface AssessmentQuestionsProps {
  questions: QuestionCardProps[];
}

const AssessmentQuestions = ({
  questions,
}: AssessmentQuestionsProps): React.ReactElement => {
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
        <VStack alignItems="left" spacing="6" width="64%">
          {questions.map((question, i) => (
            <QuestionCard key={i} {...question} />
          ))}
          <AddQuestionCard />
        </VStack>
        <Spacer />
        <QuestionSummary pointCount={0} questionCount={0} />
      </HStack>
    </VStack>
  );
};

export default AssessmentQuestions;
