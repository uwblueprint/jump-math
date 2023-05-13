import React from "react";
import { useMutation } from "@apollo/client";

import { ARCHIVE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import Toast from "../../../common/Toast";
import EditStatusButton from "../EditStatusButton";
import ArchiveModal from "../EditStatusModals/ArchiveModal";

interface ArchiveModalProps {
  assessmentId: string;
  closePopover: () => void;
}

const ArchiveButton = ({
  assessmentId,
  closePopover,
}: ArchiveModalProps): React.ReactElement => {
  const [showArchiveModal, setShowArchiveModal] = React.useState(false);
  const [archiveAssessment, { error }] = useMutation<{
    archiveAssessment: string;
  }>(ARCHIVE_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = Toast();

  const handleArchiveAssessment = async () => {
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
  };
  return (
    <>
      <EditStatusButton
        name="Archive"
        onClick={() => {
          closePopover();
          setShowArchiveModal(true);
        }}
      />
      <ArchiveModal
        archiveAssessment={handleArchiveAssessment}
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
      />
    </>
  );
};

export default ArchiveButton;
