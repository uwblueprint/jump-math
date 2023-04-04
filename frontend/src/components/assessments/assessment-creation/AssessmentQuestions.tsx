import React from "react";
import { Box, Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { QuestionElement } from "../../../types/QuestionTypes";
import {
  generateQuestionCardTags,
  getQuestionTexts,
} from "../../../utils/QuestionUtils";

import AddQuestionButton from "./AddQuestionButton";
import QuestionCard from "./QuestionCard";
import QuestionSummary from "./QuestionSummary";

interface AssessmentQuestionsProps {
  questions: QuestionElement[][];
  setShowQuestionEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssessmentQuestions = ({
  questions,
  setShowQuestionEditor,
}: AssessmentQuestionsProps): React.ReactElement => {
  const pointCount: number = questions.reduce(
    (a, b) => a + getQuestionTexts(b).length,
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
            <QuestionCard
              key={i}
              questionNumber={i + 1}
              questions={getQuestionTexts(question)}
              tags={generateQuestionCardTags(question)}
            />
          ))}
          <AddQuestionButton setShowQuestionEditor={setShowQuestionEditor} />
        </VStack>
        <Spacer />
        <Box width="33%">
          <QuestionSummary
            pointCount={pointCount}
            questionCount={questions.length}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default AssessmentQuestions;
