import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { DELETE_CLASS } from "../../../../APIClients/mutations/ClassMutations";
import { GET_CLASSES_BY_TEACHER } from "../../../../APIClients/queries/ClassQueries";
import AuthContext from "../../../../contexts/AuthContext";
import Toast from "../../../common/info/Toast";
import Popover from "../../../common/popover/Popover";
import PopoverButton from "../../../common/popover/PopoverButton";

import AddOrEditClassroomModal from "./AddOrEditClassroomModal";
import DeleteClassroomModal from "./DeleteClassroomModal";

interface ClassroomPopoverProps {
  classId: string;
}

const ClassroomPopover = ({
  classId,
}: ClassroomPopoverProps): React.ReactElement => {
  const {
    isOpen: isPopoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
  } = useDisclosure();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const { authenticatedUser } = useContext(AuthContext);

  const { id: teacherId } = authenticatedUser ?? {};

  const [deleteClass, { error }] = useMutation<{ deleteClass: string }>(
    DELETE_CLASS,
    {
      variables: { classId },
      refetchQueries: [
        {
          query: GET_CLASSES_BY_TEACHER,
          variables: { teacherId },
        },
      ],
    },
  );

  const { showToast } = Toast();

  const handleDeleteClass = async () => {
    await deleteClass({ variables: { classId } });
    if (error) {
      showToast({
        message: "Classroom failed to delete. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "Classroom deleted.",
        status: "success",
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
      <DeleteClassroomModal
        deleteClassroom={handleDeleteClass}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default ClassroomPopover;
