import type { ReactNode } from "react";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import * as Routes from "../../../constants/Routes";
import AssessmentContext from "../../../contexts/AssessmentContext";
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
  const { assessmentId } = useParams<{ assessmentId?: string }>();
  const { redirectableHistory } = useContext(AssessmentContext);

  useEffect(() => {
    if (!questions.length) {
      redirectableHistory.push(Routes.ASSESSMENT_EDITOR_PAGE({ assessmentId }));
    }
  }, [assessmentId, questions, redirectableHistory]);

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
