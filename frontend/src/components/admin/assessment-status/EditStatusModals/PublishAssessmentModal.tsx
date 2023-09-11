import React, { type ReactElement } from "react";

import Modal from "../../../common/modal/Modal";

interface PublishAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  publishAssessment: () => Promise<unknown>;
}

const PublishAssessmentModal = ({
  isOpen,
  onClose,
  publishAssessment,
}: PublishAssessmentModalProps): ReactElement => {
  return (
    <Modal
      body="Once this assessment is published, teachers will be able to distribute it to their students."
      header="Publish Assessment"
      isOpen={isOpen}
      messageOnError="Failed to publish the assessment. Please try again later."
      messageOnSuccess="Assessment published."
      onClose={onClose}
      onSubmit={publishAssessment}
      submitButtonText="Publish"
    />
  );
};

export default PublishAssessmentModal;
