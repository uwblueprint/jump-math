import React, { useContext, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  Button,
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { CREATE_STUDENT } from "../../../APIClients/mutations/ClassMutations";
import { StudentResponse } from "../../../APIClients/types/ClassClientTypes";
import { PlusOutlineIcon } from "../../../assets/icons";
import AuthContext from "../../../contexts/AuthContext";
import { StudentForm, StudentInput } from "../../../types/ClassroomTypes";
import ErrorToast from "../../common/ErrorToast";
import ModalFooterButtons from "../../common/ModalFooterButtons";
import Toast from "../../common/Toast";

const AddStudentModal = (): React.ReactElement => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<StudentForm>();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [showRequestError, setShowRequestError] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null,
  );
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
    setShowRequestError(false);
    setRequestErrorMessage("");
    onClose();
  };

  const onSave: SubmitHandler<StudentForm> = async (data) => {
    if (!validateFields()) {
      setShowRequestError(true);
      setRequestErrorMessage(
        "Please ensure all required components are filled out before saving changes",
      );
    } else {
      if (showRequestError) setShowRequestError(false);

      await createStudent({
        variables: {
          student: {
            firstName: watch("firstName"),
            lastName: watch("lastName"),
            studentNumber: watch("studentNumber"),
          },
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

  const handleSave = handleSubmit(onSave);

  return (
    <>
      <Button
        my={2}
        onClick={onOpen}
        rightIcon={<PlusOutlineIcon />}
        variant="primary"
      >
        Add Students
      </Button>
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
            {showRequestError && (
              <ErrorToast errorMessage={requestErrorMessage as string} />
            )}
            <FormControl isRequired marginTop={showRequestError ? "10" : "0"}>
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
            <ModalFooterButtons onDiscard={onModalClose} onSave={handleSave} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddStudentModal;
