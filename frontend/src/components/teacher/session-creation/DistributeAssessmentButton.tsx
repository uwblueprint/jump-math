import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";

import {
  CREATE_TEST_SESSION,
  UPDATE_TEST_SESSION,
} from "../../../APIClients/mutations/TestSessionMutations";
import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import type { TestSessionRequest } from "../../../APIClients/types/TestSessionClientTypes";
import { PaperPlaneOutlineIcon } from "../../../assets/icons";
import { DISPLAY_ASSESSMENTS_PAGE } from "../../../constants/Routes";
import { getQueryName } from "../../../utils/GeneralUtils";
import useToast from "../../common/info/useToast";

import DistributeAssessmentModal from "./DistributeAssessmentModal";

interface DistributeAssessmentButtonProps {
  testSession: TestSessionRequest;
  testSessionId: string;
}

const DistributeAssessmentButton = ({
  testSession,
  testSessionId,
}: DistributeAssessmentButtonProps): React.ReactElement => {
  const [showDistributeModal, setShowDistributeModal] = React.useState(false);

  const history = useHistory();
  const { showToast } = useToast();

  const [createSession, { loading }] = useMutation<{
    createSession: string;
  }>(CREATE_TEST_SESSION, {
    refetchQueries: [getQueryName(GET_TEST_SESSIONS_BY_TEACHER_ID)],
  });
  const [updateSession] = useMutation<{
    updateSession: string;
  }>(UPDATE_TEST_SESSION, {
    refetchQueries: [getQueryName(GET_TEST_SESSIONS_BY_TEACHER_ID)],
  });

  const handleCreateSession = async () => {
    try {
      await createSession({
        variables: {
          testSession,
        },
      });
      history.push(DISPLAY_ASSESSMENTS_PAGE);
      showToast({
        message: "New assessment created.",
        status: "success",
      });
    } catch (e) {
      showToast({
        message: "Failed to create assessment. Please try again.",
        status: "error",
      });
    }
  };

  const handleUpdateSession = async () => {
    try {
      await updateSession({
        variables: {
          id: testSessionId,
          testSession,
        },
      });
      history.push(DISPLAY_ASSESSMENTS_PAGE);
      showToast({
        message: "Assessment updated.",
        status: "success",
      });
    } catch (e) {
      showToast({
        message: "Failed to update assessment. Please try again.",
        status: "error",
      });
    }
  };

  return (
    <>
      <Button
        isLoading={loading}
        leftIcon={<PaperPlaneOutlineIcon />}
        minWidth="10"
        onClick={() => setShowDistributeModal(true)}
        variant="primary"
      >
        Distribute
      </Button>
      <DistributeAssessmentModal
        distributeAssessment={
          testSessionId ? handleUpdateSession : handleCreateSession
        }
        isOpen={showDistributeModal}
        onClose={() => setShowDistributeModal(false)}
      />
    </>
  );
};

export default DistributeAssessmentButton;
