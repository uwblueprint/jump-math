import React from "react";

import Modal from "../../../common/Modal";

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  archiveAssessment: () => void;
}

const ArchiveModal = ({
  isOpen,
  onClose,
  archiveAssessment,
}: ArchiveModalProps): React.ReactElement => {
  const onArchiveAssessment = () => {
    archiveAssessment();
    onClose();
  };

  return (
    <Modal
      body="Once this assessment is archived it is not visible to other teachers. This can be recovered as a draft on the assessments page."
      header="Archive Assessment"
      isOpen={isOpen}
      onCancel={onClose}
      onClose={onClose}
      onSubmit={onArchiveAssessment}
      submitButtonText="Archive"
    />
  );
};

export default ArchiveModal;
