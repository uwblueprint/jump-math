import React from "react";
import { Button } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import type { Question } from "../../../types/QuestionTypes";
import AssessmentExperience from "../../student/AssessmentExperience";

interface AssessmentPreviewProps {
  questions: Question[];
  setShowAssessmentPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssessmentPreview = ({
  questions,
  setShowAssessmentPreview,
}: AssessmentPreviewProps): React.ReactElement => {
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
