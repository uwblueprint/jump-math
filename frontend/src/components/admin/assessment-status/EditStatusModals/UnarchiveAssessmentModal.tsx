import React from "react";

import Modal from "../../../common/modal/Modal";

interface UnarchiveAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  unarchiveAssessment: () => Promise<unknown>;
}

const UnarchiveAssessmentModal = ({
  isOpen,
  onClose,
  unarchiveAssessment,
}: UnarchiveAssessmentModalProps): React.ReactElement => (
  <Modal
    body="View this assessment under drafts once you unarchive it."
    header="Unarchive Assessment"
    isOpen={isOpen}
    messageOnError="Failed to unarchive the assessment. Please try again later."
    messageOnSuccess="Assessment unarchived."
    onClose={onClose}
    onSubmit={unarchiveAssessment}
    submitButtonText="Unarchive"
  />
);

export default UnarchiveAssessmentModal;
