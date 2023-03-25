import React from "react";

import GenericModal from "../../common/GenericModal";

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArchiveModal = ({
  isOpen,
  onClose,
}: ArchiveModalProps): React.ReactElement => {
  const archiveTest = async () => {};

  return (
    <GenericModal
      body="Once this assessment is archived it is not visible to other teachers. This can be recovered as a draft on the assessments page."
      header="Archive Assessment"
      isOpen={isOpen}
      onCancel={onClose}
      onClose={onClose}
      onSubmit={archiveTest}
      submitButtonText="Archive"
    />
  );
};

export default ArchiveModal;
