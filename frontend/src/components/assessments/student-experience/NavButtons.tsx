import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Button, HStack, Spacer } from "@chakra-ui/react";

import { SUBMIT_TEST } from "../../../APIClients/mutations/TestSessionMutations";
import AuthContext from "../../../contexts/AuthContext";
import StudentContext from "../../../contexts/StudentContext";
import Toast from "../../common/Toast";

const NavButtons = (): React.ReactElement => {
  const {
    test,
    testSession,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useContext(StudentContext);

  const questionCount = test?.questions.length ?? 0;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionCount - 1;

  const previousQuestion = currentQuestionIndex - 1;
  const nextQuestion = currentQuestionIndex + 1;

  const [submitTest, { error }] = useMutation<{
    submitTest: string;
  }>(SUBMIT_TEST);

  const { showToast } = Toast();
  const { authenticatedUser } = useContext(AuthContext);

  const handleSubmitTest = async () => {
    await submitTest({
      variables: {
        id: testSession?.id,
        result: {
          student: authenticatedUser?.id,
          answers: [[[0], [7], [0, 1, 2]], [[0]], [[0, 1, 2]], [[7]], [[7]]],
        },
      },
    });
    if (error) {
      showToast({
        message: "Assessment failed to submit. Please try again.",
        status: "error",
      });
    } else {
      // update to redirect
      showToast({
        message: "Assessment sucessfully submitted.",
        status: "success",
      });
    }
  };

  return (
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
        <Button onClick={handleSubmitTest} variant="primary">
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
  );
};

export default NavButtons;
