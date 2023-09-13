import React, { type ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";

import {
  CREATE_STUDENT,
  UPDATE_STUDENT,
} from "../../../APIClients/mutations/ClassMutations";
import { GET_CLASS_STUDENTS_BY_ID } from "../../../APIClients/queries/ClassQueries";
import type { StudentResponse } from "../../../APIClients/types/ClassClientTypes";
import type { StudentForm } from "../../../types/ClassroomTypes";
import { FormValidationError, getQueryName } from "../../../utils/GeneralUtils";
import InlineFormError from "../../common/form/InlineFormError";
import Modal from "../../common/modal/Modal";
import useModalFormHandler from "../../common/modal/useModalFormHandler";

type AddOrEditStudentModalProps = {
  onClose: () => void;
  isOpen: boolean;
  classId: string;
  studentId?: string;
};

const AddOrEditStudentModal = ({
  onClose,
  isOpen,
  classId,
  studentId,
}: AddOrEditStudentModalProps): ReactElement => {
  const {
    reset: resetForm,
    formState: { errors },
    register,
  } = useFormContext<StudentForm>();

  const [createStudent] = useMutation<{ createStudent: StudentResponse }>(
    CREATE_STUDENT,
    {
      refetchQueries: [getQueryName(GET_CLASS_STUDENTS_BY_ID)],
    },
  );
  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    refetchQueries: [getQueryName(GET_CLASS_STUDENTS_BY_ID)],
  });

  const isEditing = !!studentId;
  const upsertStudent = isEditing ? updateStudent : createStudent;

  const onModalClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = useModalFormHandler((student) =>
    upsertStudent({
      variables: {
        classId,
        studentId,
        student,
      },
    }),
  );

  return (
    <Modal
      cancelButtonText="Discard"
      header={isEditing ? "Edit Student" : "Add Student"}
      isOpen={isOpen}
      messageOnError={(error) => {
        if (error instanceof FormValidationError) {
          return error.message;
        }

        return isEditing
          ? "Failed to update the student. Please try again later."
          : "Failed to create the student. Please try again later.";
      }}
      messageOnSuccess={isEditing ? "Student updated." : "Student added."}
      onClose={onModalClose}
      onSubmit={handleSave}
      submitButtonText="Save"
      variant="large"
    >
      <HStack direction="row" mt={6}>
        <VStack align="left" direction="column" width="320px">
          <FormControl isInvalid={!!errors.firstName} isRequired>
            <FormLabel color="blue.300">First Name</FormLabel>
            <Input
              placeholder="Type in First Name"
              type="text"
              {...register("firstName", {
                required: { value: true, message: "This field is required." },
              })}
            />
            <InlineFormError
              error={errors.firstName}
              showPlaceholder={!!errors.lastName}
            />
          </FormControl>
        </VStack>
        <VStack align="left" direction="column" width="320px">
          <FormControl isInvalid={!!errors.lastName} isRequired>
            <FormLabel color="blue.300">Last Name</FormLabel>
            <Input
              placeholder="Type in Last Name"
              type="text"
              {...register("lastName", {
                required: { value: true, message: "This field is required." },
              })}
            />
            <InlineFormError
              error={errors.lastName}
              showPlaceholder={!!errors.firstName}
            />
          </FormControl>
        </VStack>
      </HStack>
      <HStack direction="row" mt={6}>
        <VStack align="left" direction="column" width="320px">
          <FormControl isInvalid={!!errors.studentNumber}>
            <FormLabel color="blue.300">Student ID</FormLabel>
            <Input placeholder="(Optional)" {...register("studentNumber")} />
            <InlineFormError error={errors.studentNumber} />
          </FormControl>
        </VStack>
      </HStack>
    </Modal>
  );
};

export default AddOrEditStudentModal;
