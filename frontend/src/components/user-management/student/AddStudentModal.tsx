import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
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

import { PlusOutlineIcon } from "../../../assets/icons";
import { StudentForm, StudentInput } from "../../../types/ClassroomTypes";
import ErrorToast from "../../common/ErrorToast";
import ModalFooterButtons from "../../common/ModalFooterButtons";

const AddStudentModal = (): React.ReactElement => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<StudentForm>();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [studentNumberError, setStudentNumberError] = React.useState(false);
  const [showRequestError, setShowRequestError] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: StudentInput,
  ) => {
    setValue(field, event.target.value);
    console.log(`${field}: ${event.target.value}`);

    switch (field) {
      case "firstName":
        setFirstNameError(false);
        break;
      case "lastName":
        setLastNameError(false);
        break;
      case "studentNumber":
        setStudentNumberError(false);
        break;
      default:
        break;
    }
  };

  const validateFields = (): boolean => {
    if (!watch("firstName") || !!errors.firstName) {
      setFirstNameError(true);
      return false;
    }

    if (!watch("lastName") || !!errors.lastName) {
      setLastNameError(true);
      return false;
    }

    if (errors.studentNumber) {
      setStudentNumberError(true);
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

  const onSubmit = async () => {
    if (validateFields()) {
      console.log(`First Name: ${watch("firstName")}`);
      console.log(`Last Name: ${watch("lastName")}`);
      console.log(`Student Number: ${watch("studentNumber")}`);
    } else {
      setShowRequestError(true);
      setRequestErrorMessage(
        "Please ensure all required components are filled out before submitting your application.",
      );
    }
  };

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
        <ModalContent maxW="80vw" p={2}>
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
            <ModalFooterButtons onDiscard={onModalClose} onSave={onSubmit} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddStudentModal;
