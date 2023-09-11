import React, { type ReactElement } from "react";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import {
  ARCHIVE_CLASS,
  DELETE_CLASS,
} from "../../../../APIClients/mutations/ClassMutations";
import { GET_CLASSES_BY_TEACHER } from "../../../../APIClients/queries/ClassQueries";
import checkFeatureFlag from "../../../../checkFeatureFlag";
import { getQueryName } from "../../../../utils/GeneralUtils";
import Popover from "../../../common/popover/Popover";
import PopoverButton from "../../../common/popover/PopoverButton";

import AddOrEditClassroomModal from "./AddOrEditClassroomModal";
import ArchiveClassroomModal from "./ArchiveClassroomModal";
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

  const [archiveClassroom] = useMutation<{ deleteClass: string }>(
    ARCHIVE_CLASS,
    {
      variables: { classId },
      refetchQueries: [getQueryName(GET_CLASSES_BY_TEACHER)],
    },
  );

  const [deleteClassroom] = useMutation<{ deleteClass: string }>(DELETE_CLASS, {
    variables: { classId },
    refetchQueries: [getQueryName(GET_CLASSES_BY_TEACHER)],
  });

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
      <ArchiveClassroomModal
        archiveClassroom={archiveClassroom}
        isOpen={isArchiveModalOpen}
        onClose={onArchiveModalClose}
      />
      <DeleteClassroomModal
        deleteClassroom={deleteClassroom}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />
    </>
  );
};

export default ClassroomPopover;
