import React from "react";

import Modal from "../../../common/modal/Modal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteClassroom: () => void;
}

const DeleteClassroomModal = ({
  isOpen,
  onClose,
  deleteClassroom,
}: DeleteModalProps): React.ReactElement => {
  const onDeleteClassroom = () => {
    deleteClassroom();
    onClose();
  };

  return (
    <Modal
      body="Once you delete this classroom it cannot be recovered."
      cancelButtonVariant="deleteCancel"
      header="Delete Classroom"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onDeleteClassroom}
      submitButtonText="Delete"
      submitButtonVariant="delete"
    />
  );
};

export default DeleteClassroomModal;
