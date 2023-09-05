import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import AssessmentContext from "../../../contexts/AssessmentContext";
import AssessmentExperience from "../../student/AssessmentExperience";

const PreviewAssessmentModal = (): React.ReactElement => {
  const { questions, setShowPreviewAssessment } = useContext(AssessmentContext);
  const closePreviewAssessmentButton = (
    <Button
      leftIcon={<EditOutlineIcon />}
      onClick={() => setShowPreviewAssessment(false)}
      variant="tertiary"
    >
      Back to Editing
    </Button>
  );

  return (
    <AssessmentExperience
      headerButton={closePreviewAssessmentButton}
      isPreviewMode
      questions={questions}
      title="Preview Assessment"
    />
  );
};

export default PreviewAssessmentModal;
