import React from "react";

import EditStatusButton from "../EditStatusButton";
import DuplicateModal from "../EditStatusModals/DuplicateModal";

interface DuplicateButtonProps {
  assessmentId: string;
  closePopover: () => void;
}

const DuplicateButton = ({
  assessmentId,
  closePopover,
}: DuplicateButtonProps): React.ReactElement => {
  const [showDuplicateModal, setShowDuplicateModal] = React.useState(false);

  return (
    <>
      <EditStatusButton
        name="Duplicate"
        onClick={() => {
          closePopover();
          setShowDuplicateModal(true);
        }}
      />
      <DuplicateModal
        assessmentId={assessmentId}
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
      />
    </>
  );
};

export default DuplicateButton;
