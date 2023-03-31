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
  const [showPublishModal, setshowPublishModal] = React.useState(false);

  return (
    <>
      <EditStatusButton
        name="Publish"
        onClick={() => {
          closePopover();
          setshowPublishModal(true);
        }}
      />
      <PublishModal
        assessmentId={assessmentId}
        isOpen={showPublishModal}
        onClose={() => setshowPublishModal(false)}
      />
    </>
  );
};

export default PublishButton;
