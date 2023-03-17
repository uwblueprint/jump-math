import React from "react";
import { Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import {
  QuestionElement,
  QuestionElementType,
  QuestionType,
} from "../../../types/QuestionTypes";

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
  const getQuestionTexts = (question: QuestionElement[]): string[] => {
    return question
      .filter(
        (questionElement) =>
          questionElement.type === QuestionElementType.QUESTION,
      )
      .map((questionElement) => questionElement.data as string);
  };

  const totalPoints: number = questions.reduce(
    (a, b) => a + getQuestionTexts(b).length,
    0,
  );

  const getResponseTypeCount = (
    question: QuestionElement[],
    type: QuestionElementType,
  ): number => {
    return question.filter((questionElement) => questionElement.type === type)
      .length;
  };

  const generateTags = (
    question: QuestionElement[],
  ): { type: QuestionType; count: number }[] => {
    const tags: { type: QuestionType; count: number }[] = [];

    const multipleChoiceCount = getResponseTypeCount(
      question,
      QuestionElementType.MULTIPLE_CHOICE,
    );
    if (multipleChoiceCount) {
      tags.push({
        type: QuestionType.MULTIPLE_CHOICE,
        count: multipleChoiceCount,
      });
    }

    const shortAnswerCount = getResponseTypeCount(
      question,
      QuestionElementType.SHORT_ANSWER,
    );
    if (shortAnswerCount) {
      tags.push({ type: QuestionType.SHORT_ANSWER, count: shortAnswerCount });
    }

    const multiSelectCount = getResponseTypeCount(
      question,
      QuestionElementType.MULTI_SELECT,
    );
    if (multiSelectCount) {
      tags.push({ type: QuestionType.MULTI_SELECT, count: multiSelectCount });
    }

    return tags;
  };

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
              tags={generateTags(question)}
            />
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
