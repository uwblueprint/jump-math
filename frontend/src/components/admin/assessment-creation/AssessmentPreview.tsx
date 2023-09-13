import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import AssessmentContext from "../../../contexts/AssessmentContext";
import AssessmentExperience from "../../student/AssessmentExperience";

const AssessmentPreview = (): React.ReactElement => {
  const { questions, setShowAssessmentPreview } = useContext(AssessmentContext);
  const closeAssessmentPreviewButton = (
    <Button
      leftIcon={<EditOutlineIcon />}
      onClick={() => setShowAssessmentPreview(false)}
      variant="tertiary"
    >
      Back to Editing
    </Button>
  );

  return (
    <AssessmentExperience
      headerButton={closeAssessmentPreviewButton}
      isPreviewMode
      questions={questions}
      title="Preview Assessment"
    />
  );
};

export default AssessmentPreview;
