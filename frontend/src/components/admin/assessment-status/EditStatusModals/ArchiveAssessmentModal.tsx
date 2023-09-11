import React from "react";

import Modal from "../../../common/modal/Modal";

interface ArchiveAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  archiveAssessment: () => Promise<unknown>;
}

const ArchiveAssessmentModal = ({
  isOpen,
  onClose,
  archiveAssessment,
}: ArchiveAssessmentModalProps): React.ReactElement => (
  <Modal
    body="Once this assessment is archived it will not be visible to teachers. It can be recovered as a draft on the assessments page."
    header="Archive Assessment"
    isOpen={isOpen}
    messageOnError="Failed to archive the assessment. Please try again later."
    messageOnSuccess="Assessment archived."
    onClose={onClose}
    onSubmit={archiveAssessment}
    submitButtonText="Archive"
  />
);

export default ArchiveAssessmentModal;
