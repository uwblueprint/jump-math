import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  HStack,
  VStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

import ModalFooterButtons from "../common/ModalFooterButtons";
import { PlusOutlineIcon } from "../../assets/icons";
import { ClassroomForm, ClassroomInput } from "../../types/ClassroomTypes";
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
  const [subjectError, setSubjectError] = React.useState(false);
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
      case "subject":
        setSubjectError(false);
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

    if (!watch("subject") || !!errors.subject) {
      setSubjectError(true);
      return false;
    }

    return true;
  };

  const onModalClose = () => {
    setValue("className", "");
    setValue("schoolYear", "");
    setValue("gradeLevel", "");
    setValue("subject", "");
    setShowRequestError(false);
    setRequestErrorMessage("");
    onClose();
  };

  const onSubmit = async () => {
    if (validateFields()) {
      console.log("yert");
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
        rightIcon={<PlusOutlineIcon />}
        variant="primary"
        my={2}
        onClick={onOpen}
      >
        Add Classroom
      </Button>
      <Modal isOpen={isOpen} onClose={onModalClose} size="3xl" isCentered>
        <ModalOverlay />
        <ModalContent p={2} maxW="80vw">
          <ModalHeader>
            <Text textStyle="subtitle1" color="grey.400">
              Add Classroom
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {showRequestError && (
              <Alert status="error" mb={10}>
                <AlertIcon />
                {requestErrorMessage}
              </Alert>
            )}
            <FormControl isRequired>
              <HStack direction="row" mt={6}>
                <VStack direction="column" align="left" width="320px">
                  <FormLabel color="blue.300">Class Name</FormLabel>
                  <Input
                    type="text"
                    value={watch("className")}
                    placeholder="Class Name"
                    onChange={(e) => handleChange(e, "className")}
                  />
                </VStack>
                <VStack direction="column" align="left" width="320px">
                  <FormLabel color="blue.300">School Year</FormLabel>
                  <Input
                    type="text"
                    value={watch("schoolYear")}
                    placeholder="School Year"
                    onChange={(e) => handleChange(e, "schoolYear")}
                  />
                </VStack>
              </HStack>
              <HStack direction="row" mt={6}>
                <VStack direction="column" align="left" width="320px">
                  <FormLabel color="blue.300">Grade Level</FormLabel>
                  <SelectFormInputClassroom
                    setValue={setValue}
                    watch={watch}
                    field="gradeLevel"
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
                    placeholder="Select Response"
                    // resetError={setIsCurrentlyTeachingJMError}
                    isSearchable={false}
                  />
                </VStack>
                <VStack direction="column" align="left" width="320px">
                  <FormLabel color="blue.300">Subject</FormLabel>
                  <SelectFormInputClassroom
                    setValue={setValue}
                    watch={watch}
                    field="subject"
                    options={[
                      {
                        value: "math",
                        label: "math",
                      },
                      {
                        value: "science",
                        label: "science",
                      },
                    ]}
                    placeholder="Select Response"
                    // resetError={setIsCurrentlyTeachingJMError}
                    isSearchable={false}
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
