import React from "react";

import Modal from "../../../common/Modal";

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  publishAssessment: () => void;
}

const PublishModal = ({
  isOpen,
  onClose,
  publishAssessment,
}: PublishModalProps): React.ReactElement => {
  const onPublishAssessment = () => {
    publishAssessment();
    onClose();
  };

  return (
    <Modal
      body="Once this is published, teachers will be able to distribute this assessment to their students."
      header="Publish Assessment"
      isOpen={isOpen}
      onCancel={onClose}
      onClose={onClose}
      onSubmit={onPublishAssessment}
      submitButtonText="Publish"
    />
  );
};

export default PublishModal;
