import React from "react";
import { useMutation } from "@apollo/client";

import { DUPLICATE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import Modal from "../../../common/Modal";
import Toast from "../../../common/Toast";

interface DuplicateModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
}

const DuplicateModal = ({
  isOpen,
  onClose,
  assessmentId,
}: DuplicateModalProps): React.ReactElement => {
  const [duplicateAssessment, { error }] = useMutation<{
    duplicateAssessment: string;
  }>(DUPLICATE_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = Toast();

  const onDuplicateAssessment = async () => {
    await duplicateAssessment({ variables: { id: assessmentId } });
    if (error) {
      showToast({
        message: "Assessment failed to duplicate. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "Assessment duplicated.",
        status: "success",
      });
    }
    onClose();
  };

  return (
    <Modal
      body="Create a copy of this existing assessment. This new assessment can be viewed under draft assessments."
      header="Duplicate Assessment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onDuplicateAssessment}
      submitButtonText="Duplicate"
    />
  );
};

export default DuplicateModal;
