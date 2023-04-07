import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
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

import CREATE_CLASS from "../../../APIClients/mutations/ClassMutations";
import {
  ClassRequest,
  ClassResponse,
} from "../../../APIClients/types/ClassClientTypes";
import { Grade } from "../../../APIClients/types/UserClientTypes";
import { PlusOutlineIcon } from "../../../assets/icons";
import gradeOptions from "../../../constants/CreateAssessmentConstants";
import { ClassroomForm, ClassroomInput } from "../../../types/ClassroomTypes";
import ErrorToast from "../../common/ErrorToast";
import ModalFooterButtons from "../../common/ModalFooterButtons";

import AddClassroomConfirmationMessage from "./AddClassroomConfirmationMessage";
import SelectFormInputClassroom from "./SelectFormInputClassroom";

const AddClassroomModal = (): React.ReactElement => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ClassroomForm>();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [className, setClassName] = useState("");
  const [schoolYear, setSchoolYear] = useState<number>(0);
  const [gradeLevel, setGradeLevel] = useState<Grade>(Grade.K);
  const [teacher, setTeacher] = useState("6347056d47cd96025c18e639");
  const [testSessions, setTestSessions] = useState([]);
  const [classNameError, setClassNameError] = React.useState(false);
  const [schoolYearError, setSchoolYearError] = React.useState(false);
  const [gradeLevelError, setGradeLevelError] = React.useState(false);
  const [showRequestError, setShowRequestError] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null,
  );
  const [createClass] = useMutation<{ createClass: ClassResponse }>(
    CREATE_CLASS,
  );
  const [showRequestConfirmation, setShowRequestConfirmation] = useState(false);

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
    setClassName(watch("className"));
    setSchoolYear(parseInt(watch("schoolYear"), 10));
    setGradeLevel(watch("gradeLevel"));

    return true;
  };

  const onModalClose = () => {
    setClassName("");
    setSchoolYear(1);
    setGradeLevel(Grade.K);
    setValue("className", "");
    setValue("schoolYear", "");
    setValue("gradeLevel", Grade.K);
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
      return;
    }
    const classObj: ClassRequest = {
      className,
      schoolYear,
      gradeLevel,
      teacher,
      testSessions,
    };
    await createClass({ variables: { classObj } })
      .then((data) => {
        console.log("response data: ", data);
        if (showRequestError) setShowRequestError(false);
        setShowRequestConfirmation(true);
      })
      .catch(() => {
        setRequestErrorMessage(
          "There is an error in processing your information. Please refresh the page and enter your information again. Contact Jump Math support for help.",
        );
        setShowRequestError(true);
      });
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
          {showRequestConfirmation ? (
            <>
              <ModalBody>
                <AddClassroomConfirmationMessage />
              </ModalBody>
              <ModalFooter>
                <Button
                  mt={10}
                  onClick={() => window.location.reload()}
                  variant="primary"
                >
                  Return to dashboard
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
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
                <FormControl
                  isRequired
                  marginTop={showRequestError ? "10" : "0"}
                >
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
                        type="number"
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
                        options={gradeOptions}
                        placeholder="Choose a Grade Level"
                        setValue={setValue}
                        watch={watch}
                      />
                    </VStack>
                  </HStack>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <ModalFooterButtons
                  onDiscard={onModalClose}
                  onSave={onSubmit}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddClassroomModal;
