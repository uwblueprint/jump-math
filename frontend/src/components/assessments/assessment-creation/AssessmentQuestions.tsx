import React from "react";
import { useHistory } from "react-router-dom";
import { Button, HStack, Spacer, Text } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { CREATE_QUESTION } from "../../../constants/Routes";

const AssessmentQuestions = (): React.ReactElement => {
  const history = useHistory();

  return (
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
  );
};

export default AssessmentQuestions;
