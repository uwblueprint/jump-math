import React, { useContext } from "react";
import { Button, GridItem, SimpleGrid, Spacer } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import { ArrowForwardOutlineIcon } from "../../../assets/icons";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import QuestionNumberTypes from "../../../types/QuestionNumberTypes";
import AssessmentExperience from "../../student/AssessmentExperience";
import QuestionNumber from "../../student/QuestionNumber";

const PreviewQuestionModal = (): React.ReactElement => {
  const { setShowPreviewQuestionModal } = useContext(QuestionEditorContext);
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
      pointCount={1}
      questionElements={[]}
      questionNumber={1}
      questionNumbers={questionNumber}
      subtitle="Preview Question"
      title="test name"
    />
  );
};

export default PreviewQuestionModal;
