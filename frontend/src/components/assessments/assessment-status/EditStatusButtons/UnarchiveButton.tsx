import React from "react";

import EditStatusButton from "../EditStatusButton";
import UnarchiveModal from "../EditStatusModals/UnarchiveModal";

interface UnarchiveButtonProps {
  assessmentId: string;
  closePopover: () => void;
}

const UnarchiveButton = ({
  assessmentId,
  closePopover,
}: UnarchiveButtonProps): React.ReactElement => {
  const [showUnarchiveModal, setShowUnarchiveModal] = React.useState(false);

  return (
    <>
      <EditStatusButton
        name="Un-archive"
        onClick={() => {
          closePopover();
          setShowUnarchiveModal(true);
        }}
      />
      <UnarchiveModal
        assessmentId={assessmentId}
        isOpen={showUnarchiveModal}
        onClose={() => setShowUnarchiveModal(false)}
      />
    </>
  );
};

export default UnarchiveButton;
