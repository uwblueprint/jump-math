import React, { useContext, useEffect, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { Button, Text } from "@chakra-ui/react";

import { SUBMIT_TEST } from "../../../APIClients/mutations/TestSessionMutations";
import AuthContext from "../../../contexts/AuthContext";
import StudentContext from "../../../contexts/StudentContext";
import WriteAssessmentContext from "../../../contexts/WriteAssessmentContext";
import {
  isCompleted,
  mapAnswersToResultsArray,
} from "../../../utils/StudentUtils";
import Modal from "../../common/Modal";
import Toast from "../../common/Toast";

const SubmitButton = (): React.ReactElement => {
  const { testSession } = useContext(StudentContext);
  const { answers, setIsSubmitted, setIsLoading } = useContext(
    WriteAssessmentContext,
  );
  const { showToast } = Toast();
  const { authenticatedUser } = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

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
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onSubmit={handleSubmitTest}
        submitButtonText="Confirm"
      />
      <Button onClick={() => setShowConfirmModal(true)} variant="primary">
        Submit
      </Button>
    </>
  );
};

export default SubmitButton;
