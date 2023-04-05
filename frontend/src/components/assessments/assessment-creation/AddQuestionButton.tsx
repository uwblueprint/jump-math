import React, { useContext } from "react";
import { Button, Text } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import AssessmentContext from "../../../contexts/AssessmentContext";

const AddQuestionButton = (): React.ReactElement => {
  const { setShowQuestionEditor } = useContext(AssessmentContext);
  return (
    <Button
      border="1px dashed #636363"
      borderRadius="16px"
      color="grey.300"
      leftIcon={<PlusOutlineIcon />}
      onClick={() => setShowQuestionEditor(true)}
      paddingBottom="8"
      paddingTop="8"
      width="100%"
    >
      <Text textStyle="paragraph">Add Question</Text>
    </Button>
  );
};

export default AddQuestionButton;
