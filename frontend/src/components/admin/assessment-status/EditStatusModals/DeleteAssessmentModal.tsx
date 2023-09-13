import React from "react";

import Modal from "../../../common/modal/Modal";

interface DeleteAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteAssessment: () => void;
}

const DeleteAssessmentModal = ({
  isOpen,
  onClose,
  deleteAssessment,
}: DeleteAssessmentModalProps): React.ReactElement => (
  <Modal
    body="Once you delete this assessment it cannot be recovered."
    cancelButtonVariant="deleteCancel"
    header="Delete Assessment"
    isOpen={isOpen}
    messageOnError="Failed to delete the assessment. Please try again later."
    messageOnSuccess="Assessment deleted."
    onClose={onClose}
    onSubmit={deleteAssessment}
    submitButtonText="Delete"
    submitButtonVariant="delete"
  />
);

export default DeleteAssessmentModal;
