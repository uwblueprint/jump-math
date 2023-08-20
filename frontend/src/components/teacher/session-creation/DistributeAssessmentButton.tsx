import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";

import { CREATE_TEST_SESSION } from "../../../APIClients/mutations/TestSessionMutations";
import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import type { TestSessionRequest } from "../../../APIClients/types/TestSessionClientTypes";
import { PaperPlaneOutlineIcon } from "../../../assets/icons";
import { DISPLAY_ASSESSMENTS_PAGE } from "../../../constants/Routes";
import { generateAccessCode } from "../../../utils/TestSessionUtils";
import useToast from "../../common/info/useToast";

import DistributeAssessmentModal from "./DistributeAssessmentModal";

interface DistributeAssessmentButtonProps {
  testSession: Omit<TestSessionRequest, "accessCode">;
}

const DistributeAssessmentButton = ({
  testSession,
}: DistributeAssessmentButtonProps): React.ReactElement => {
  const [showDistributeModal, setShowDistributeModal] = React.useState(false);

  const history = useHistory();
  const { showToast } = useToast();

  const [createSession, { loading }] = useMutation<{
    createSession: string;
  }>(CREATE_TEST_SESSION, {
    refetchQueries: [{ query: GET_TEST_SESSIONS_BY_TEACHER_ID }],
  });

  const handleCreateSession = async () => {
    try {
      await createSession({
        variables: {
          testSession: { ...testSession, accessCode: generateAccessCode() },
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
        distributeAssessment={handleCreateSession}
        isOpen={showDistributeModal}
        onClose={() => setShowDistributeModal(false)}
      />
    </>
  );
};

export default DistributeAssessmentButton;
