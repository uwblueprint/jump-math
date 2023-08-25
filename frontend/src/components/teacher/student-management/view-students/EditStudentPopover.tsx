import React from "react";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { DELETE_STUDENT } from "../../../../APIClients/mutations/ClassMutations";
import { GET_CLASS_STUDENTS_BY_ID } from "../../../../APIClients/queries/ClassQueries";
import type { StudentResponse } from "../../../../APIClients/types/ClassClientTypes";
import { getQueryName } from "../../../../utils/GeneralUtils";
import Modal from "../../../common/modal/Modal";
import Popover from "../../../common/popover/Popover";
import PopoverButton from "../../../common/popover/PopoverButton";

type EditStudentPopoverProps = {
  student: StudentResponse;
  classId: string;
};

const EditStudentPopover = ({
  student,
  classId,
}: EditStudentPopoverProps): React.ReactElement => {
  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    variables: { classId, studentId: student.id },
    refetchQueries: [getQueryName(GET_CLASS_STUDENTS_BY_ID)],
  });

  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onClose: closeDeleteModal,
    onOpen: openDeleteModal,
  } = useDisclosure();

  return (
    <>
      <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <VStack divider={<Divider />} spacing="0em">
          <PopoverButton name="Edit" onClick={() => {}} />
          <PopoverButton name="Delete" onClick={openDeleteModal} />
        </VStack>
      </Popover>

      <Modal
        body="Are you sure you want to delete this student?"
        header="Delete Student"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onSubmit={deleteStudent}
        submitButtonText="Delete"
      />
    </>
  );
};

export default EditStudentPopover;
