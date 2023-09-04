import React, { type ReactElement } from "react";
import { useMutation } from "@apollo/client";
import { Divider, Text, useDisclosure, VStack } from "@chakra-ui/react";

import {
  ARCHIVE_CLASS,
  DELETE_CLASS,
} from "../../../../APIClients/mutations/ClassMutations";
import { GET_CLASSES_BY_TEACHER } from "../../../../APIClients/queries/ClassQueries";
import checkFeatureFlag from "../../../../checkFeatureFlag";
import { getQueryName } from "../../../../utils/GeneralUtils";
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
}: ClassroomPopoverProps): ReactElement => {
  const {
    isOpen: isPopoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const {
    isOpen: isArchiveModalOpen,
    onOpen: onArchiveModalOpen,
    onClose: onArchiveModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const [archiveClass] = useMutation<{ deleteClass: string }>(ARCHIVE_CLASS, {
    variables: { classId },
    refetchQueries: [getQueryName(GET_CLASSES_BY_TEACHER)],
  });

  const [deleteClass] = useMutation<{ deleteClass: string }>(DELETE_CLASS, {
    variables: { classId },
    refetchQueries: [getQueryName(GET_CLASSES_BY_TEACHER)],
  });

  const { showToast } = useToast();

  const handleArchiveClass = async () => {
    try {
      await archiveClass({ variables: { classId } });
      showToast({
        message: "Classroom archived.",
        status: "success",
      });
      onArchiveModalClose();
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
        <VStack divider={<Divider />} spacing={0}>
          {!isArchived && (
            <PopoverButton name="Edit" onClick={onEditModalOpen} />
          )}
          {!isArchived && checkFeatureFlag("ENABLE_CLASSROOM_ARCHIVING") && (
            <PopoverButton name="Archive" onClick={onArchiveModalOpen} />
          )}
          <PopoverButton name="Delete" onClick={onDeleteModalOpen} />
        </VStack>
      </Popover>
      <AddOrEditClassroomModal
        classroomId={classId}
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
      />
      <Modal
        body={
          'Are you sure you want to archive this classroom? You can find your archived classrooms in the "Archived" tab.'
        }
        customBodyText={
          <Text color="red.200" pt={2} textStyle="paragraph">
            Note that all <strong>upcoming</strong> assessments will be{" "}
            <u>deleted</u> and <strong>active</strong> assessments will{" "}
            <u>end</u>.
          </Text>
        }
        header="Archive Classroom"
        isOpen={isArchiveModalOpen}
        onClose={onArchiveModalClose}
        onSubmit={handleArchiveClass}
        submitButtonText="Archive"
      />
      <DeleteClassroomModal
        deleteClassroom={handleDeleteClass}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />
    </>
  );
};

export default ClassroomPopover;
