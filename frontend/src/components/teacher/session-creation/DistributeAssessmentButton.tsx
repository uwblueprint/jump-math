import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, useDisclosure } from "@chakra-ui/react";

import {
  CREATE_TEST_SESSION,
  UPDATE_TEST_SESSION,
} from "../../../APIClients/mutations/TestSessionMutations";
import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import type { TestSessionRequest } from "../../../APIClients/types/TestSessionClientTypes";
import { PaperPlaneOutlineIcon } from "../../../assets/icons";
import { DISPLAY_ASSESSMENTS_PAGE } from "../../../constants/Routes";
import { getQueryName } from "../../../utils/GeneralUtils";

import DistributeAssessmentModal from "./DistributeAssessmentModal";

interface DistributeAssessmentButtonProps {
  testSession: TestSessionRequest;
  testSessionId: string;
}

const DistributeAssessmentButton = ({
  testSession,
  testSessionId,
}: DistributeAssessmentButtonProps): React.ReactElement => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const history = useHistory();

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
  const upsertSession = testSessionId ? updateSession : createSession;

  const handleUpsertSession = async () => {
    await upsertSession({
      variables: {
        id: testSessionId,
        testSession,
      },
    });
    history.push(DISPLAY_ASSESSMENTS_PAGE);
  };

  return (
    <>
      <Button
        isLoading={loading}
        leftIcon={<PaperPlaneOutlineIcon />}
        minWidth="10"
        onClick={onModalOpen}
        variant="primary"
      >
        Distribute
      </Button>
      <DistributeAssessmentModal
        distributeAssessment={handleUpsertSession}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </>
  );
};

export default DistributeAssessmentButton;
