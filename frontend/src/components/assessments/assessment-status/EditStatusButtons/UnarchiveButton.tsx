import React from "react";

import PopoverButton from "../../../common/PopoverButton";
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
      <PopoverButton
        name="Unarchive"
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
