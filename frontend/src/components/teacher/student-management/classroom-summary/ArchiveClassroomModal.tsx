import React, { type ReactElement } from "react";

import Modal from "../../../common/modal/Modal";

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  archiveClassroom: () => Promise<unknown>;
}

const ArchiveClassroomModal = ({
  isOpen,
  onClose,
  archiveClassroom,
}: ArchiveModalProps): ReactElement => {
  return (
    <Modal
      body={
        'Archiving this classroom will mark all related assessments as closed. You can find your archived classrooms in the "Archived" tab.'
      }
      header="Archive Classroom"
      isOpen={isOpen}
      messageOnError="Failed to archive the classroom. Please try again later."
      messageOnSuccess="Classroom archived."
      onClose={onClose}
      onSubmit={archiveClassroom}
      submitButtonText="Archive"
    />
  );
};

export default ArchiveClassroomModal;
