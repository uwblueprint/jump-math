import React from "react";
import { useMutation } from "@apollo/client";

import { UNARCHIVE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import Toast from "../../../common/info/Toast";
import Modal from "../../../common/modal/Modal";

interface UnarchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
}

const UnarchiveModal = ({
  isOpen,
  onClose,
  assessmentId,
}: UnarchiveModalProps): React.ReactElement => {
  const [unarchiveAssessment, { error }] = useMutation<{
    unarchiveAssessment: string;
  }>(UNARCHIVE_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = Toast();

  const onUnarchiveAssessment = async () => {
    await unarchiveAssessment({ variables: { id: assessmentId } });
    if (error) {
      showToast({
        message: "Assessment failed to unarchive. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "Assessment unarchived.",
        status: "success",
      });
    }
    onClose();
  };

  return (
    <Modal
      body="View this assessment under drafts once you unarchive it"
      header="Unarchive Assessment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onUnarchiveAssessment}
      submitButtonText="Unarchive"
    />
  );
};

export default UnarchiveModal;
