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
  const [showDuplicateModal, setshowDuplicateModal] = React.useState(false);

  return (
    <>
      <EditStatusButton
        name="Duplicate"
        onClick={() => {
          closePopover();
          setshowDuplicateModal(true);
        }}
      />
      <DuplicateModal
        assessmentId={assessmentId}
        isOpen={showDuplicateModal}
        onClose={() => setshowDuplicateModal(false)}
      />
    </>
  );
};

export default DuplicateButton;
