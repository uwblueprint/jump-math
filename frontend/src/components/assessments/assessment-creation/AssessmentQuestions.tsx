import React, { useContext } from "react";
import { Box, Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import AssessmentContext from "../../../contexts/AssessmentContext";
import { Question } from "../../../types/QuestionTypes";
import {
  generateQuestionCardTags,
  getQuestionTexts,
} from "../../../utils/QuestionUtils";

import AddQuestionButton from "./AddQuestionButton";
import QuestionCard from "./QuestionCard";
import QuestionSummary from "./QuestionSummary";

interface AssessmentQuestionsProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const AssessmentQuestions = ({
  questions,
  setQuestions,
}: AssessmentQuestionsProps): React.ReactElement => {
  const { setShowQuestionEditor } = useContext(AssessmentContext);
  const pointCount: number = questions.reduce(
    (a, b) => a + getQuestionTexts(b.elements).length,
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
              key={question.id}
              id={question.id}
              index={i}
              questionInfo={question}
              questionNumber={i + 1}
              questions={getQuestionTexts(question.elements)}
              setQuestions={setQuestions}
              tags={generateQuestionCardTags(question.elements)}
            />
          ))}
          <AddQuestionButton />
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
