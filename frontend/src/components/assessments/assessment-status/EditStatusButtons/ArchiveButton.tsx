import React from "react";

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
        assessmentId={assessmentId}
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
      />
    </>
  );
};

export default ArchiveButton;
