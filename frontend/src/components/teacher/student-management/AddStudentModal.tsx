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

import { CREATE_STUDENT } from "../../../APIClients/mutations/ClassMutations";
import type { StudentResponse } from "../../../APIClients/types/ClassClientTypes";
import type { StudentForm, StudentInput } from "../../../types/ClassroomTypes";
import Toast from "../../common/info/Toast";
import ErrorToast from "../../common/info/toasts/ErrorToast";
import ModalFooterButtons from "../../common/modal/ModalFooterButtons";

type AddStudentModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const AddStudentModal = ({
  onClose,
  isOpen,
}: AddStudentModalProps): ReactElement => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<StudentForm>();
  const [errorMessage, setErrorMessage] = useState("");
  const [createStudent] = useMutation<{ createStudent: StudentResponse }>(
    CREATE_STUDENT,
  );
  const { showToast } = Toast();

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
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("studentNumber", undefined);
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

      await createStudent({
        variables: {
          student: {
            firstName: watch("firstName"),
            lastName: watch("lastName"),
            studentNumber: watch("studentNumber"),
          },
          // We're hardcoding a value as a placeholder until there's a class context to pass in
          classId: "642b8eb6bfc20e04f56c2a46",
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
            Add a new student
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

export default AddStudentModal;
