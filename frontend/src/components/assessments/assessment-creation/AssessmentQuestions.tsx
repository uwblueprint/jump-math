import React from "react";
import { Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { QuestionData } from "../../../constants/TestConstants";

import AddQuestionButton from "./AddQuestionButton";
import QuestionCard from "./QuestionCard";
import QuestionSummary from "./QuestionSummary";

interface AssessmentQuestionsProps {
  questions: QuestionData[];
  setShowQuestionEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssessmentQuestions = ({
  questions,
  setShowQuestionEditor,
}: AssessmentQuestionsProps): React.ReactElement => {
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
          onClick={() => setShowQuestionEditor(true)}
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
          <AddQuestionCard setShowQuestionEditor={setShowQuestionEditor} />
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
