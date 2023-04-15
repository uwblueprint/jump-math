import React from "react";

import EditStatusButton from "../EditStatusButton";
import PublishModal from "../EditStatusModals/PublishModal";

interface PublishButtonProps {
  assessmentId: string;
  closePopover: () => void;
}

const PublishButton = ({
  assessmentId,
  closePopover,
}: PublishButtonProps): React.ReactElement => {
  const [showPublishModal, setShowPublishModal] = React.useState(false);

  return (
    <>
      <EditStatusButton
        name="Publish"
        onClick={() => {
          closePopover();
          setShowPublishModal(true);
        }}
      />
      <PublishModal
        assessmentId={assessmentId}
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
      />
    </>
  );
};

export default PublishButton;
