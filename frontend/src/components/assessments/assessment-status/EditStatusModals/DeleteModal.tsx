import React from "react";
import { useMutation } from "@apollo/client";

import { DELETE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import Modal from "../../../common/Modal";
import Toast from "../../../common/Toast";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
}

const DeleteModal = ({
  isOpen,
  onClose,
  assessmentId,
}: DeleteModalProps): React.ReactElement => {
  const [deleteAssessment, { error }] = useMutation<{
    deleteAssessment: string;
  }>(DELETE_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = Toast();

  const onDeleteAssessment = async () => {
    await deleteAssessment({ variables: { id: assessmentId } });
    if (error) {
      showToast({
        message: "Assessment failed to delete. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "Assessment deleted.",
        status: "success",
      });
    }
    onClose();
  };

  return (
    <Modal
      body="Once you delete this assessment it cannot be recovered."
      cancelButtonVariant="deleteCancel"
      header="Delete Assessment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onDeleteAssessment}
      submitButtonText="Delete"
      submitButtonVariant="delete"
    />
  );
};

export default DeleteModal;
