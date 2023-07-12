import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { DELETE_CLASS } from "../../../../APIClients/mutations/ClassMutations";
import { GET_CLASSES_BY_TEACHER } from "../../../../APIClients/queries/ClassQueries";
import AuthContext from "../../../../contexts/AuthContext";
import Popover from "../../../common/popover/Popover";
import PopoverButton from "../../../common/popover/PopoverButton";

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
  const { authenticatedUser } = useContext(AuthContext);

  const { id: teacherId } = authenticatedUser ?? {};

  const [deleteClass] = useMutation<{ deleteClass: string }>(DELETE_CLASS, {
    variables: { classId },
    refetchQueries: [
      {
        query: GET_CLASSES_BY_TEACHER,
        variables: { teacherId },
      },
    ],
  });

  const handleDeleteClass = async () => {
    await deleteClass({ variables: { classId } });
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={onPopoverClose}
      onOpen={onPopoverOpen}
    >
      <VStack spacing={0}>
        <PopoverButton name="Edit" onClick={() => {}} />
        <Divider />
        <PopoverButton
          name="Delete"
          onClick={() => {
            handleDeleteClass();
          }}
        />
      </VStack>
    </Popover>
  );
};

export default ClassroomPopover;
