import React from "react";
import { useHistory } from "react-router-dom";
import { Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { CREATE_QUESTION } from "../../../constants/Routes";

import AddQuestion from "./AddQuestion";
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
        <AddQuestion />
        <Spacer />
        <QuestionSummary pointCount={0} questionCount={0} />
      </HStack>
    </VStack>
  );
};

export default AssessmentQuestions;
