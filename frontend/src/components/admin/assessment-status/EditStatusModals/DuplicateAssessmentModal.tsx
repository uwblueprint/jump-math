import React from "react";

import Modal from "../../../common/modal/Modal";

interface DuplicateAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  duplicateAssessment: () => Promise<unknown>;
}

const DuplicateAssessmentModal = ({
  isOpen,
  onClose,
  duplicateAssessment,
}: DuplicateAssessmentModalProps): React.ReactElement => {
  return (
    <Modal
      body="This will create a copy of this existing assessment. The new assessment can be viewed under draft assessments."
      header="Duplicate Assessment"
      isOpen={isOpen}
      messageOnError="Failed to duplicate assessment. Please try again later."
      messageOnSuccess="Assessment duplicated."
      onClose={onClose}
      onSubmit={duplicateAssessment}
      submitButtonText="Duplicate"
    />
  );
};

export default DuplicateAssessmentModal;
