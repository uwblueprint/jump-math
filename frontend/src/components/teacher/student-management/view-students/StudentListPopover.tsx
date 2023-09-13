import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { DELETE_STUDENT } from "../../../../APIClients/mutations/ClassMutations";
import { GET_CLASS_STUDENTS_BY_ID } from "../../../../APIClients/queries/ClassQueries";
import type { StudentResponse } from "../../../../APIClients/types/ClassClientTypes";
import type { StudentForm } from "../../../../types/ClassroomTypes";
import { getQueryName } from "../../../../utils/GeneralUtils";
import Modal from "../../../common/modal/Modal";
import Popover from "../../../common/popover/Popover";
import PopoverButton from "../../../common/popover/PopoverButton";
import AddOrEditStudentModal from "../AddOrEditStudentModal";

type StudentListPopoverProps = {
  student: StudentResponse;
  classId: string;
};

const StudentListPopover = ({
  student,
  classId,
}: StudentListPopoverProps): React.ReactElement => {
  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    variables: { classId, studentId: student.id },
    refetchQueries: [getQueryName(GET_CLASS_STUDENTS_BY_ID)],
  });

  const studentFormMethods = useForm<StudentForm>({
    defaultValues: student,
    mode: "onChange",
  });

  useEffect(() => {
    studentFormMethods.reset(
      {
        firstName: student.firstName,
        lastName: student.lastName,
        studentNumber: student.studentNumber,
      },
      {
        keepDefaultValues: false,
      },
    );
  }, [
    student.firstName,
    student.lastName,
    student.studentNumber,
    studentFormMethods,
  ]);

  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onClose: closeUpdateModal,
    onOpen: openUpdateModal,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onClose: closeDeleteModal,
    onOpen: openDeleteModal,
  } = useDisclosure();

  return (
    <>
      <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <VStack divider={<Divider />} spacing={0}>
          <PopoverButton name="Edit" onClick={openUpdateModal} />
          <PopoverButton name="Delete" onClick={openDeleteModal} />
        </VStack>
      </Popover>

      <FormProvider {...studentFormMethods}>
        <AddOrEditStudentModal
          classId={classId}
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          studentId={student.id}
        />
      </FormProvider>
      <Modal
        body="Are you sure you want to delete this student?"
        cancelButtonVariant="deleteCancel"
        header="Delete Student"
        isOpen={isDeleteModalOpen}
        messageOnError="Failed to delete the student. Please try again later."
        messageOnSuccess="Student deleted."
        onClose={closeDeleteModal}
        onSubmit={deleteStudent}
        submitButtonText="Delete"
        submitButtonVariant="delete"
      />
    </>
  );
};

export default StudentListPopover;
