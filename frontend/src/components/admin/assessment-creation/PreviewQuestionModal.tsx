import React, { useContext } from "react";
import { Button, GridItem, SimpleGrid, Spacer } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import { ArrowForwardOutlineIcon } from "../../../assets/icons";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import QuestionNumberTypes from "../../../types/QuestionNumberTypes";
import { getQuestionTexts } from "../../../utils/QuestionUtils";
import AssessmentExperience from "../../student/AssessmentExperience";
import QuestionNumber from "../../student/QuestionNumber";

const PreviewQuestionModal = (): React.ReactElement => {
  const { questionElements, setShowPreviewQuestionModal } = useContext(
    QuestionEditorContext,
  );

  const closePreviewModalButton = (
    <Button
      leftIcon={<EditOutlineIcon />}
      onClick={() => setShowPreviewQuestionModal(false)}
      variant="tertiary"
    >
      Back to Editing
    </Button>
  );

  const nextQuestionButton = (
    <>
      <Spacer />
      <Button
        isDisabled
        rightIcon={<ArrowForwardOutlineIcon />}
        variant="primary"
      >
        Next Question
      </Button>
    </>
  );

  const pointCount = getQuestionTexts(questionElements).length;

  const questionNumber = (
    <SimpleGrid columns={3} spacing={4}>
      <GridItem>
        <QuestionNumber
          isDisabled
          number={1}
          onClick={() => console.log("here")}
          status={QuestionNumberTypes.CURRENT}
        />
      </GridItem>
    </SimpleGrid>
  );

  return (
    <AssessmentExperience
      headerButton={closePreviewModalButton}
      navButtons={nextQuestionButton}
      pointCount={pointCount}
      questionElements={[]}
      questionNumber={1}
      questionNumbers={questionNumber}
      title="Preview Question"
    />
  );
};

export default PreviewQuestionModal;
