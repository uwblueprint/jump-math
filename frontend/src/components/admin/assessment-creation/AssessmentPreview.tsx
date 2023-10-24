import type { ReactNode } from "react";
import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";

import { ArrowBackOutlineIcon } from "../../../assets/icons";
import type { Question } from "../../../types/QuestionTypes";
import AssessmentExperience from "../../student/AssessmentExperience";

type AssessmentPreviewProps = {
  questions: Question[];
  goBack: () => void;
  backButtonText: string;
};

const AssessmentPreview = ({
  questions,
  goBack,
  backButtonText,
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
    <Button
      leftIcon={<ArrowBackOutlineIcon />}
      onClick={goBack}
      variant="tertiary"
    >
      {backButtonText}
    </Button>
  );

  // TODO: combine with AssessmentPreviewPage component
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
