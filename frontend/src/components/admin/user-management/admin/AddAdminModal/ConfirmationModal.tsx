import React from "react";

import AddAdminConfirmationMessage from "../../../../common/info/messages/AddAdminConfirmationMessage";
import Modal from "../../../../common/modal/Modal";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConfirmationModal = ({ isOpen, onClose }: ConfirmationModalProps) => (
  <Modal
    cancelButtonText=""
    header=""
    isOpen={isOpen}
    onClose={onClose}
    showDefaultToasts={false}
    submitButtonText="Return to users page"
    variant="large"
  >
    <AddAdminConfirmationMessage />
  </Modal>
);

export default ConfirmationModal;
