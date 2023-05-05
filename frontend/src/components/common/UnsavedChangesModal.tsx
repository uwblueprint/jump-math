import React from "react";

import Modal from "./Modal";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeave: () => void;
}

const UnsavedChangesModal = ({
  isOpen,
  onClose,
  onLeave,
}: UnsavedChangesModalProps): React.ReactElement => {
  return (
    <Modal
      body="Changes you made will not be saved."
      header="Are you sure you want to leave this page?"
      isOpen={isOpen}
      onCancel={onClose}
      onClose={onClose}
      onSubmit={onLeave}
      submitButtonText="Leave"
    />
  );
};

export default UnsavedChangesModal;
