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
      onClose={onClose}
      onSubmit={onDistributeAssessment}
      submitButtonText="Distribute"
    />
  );
};

export default DistributeAssessmentModal;
