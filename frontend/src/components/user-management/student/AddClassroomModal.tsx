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
import { ClassroomForm, ClassroomInput } from "../../../types/ClassroomTypes";
import ErrorToast from "../../common/ErrorToast";
import ModalFooterButtons from "../../common/ModalFooterButtons";

import SelectFormInputClassroom from "./SelectFormInputClassroom";

const AddClassroomModal = (): React.ReactElement => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ClassroomForm>();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [classNameError, setClassNameError] = React.useState(false);
  const [schoolYearError, setSchoolYearError] = React.useState(false);
  const [gradeLevelError, setGradeLevelError] = React.useState(false);
  const [showRequestError, setShowRequestError] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ClassroomInput,
  ) => {
    setValue(field, event.target.value);
    console.log(`${field}: ${event.target.value}`);

    switch (field) {
      case "className":
        setClassNameError(false);
        break;
      case "schoolYear":
        setSchoolYearError(false);
        break;
      case "gradeLevel":
        setGradeLevelError(false);
        break;
      default:
        break;
    }
  };

  const validateFields = (): boolean => {
    if (!watch("className") || !!errors.className) {
      setClassNameError(true);
      return false;
    }

    if (!watch("schoolYear") || !!errors.schoolYear) {
      setSchoolYearError(true);
      return false;
    }

    if (!watch("gradeLevel") || !!errors.gradeLevel) {
      setGradeLevelError(true);
      return false;
    }

    return true;
  };

  const onModalClose = () => {
    setValue("className", "");
    setValue("schoolYear", "");
    setValue("gradeLevel", "");
    setShowRequestError(false);
    setRequestErrorMessage("");
    onClose();
  };

  const onSubmit = async () => {
    if (validateFields()) {
      console.log(`Classname: ${watch("className")}`);
      console.log(`School Year: ${watch("schoolYear")}`);
      console.log(`Grade Level: ${watch("gradeLevel")}`);
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
        Add New Classroom
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onModalClose} size="3xl">
        <ModalOverlay />
        <ModalContent maxW="80vw" p={2}>
          <ModalHeader>
            <Text color="grey.400" textStyle="subtitle1">
              Add Classroom
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
                  <FormLabel color="blue.300">Class Name</FormLabel>
                  <Input
                    onChange={(e) => handleChange(e, "className")}
                    placeholder="Type in Class Name"
                    type="text"
                    value={watch("className")}
                  />
                </VStack>
                <VStack align="left" direction="column" width="320px">
                  <FormLabel color="blue.300">School Year</FormLabel>
                  <Input
                    onChange={(e) => handleChange(e, "schoolYear")}
                    placeholder="Type in School Year"
                    type="text"
                    value={watch("schoolYear")}
                  />
                </VStack>
              </HStack>
              <HStack direction="row" mt={6}>
                <VStack align="left" direction="column" width="320px">
                  <FormLabel color="blue.300">Grade Level</FormLabel>
                  <SelectFormInputClassroom
                    field="gradeLevel"
                    isSearchable={false}
                    options={[
                      {
                        value: "grade 1",
                        label: "grade 1",
                      },
                      {
                        value: "grade 2",
                        label: "grade 2",
                      },
                    ]}
                    placeholder="Choose a Grade Level"
                    setValue={setValue}
                    watch={watch}
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

export default AddClassroomModal;