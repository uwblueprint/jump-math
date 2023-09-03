import React, { useContext } from "react";
import { Button, Spacer } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import { ArrowForwardOutlineIcon } from "../../../assets/icons";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import AssessmentExperience from "../../student/AssessmentExperience";

const PreviewQuestionModal = (): React.ReactElement => {
  const { setShowPreviewQuestionModal } = useContext(QuestionEditorContext);
  const closePreviewModalButton = (
    <Button
      leftIcon={<EditOutlineIcon />}
      onClick={() => setShowPreviewQuestionModal(false)}
      variant="tertiary"
    >
      Back to Editing
    </Button>
  );

  const nextQuestionButton = (
    <>
      <Spacer />
      <Button
        isDisabled
        rightIcon={<ArrowForwardOutlineIcon />}
        variant="primary"
      >
        Next Question
      </Button>
    </>
  );

  return (
    <AssessmentExperience
      headerButton={closePreviewModalButton}
      navButtons={nextQuestionButton}
      pointCount={1}
      questionElements={[]}
      questionNumber={1}
      questionNumbers={<Button>test</Button>}
      subtitle="Preview Question"
      title="test name"
    />
  );
};

export default PreviewQuestionModal;
