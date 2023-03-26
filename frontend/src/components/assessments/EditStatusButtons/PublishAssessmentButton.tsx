import React from "react";

import EditStatusButton from "../EditStatusButton";
import PublishAssessmentModal from "../EditStatusModals/PublishAssessmentModal";

interface PublishAssessmentButtonProps {
  assessmentId: string;
  closePopover: () => void;
}

const PublishAssessmentButton = ({
  assessmentId,
  closePopover,
}: PublishAssessmentButtonProps): React.ReactElement => {
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
      <PublishAssessmentModal
        assessmentId={assessmentId}
        isOpen={showPublishModal}
        onClose={() => setshowPublishModal(false)}
      />
    </>
  );
};

export default PublishAssessmentButton;
