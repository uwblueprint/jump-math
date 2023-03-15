import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { CREATE_QUESTION } from "../../../constants/Routes";

import AddQuestionButton from "./AddQuestionButton";
import QuestionCard, { QuestionCardProps } from "./QuestionCard";
import QuestionSummary from "./QuestionSummary";

interface AssessmentQuestionsProps {
  questions: QuestionCardProps[];
}

const AssessmentQuestions = ({
  questions,
}: AssessmentQuestionsProps): React.ReactElement => {
  const history = useHistory();
  const totalPoints: number = questions.reduce(
    (a, b) => a + b.questions.length,
    0,
  );

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
      <HStack alignItems="flex-start" display="flex" minWidth="940px">
        <VStack alignItems="left" spacing="6" width="64%">
          {questions.map((question, i) => (
            <QuestionCard key={i} questionNumber={i + 1} {...question} />
          ))}
          <AddQuestionButton />
        </VStack>
        <Spacer />
        <Box width="33%">
          <QuestionSummary
            questionCount={questions.length}
            totalPoints={totalPoints}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default AssessmentQuestions;
