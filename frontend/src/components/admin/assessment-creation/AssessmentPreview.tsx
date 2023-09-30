import type { ReactNode } from "react";
import React, { useEffect } from "react";
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
}: AssessmentPreviewProps): ReactNode => {
  useEffect(() => {
    if (!questions.length) {
      goBack();
    }
  }, [goBack, questions]);

  if (!questions.length) {
    return null;
  }

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
