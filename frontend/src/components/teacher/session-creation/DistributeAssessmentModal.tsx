import React from "react";

import Modal from "../../common/modal/Modal";

interface DistributeAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  distributeAssessment: () => void;
}

const DistributeAssessmentModal = ({
  isOpen,
  onClose,
  distributeAssessment,
}: DistributeAssessmentModalProps): React.ReactElement => {
  const onDistributeAssessment = () => {
    distributeAssessment();
    onClose();
  };

  return (
    <Modal
      body="Once this is published, students will be able to access this assessment when live."
      header="Distribute Assessment"
      isOpen={isOpen}
      messageOnError="Failed to save the assessment. Please try again."
      messageOnSuccess="Assessment saved."
      onClose={onClose}
      onSubmit={onDistributeAssessment}
      submitButtonText="Distribute"
    />
  );
};

export default DistributeAssessmentModal;
