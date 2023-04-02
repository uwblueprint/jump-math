import React from "react";

import EditStatusButton from "../EditStatusButton";
import DeleteModal from "../EditStatusModals/DeleteModal";

interface DeleteButtonProps {
  assessmentId: string;
  closePopover: () => void;
}

const DeleteButton = ({
  assessmentId,
  closePopover,
}: DeleteButtonProps): React.ReactElement => {
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
      <DeleteModal
        assessmentId={assessmentId}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default DeleteButton;
