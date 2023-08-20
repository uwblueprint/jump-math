import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import {
  ARCHIVE_CLASS,
  DELETE_CLASS,
} from "../../../../APIClients/mutations/ClassMutations";
import { GET_CLASSES_BY_TEACHER } from "../../../../APIClients/queries/ClassQueries";
import AuthContext from "../../../../contexts/AuthContext";
import useToast from "../../../common/info/useToast";
import Modal from "../../../common/modal/Modal";
import Popover from "../../../common/popover/Popover";
import PopoverButton from "../../../common/popover/PopoverButton";

import AddOrEditClassroomModal from "./AddOrEditClassroomModal";
import DeleteClassroomModal from "./DeleteClassroomModal";

interface ClassroomPopoverProps {
  classId: string;
  isArchived?: boolean;
}

const ClassroomPopover = ({
  classId,
  isArchived,
}: ClassroomPopoverProps): React.ReactElement => {
  const {
    isOpen: isPopoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
  } = useDisclosure();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { authenticatedUser } = useContext(AuthContext);

  const { id: teacherId } = authenticatedUser ?? {};

  const [archiveClass] = useMutation<{ deleteClass: string }>(ARCHIVE_CLASS, {
    variables: { classId },
    refetchQueries: [
      {
        query: GET_CLASSES_BY_TEACHER,
        variables: { teacherId },
      },
    ],
  });

  const [deleteClass] = useMutation<{ deleteClass: string }>(DELETE_CLASS, {
    variables: { classId },
    refetchQueries: [
      {
        query: GET_CLASSES_BY_TEACHER,
        variables: { teacherId },
      },
    ],
  });

  const { showToast } = useToast();

  const handleArchiveClass = async () => {
    try {
      await archiveClass({ variables: { classId } });
      showToast({
        message: "Classroom archived.",
        status: "success",
      });
    } catch (error) {
      showToast({
        message: "Classroom failed to archive. Please try again.",
        status: "error",
      });
    }
  };

  const handleDeleteClass = async () => {
    try {
      await deleteClass({ variables: { classId } });
      showToast({
        message: "Classroom deleted.",
        status: "success",
      });
    } catch (error) {
      showToast({
        message: "Classroom failed to delete. Please try again.",
        status: "error",
      });
    }
  };

  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        onClose={onPopoverClose}
        onOpen={onPopoverOpen}
      >
        <VStack spacing={0}>
          <PopoverButton
            name="Edit"
            onClick={() => {
              onPopoverClose();
              setShowEditModal(true);
            }}
          />
          <Divider />
          {!isArchived && (
            <>
              <PopoverButton
                name="Archive"
                onClick={() => {
                  onPopoverClose();
                  setShowArchiveModal(true);
                }}
              />
              <Divider />
            </>
          )}
          <PopoverButton
            name="Delete"
            onClick={() => {
              onPopoverClose();
              setShowDeleteModal(true);
            }}
          />
        </VStack>
      </Popover>
      <AddOrEditClassroomModal
        classroomId={classId}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
      <Modal
        body={
          'Are you sure you want to archive this classroom? You can find your archived classrooms in the "Archived" tab.'
        }
        header="Archive Classroom"
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        onSubmit={handleArchiveClass}
        submitButtonText="Archive"
      />
      <DeleteClassroomModal
        deleteClassroom={handleDeleteClass}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default ClassroomPopover;
