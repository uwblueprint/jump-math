import React from "react";
import { useMutation } from "@apollo/client";

import { ARCHIVE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_TESTS } from "../../../../APIClients/queries/TestQueries";
import Modal from "../../../common/Modal";
import Toast from "../../../common/Toast";

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
}

const ArchiveModal = ({
  isOpen,
  onClose,
  assessmentId,
}: ArchiveModalProps): React.ReactElement => {
  const [archiveAssessment, { error }] = useMutation<{
    archiveAssessment: string;
  }>(ARCHIVE_TEST, {
    refetchQueries: [{ query: GET_TESTS }],
  });

  const { showToast } = Toast();

  const onArchiveAssessment = async () => {
    await archiveAssessment({ variables: { id: assessmentId } });
    if (error) {
      showToast({
        message: "Assessment failed to archive. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "Assessment archived.",
        status: "success",
      });
    }
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
