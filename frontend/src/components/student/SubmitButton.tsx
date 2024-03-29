import React, { useContext, useEffect, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { Button, Text, useDisclosure } from "@chakra-ui/react";

import { SUBMIT_TEST } from "../../APIClients/mutations/TestSessionMutations";
import AssessmentExperienceContext from "../../contexts/AssessmentExperienceContext";
import AuthContext from "../../contexts/AuthContext";
import StudentContext from "../../contexts/StudentContext";
import WriteAssessmentContext from "../../contexts/WriteAssessmentContext";
import {
  isCompleted,
  mapAnswersToResultsArray,
} from "../../utils/StudentUtils";
import useToast from "../common/info/useToast";
import Modal from "../common/modal/Modal";

interface SubmitButtonProps {
  isDisabled: boolean;
}

const SubmitButton = ({
  isDisabled,
}: SubmitButtonProps): React.ReactElement => {
  const { testSession } = useContext(StudentContext);
  const { answers } = useContext(AssessmentExperienceContext);
  const { setIsSubmitted, setIsLoading } = useContext(WriteAssessmentContext);
  const { showToast } = useToast();
  const { authenticatedUser } = useContext(AuthContext);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [submitTest, { loading }] = useMutation<{
    submitTest: string;
  }>(SUBMIT_TEST);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
  }, [loading, setIsLoading]);

  const handleSubmitTest = async () => {
    try {
      await submitTest({
        variables: {
          testSessionId: testSession?.id,
          result: {
            student: authenticatedUser?.id,
            answers: mapAnswersToResultsArray(answers),
          },
        },
      });
      setIsSubmitted(true);
    } catch (e) {
      showToast({
        message: "Assessment failed to submit. Please try again.",
        status: "error",
      });
    }
    setIsLoading(false);
  };

  const incompleteQuestionCount = useMemo(() => {
    return answers.filter((answer) => !isCompleted(answer)).length;
  }, [answers]);

  const header = useMemo(() => {
    const question = incompleteQuestionCount === 1 ? "Question" : "Questions";
    if (incompleteQuestionCount) {
      return (
        <>
          You have{" "}
          <Text as="span" color="red.200">
            {incompleteQuestionCount} Unanswered
          </Text>{" "}
          {question}
        </>
      );
    }
    return "Submit the test?";
  }, [incompleteQuestionCount]);

  const body = useMemo(() => {
    return incompleteQuestionCount
      ? "Make sure you complete it before submitting!"
      : "Ensure that you double checked your answers!";
  }, [incompleteQuestionCount]);

  return (
    <>
      <Modal
        body={body}
        header={header}
        isOpen={isOpen}
        messageOnError="Failed to submit the assessment. Please try again later."
        onClose={onClose}
        onSubmit={handleSubmitTest}
        showDefaultToasts={false}
        submitButtonText="Submit"
      />
      <Button isDisabled={isDisabled} onClick={onOpen} variant="primary">
        Submit
      </Button>
    </>
  );
};

export default SubmitButton;
