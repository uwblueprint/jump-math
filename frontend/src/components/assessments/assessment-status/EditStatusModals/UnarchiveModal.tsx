import React from "react";
import { useMutation } from "@apollo/client";

import { UNARCHIVE_TEST } from "../../../../APIClients/mutations/TestMutations";
import GET_ALL_TESTS from "../../../../APIClients/queries/TestQueries";
import Modal from "../../../common/Modal";
import Toast from "../../../common/Toast";

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
        message: "Assessment failed to un-archive. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "Assessment un-archived.",
        status: "success",
      });
    }
    onClose();
  };

  return (
    <Modal
      body="View this assessment under drafts once you un-archive it"
      header="Un-archive Assessment"
      isOpen={isOpen}
      onCancel={onClose}
      onClose={onClose}
      onSubmit={onUnarchiveAssessment}
      submitButtonText="Un-archive"
    />
  );
};

export default UnarchiveModal;
