import React from "react";

import EditStatusButton from "../EditStatusButton";
import DeleteAssessmentModal from "../EditStatusModals/DeleteAssessmentModal";

interface DeleteAssessmentButtonProps {
  assessmentId: string;
  closePopover: () => void;
}

const DeleteAssessmentButton = ({
  assessmentId,
  closePopover,
}: DeleteAssessmentButtonProps): React.ReactElement => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  return (
    <>
      <EditStatusButton
        name="Delete"
        onClick={() => {
          closePopover();
          setShowDeleteModal(true);
        }}
      />
      <DeleteAssessmentModal
        assessmentId={assessmentId}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default DeleteAssessmentButton;
