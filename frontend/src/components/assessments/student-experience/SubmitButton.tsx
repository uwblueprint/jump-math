import React, { useContext, useEffect, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";

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

  const [submitTest, { loading, error }] = useMutation<{
    submitTest: string;
  }>(SUBMIT_TEST);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
  }, [loading, setIsLoading]);

  const handleSubmitTest = async () => {
    await submitTest({
      variables: {
        id: testSession?.id,
        result: {
          student: authenticatedUser?.id,
          answers: mapAnswersToResultsArray(answers),
        },
      },
    });
    if (error) {
      setIsLoading(false);
      showToast({
        message: "Assessment failed to submit. Please try again.",
        status: "error",
      });
    } else {
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  const incompleteQuestionCount = useMemo(() => {
    return answers.filter((answer) => !isCompleted(answer)).length;
  }, [answers]);

  const header = useMemo(() => {
    const question = incompleteQuestionCount === 1 ? "Question" : "Questions";
    if (incompleteQuestionCount) {
      return `You have ${incompleteQuestionCount} Unanswered ${question}`;
    }
    return "Submit the test";
  }, [incompleteQuestionCount]);

  const body = useMemo(() => {
    return incompleteQuestionCount
      ? "Make sure you complete it before submitting"
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
