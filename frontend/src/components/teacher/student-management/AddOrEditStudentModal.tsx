import React, { type ReactElement, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  CREATE_STUDENT,
  UPDATE_STUDENT,
} from "../../../APIClients/mutations/ClassMutations";
import { GET_CLASS_STUDENTS_BY_ID } from "../../../APIClients/queries/ClassQueries";
import type { StudentResponse } from "../../../APIClients/types/ClassClientTypes";
import type { StudentForm, StudentInput } from "../../../types/ClassroomTypes";
import { getQueryName } from "../../../utils/GeneralUtils";
import ErrorToast from "../../common/info/toasts/ErrorToast";
import useToast from "../../common/info/useToast";
import ModalFooterButtons from "../../common/modal/ModalFooterButtons";

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
    handleSubmit,
    watch,
    setValue,
    reset: resetForm,
    formState: { errors },
  } = useFormContext<StudentForm>();
  const [errorMessage, setErrorMessage] = useState("");
  const [createStudent] = useMutation<{ createStudent: StudentResponse }>(
    CREATE_STUDENT,
    {
      refetchQueries: [getQueryName(GET_CLASS_STUDENTS_BY_ID)],
    },
  );
  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    refetchQueries: [getQueryName(GET_CLASS_STUDENTS_BY_ID)],
  });
  const { showToast } = useToast();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: StudentInput,
  ) => {
    setValue(field, event.target.value);
  };

  const validateFields = (): boolean => {
    if (!watch("firstName") || !!errors.firstName) {
      return false;
    }

    if (!watch("lastName") || !!errors.lastName) {
      return false;
    }

    if (errors.studentNumber) {
      return false;
    }

    return true;
  };

  const onModalClose = () => {
    resetForm();
    setErrorMessage("");
    onClose();
  };

  const onConfirm: SubmitHandler<StudentForm> = async () => {
    if (!validateFields()) {
      setErrorMessage(
        "Please ensure all required components are filled out before saving changes",
      );
    } else {
      setErrorMessage("");

      if (studentId) {
        await updateStudent({
          variables: {
            classId,
            studentId,
            student: {
              firstName: watch("firstName"),
              lastName: watch("lastName"),
              studentNumber: watch("studentNumber"),
            },
          },
        })
          .then(() => {
            showToast({
              message: "Student updated.",
              status: "success",
            });
          })
          .catch(() => {
            showToast({
              message: "Failed to update student. Please try again.",
              status: "error",
            });
          });
      } else {
        await createStudent({
          variables: {
            student: {
              firstName: watch("firstName"),
              lastName: watch("lastName"),
              studentNumber: watch("studentNumber"),
            },
            classId,
          },
        })
          .then(() => {
            showToast({
              message: "New student created.",
              status: "success",
            });
          })
          .catch(() => {
            showToast({
              message: "Failed to create a new student. Please try again.",
              status: "error",
            });
          });
      }
      onModalClose();
    }
  };

  const handleConfirm = handleSubmit(onConfirm);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onModalClose} size="3xl">
      <ModalOverlay />
      <ModalContent borderRadius="12px" maxW="80vw" p={2}>
        <ModalHeader>
          <Text color="grey.400" textStyle="subtitle1">
            {studentId ? "Edit student" : "Add student"}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {errorMessage && <ErrorToast errorMessage={errorMessage as string} />}
          <FormControl isRequired marginTop={errorMessage ? "10" : "0"}>
            <HStack direction="row" mt={6}>
              <VStack align="left" direction="column" width="320px">
                <FormLabel color="blue.300">First Name</FormLabel>
                <Input
                  onChange={(e) => handleChange(e, "firstName")}
                  placeholder="Type in First Name"
                  type="text"
                  value={watch("firstName")}
                />
              </VStack>
              <VStack align="left" direction="column" width="320px">
                <FormLabel color="blue.300">Last Name</FormLabel>
                <Input
                  onChange={(e) => handleChange(e, "lastName")}
                  placeholder="Type in Last Name"
                  type="text"
                  value={watch("lastName")}
                />
              </VStack>
            </HStack>
            <HStack direction="row" mt={6}>
              <VStack align="left" direction="column" width="320px">
                <FormLabel color="blue.300" requiredIndicator={<></>}>
                  Student Number
                </FormLabel>
                <Input
                  isRequired={false}
                  onChange={(e) => handleChange(e, "studentNumber")}
                  placeholder="(Optional)"
                  type="number"
                  value={watch("studentNumber")}
                />
              </VStack>
            </HStack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ModalFooterButtons onDiscard={onModalClose} onSave={handleConfirm} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddOrEditStudentModal;
