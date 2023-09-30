import type { ReactNode } from "react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import { EditOutlineIcon } from "../../../assets/icons";
import type { QuestionElement } from "../../../types/QuestionTypes";
import AssessmentExperience from "../../student/AssessmentExperience";

type QuestionPreviewProps = {
  questionElements: QuestionElement[];
  goBack: () => void;
};

const QuestionPreview = ({
  questionElements,
  goBack,
}: QuestionPreviewProps): ReactNode => {
  const closeQuestionPreviewButton = (
    <Button leftIcon={<EditOutlineIcon />} onClick={goBack} variant="tertiary">
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
