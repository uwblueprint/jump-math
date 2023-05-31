import React from "react";

import Modal from "../../../common/modal/Modal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteAssessment: () => void;
}

const DeleteModal = ({
  isOpen,
  onClose,
  deleteAssessment,
}: DeleteModalProps): React.ReactElement => {
  const onDeleteAssessment = () => {
    deleteAssessment();
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
