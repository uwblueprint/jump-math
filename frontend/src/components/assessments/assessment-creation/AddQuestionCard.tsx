import React from "react";
import { Button, Text } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";

interface AddQuestionCardProps {
  setShowQuestionEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddQuestionCard = ({
  setShowQuestionEditor,
}: AddQuestionCardProps): React.ReactElement => {
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

export default AddQuestionCard;
