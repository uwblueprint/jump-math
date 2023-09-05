import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import { EditOutlineIcon } from "../../../assets/icons";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import AssessmentExperience from "../../student/AssessmentExperience";

const PreviewQuestionModal = (): React.ReactElement => {
  const { questionElements, setShowPreviewQuestion } = useContext(
    QuestionEditorContext,
  );

  const closePreviewQuestionButton = (
    <Button
      leftIcon={<EditOutlineIcon />}
      onClick={() => setShowPreviewQuestion(false)}
      variant="tertiary"
    >
      Back to Editing
    </Button>
  );
  const currentQuestion = { id: uuidv4(), elements: questionElements };

  return (
    <AssessmentExperience
      headerButton={closePreviewQuestionButton}
      isPreviewMode
      questions={[currentQuestion]}
      title="Preview Question"
    />
  );
};

export default PreviewQuestionModal;
