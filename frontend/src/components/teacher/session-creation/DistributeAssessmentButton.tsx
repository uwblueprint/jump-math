import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";

import { CREATE_TEST_SESSION } from "../../../APIClients/mutations/TestSessionMutations";
import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import type { TestSessionRequest } from "../../../APIClients/types/TestSessionClientTypes";
import { PaperPlaneOutlineIcon } from "../../../assets/icons";
import { DISPLAY_ASSESSMENTS_PAGE } from "../../../constants/Routes";
import Toast from "../../common/info/Toast";

interface DistributeAssessmentButtonProps {
  testSessionRequest: TestSessionRequest;
}

const DistributeAssessmentButton = ({
  testSessionRequest,
}: DistributeAssessmentButtonProps): React.ReactElement => {
  const history = useHistory();
  const { showToast } = Toast();

  const [createSession, { loading, error }] = useMutation<{
    createSession: string;
  }>(CREATE_TEST_SESSION, {
    refetchQueries: [{ query: GET_TEST_SESSIONS_BY_TEACHER_ID }],
  });

  const handleCreateSession = async (testSession: TestSessionRequest) => {
    await createSession({ variables: { testSession } });
    if (error) {
      showToast({
        message: "Failed to create session. Please try again.",
        status: "error",
      });
    } else {
      history.push(DISPLAY_ASSESSMENTS_PAGE);
    }
  };

  return (
    <Button
      isLoading={loading}
      leftIcon={<PaperPlaneOutlineIcon />}
      minWidth="10"
      onClick={() => handleCreateSession(testSessionRequest)}
      variant="primary"
    >
      Distribute
    </Button>
  );
};

export default DistributeAssessmentButton;
