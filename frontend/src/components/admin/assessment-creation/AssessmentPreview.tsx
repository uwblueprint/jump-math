import React, { type ReactElement } from "react";
import { Button } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import type { Question } from "../../../types/QuestionTypes";
import AssessmentExperience from "../../student/AssessmentExperience";

type AssessmentPreviewProps = {
  questions: Question[];
  goBack: () => void;
};

const AssessmentPreview = ({
  questions,
  goBack,
}: AssessmentPreviewProps): ReactElement => {
  const closeAssessmentPreviewButton = (
    <Button leftIcon={<EditOutlineIcon />} onClick={goBack} variant="tertiary">
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
