import React, { useContext } from "react";
import { Button, Spacer, Text, VStack } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import HeaderWrapper from "../../common/HeaderWrapper";

const PreviewQuestionModal = (): React.ReactElement => {
  const { setShowPreviewQuestionModal } = useContext(QuestionEditorContext);
  return (
    <HeaderWrapper>
      <VStack align="left" marginLeft="2rem">
        <Text textStyle="subtitle1">Preview Question</Text>
      </VStack>
      <Spacer />
      <Button
        leftIcon={<EditOutlineIcon />}
        onClick={() => setShowPreviewQuestionModal(false)}
        variant="tertiary"
      >
        Back to Editing
      </Button>
    </HeaderWrapper>
  );
};

export default PreviewQuestionModal;
