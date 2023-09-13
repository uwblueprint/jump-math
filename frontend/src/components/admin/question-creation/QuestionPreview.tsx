import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import { EditOutlineIcon } from "../../../assets/icons";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import AssessmentExperience from "../../student/AssessmentExperience";

const QuestionPreview = (): React.ReactElement => {
  const { questionElements, setShowQuestionPreview } = useContext(
    QuestionEditorContext,
  );

  const closeQuestionPreviewButton = (
    <Button
      leftIcon={<EditOutlineIcon />}
      onClick={() => setShowQuestionPreview(false)}
      variant="tertiary"
    >
      Back to Editing
    </Button>
  );
  const currentQuestion = { id: uuidv4(), elements: questionElements };

  return (
    <AssessmentExperience
      headerButton={closeQuestionPreviewButton}
      isPreviewMode
      questions={[currentQuestion]}
      title="Preview Question"
    />
  );
};

export default QuestionPreview;
