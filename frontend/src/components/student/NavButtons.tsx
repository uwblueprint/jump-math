import React, { useContext } from "react";
import { Button, HStack, Spacer } from "@chakra-ui/react";

import {
  ArrowBackOutlineIcon,
  ArrowForwardOutlineIcon,
} from "../../assets/icons";
import AssessmentExperienceContext from "../../contexts/AssessmentExperienceContext";

import SubmitButton from "./SubmitButton";

interface NavButtonsProps {
  isPreviewMode?: boolean;
}

const NavButtons = ({
  isPreviewMode = false,
}: NavButtonsProps): React.ReactElement => {
  const { questions, currentQuestionIndex, setCurrentQuestionIndex } =
    useContext(AssessmentExperienceContext);

  const questionCount = questions.length;

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionCount - 1;

  const previousQuestion = currentQuestionIndex - 1;
  const nextQuestion = currentQuestionIndex + 1;

  return (
    <HStack paddingBottom="12">
      {!isFirstQuestion && (
        <Button
          leftIcon={<ArrowBackOutlineIcon />}
          onClick={() => setCurrentQuestionIndex(previousQuestion)}
          variant="secondary"
        >
          Previous Question
        </Button>
      )}
      <Spacer />
      {isLastQuestion ? (
        <SubmitButton isDisabled={isPreviewMode} />
      ) : (
        <Button
          onClick={() => setCurrentQuestionIndex(nextQuestion)}
          rightIcon={<ArrowForwardOutlineIcon />}
          variant="primary"
        >
          Next Question
        </Button>
      )}
    </HStack>
  );
};

export default NavButtons;
