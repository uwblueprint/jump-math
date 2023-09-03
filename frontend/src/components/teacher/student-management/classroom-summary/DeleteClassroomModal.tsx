import React, { type ReactElement } from "react";

import Modal from "../../../common/modal/Modal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteClassroom: () => Promise<unknown>;
}

const DeleteClassroomModal = ({
  isOpen,
  onClose,
  deleteClassroom,
}: DeleteModalProps): ReactElement => {
  return (
    <Modal
      body="Once you delete this classroom it cannot be recovered."
      cancelButtonVariant="deleteCancel"
      header="Delete Classroom"
      isOpen={isOpen}
      messageOnError="Failed to delete the classroom. Please try again later."
      messageOnSuccess="Classroom deleted."
      onClose={onClose}
      onSubmit={deleteClassroom}
      submitButtonText="Delete"
      submitButtonVariant="delete"
    />
  );
};

export default DeleteClassroomModal;
