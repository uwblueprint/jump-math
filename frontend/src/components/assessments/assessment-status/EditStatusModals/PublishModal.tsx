import React from "react";
import { useMutation } from "@apollo/client";

import { PUBLISH_TEST } from "../../../../APIClients/mutations/TestMutations";
import GET_ALL_TESTS from "../../../../APIClients/queries/TestQueries";
import Modal from "../../../common/Modal";
import Toast from "../../../common/Toast";

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
}

const PublishModal = ({
  isOpen,
  onClose,
  assessmentId,
}: PublishModalProps): React.ReactElement => {
  const [publishAssessment, { error }] = useMutation<{
    publishAssessment: string;
  }>(PUBLISH_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = Toast();

  const onPublishAssessment = async () => {
    await publishAssessment({ variables: { id: assessmentId } });
    if (error) {
      showToast({
        message: "Assessment failed to publish. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "Assessment published.",
        status: "success",
      });
    }
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
