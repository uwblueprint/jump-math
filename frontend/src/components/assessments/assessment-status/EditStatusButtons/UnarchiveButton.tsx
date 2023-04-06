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
  const [showUnarchiveModal, setshowUnarchiveModal] = React.useState(false);

  return (
    <>
      <EditStatusButton
        name="Unarchive"
        onClick={() => {
          closePopover();
          setshowUnarchiveModal(true);
        }}
      />
      <UnarchiveModal
        assessmentId={assessmentId}
        isOpen={showUnarchiveModal}
        onClose={() => setshowUnarchiveModal(false)}
      />
    </>
  );
};

export default UnarchiveButton;
