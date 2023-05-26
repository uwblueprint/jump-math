import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Button, HStack, Spacer } from "@chakra-ui/react";

import { SUBMIT_TEST } from "../../../APIClients/mutations/TestSessionMutations";
import AuthContext from "../../../contexts/AuthContext";
import StudentContext from "../../../contexts/StudentContext";
import { mapAnswersToResultsArray } from "../../../utils/StudentUtils";
import Modal from "../../common/Modal";
import Toast from "../../common/Toast";

const NavButtons = (): React.ReactElement => {
  const {
    answers,
    test,
    testSession,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setIsSubmitted,
    setIsLoading,
  } = useContext(StudentContext);
  const { showToast } = Toast();
  const { authenticatedUser } = useContext(AuthContext);

  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const [submitTest, { loading, error }] = useMutation<{
    submitTest: string;
  }>(SUBMIT_TEST);

  if (loading) {
    setIsLoading(true);
  }

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

  const questionCount = test?.questions.length ?? 0;

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionCount - 1;

  const previousQuestion = currentQuestionIndex - 1;
  const nextQuestion = currentQuestionIndex + 1;

  return (
    <>
      <Modal
        body="Ensure that you double checked your answers!"
        header="Submit the test?"
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onSubmit={handleSubmitTest}
        submitButtonText="Confirm"
      />
      <HStack paddingBottom="12">
        {!isFirstQuestion && (
          <Button
            onClick={() => setCurrentQuestionIndex(previousQuestion)}
            variant="secondary"
          >
            Previous Question
          </Button>
        )}
        <Spacer />
        {isLastQuestion ? (
          <Button onClick={() => setShowConfirmModal(true)} variant="primary">
            Submit
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentQuestionIndex(nextQuestion)}
            variant="primary"
          >
            Next Question
          </Button>
        )}
      </HStack>
    </>
  );
};

export default NavButtons;
