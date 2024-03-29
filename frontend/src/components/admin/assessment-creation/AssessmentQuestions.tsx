import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import * as Routes from "../../../constants/Routes";
import AssessmentContext from "../../../contexts/AssessmentContext";
import { getQuestionTexts } from "../../../utils/QuestionUtils";

import AddQuestionButton from "./AddQuestionButton";
import QuestionCard from "./QuestionCard";
import QuestionSummary from "./QuestionSummary";

const AssessmentQuestions = (): React.ReactElement => {
  const history = useHistory();
  const { assessmentId } = useParams<{ assessmentId?: string }>();

  const { disableEditorPrompt, questions } = useContext(AssessmentContext);
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
          onClick={() => {
            disableEditorPrompt(history.push)(
              Routes.ASSESSMENT_EDITOR_QUESTION_EDITOR_PAGE({
                assessmentId,
              }),
            );
          }}
          variant="outline"
        >
          Add Question
        </Button>
      </HStack>
      <HStack alignItems="flex-start" display="flex" minWidth="940px">
        <VStack alignItems="left" spacing="6" width="64%">
          {questions.map((question, i) => (
            <QuestionCard key={question.id} index={i} question={question} />
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
