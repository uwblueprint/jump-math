import React, { useContext, useState } from "react";
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

import { CREATE_CLASS } from "../../../APIClients/mutations/ClassMutations";
import type { ClassResponse } from "../../../APIClients/types/ClassClientTypes";
import { Grade } from "../../../APIClients/types/UserClientTypes";
import AuthContext from "../../../contexts/AuthContext";
import type {
  ClassroomForm,
  ClassroomInput,
} from "../../../types/ClassroomTypes";
import { gradeOptions } from "../../../utils/AssessmentUtils";
import DatePicker from "../../common/DatePicker";
import ErrorToast from "../../common/ErrorToast";
import ModalFooterButtons from "../../common/ModalFooterButtons";
import Toast from "../../common/Toast";

import SelectFormInputClassroom from "./SelectFormInputClassroom";
type AddClassroomModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const AddClassroomModal = ({
  onClose,
  isOpen,
}: AddClassroomModalProps): React.ReactElement => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ClassroomForm>();
  const { authenticatedUser } = useContext(AuthContext);
  const [showRequestError, setShowRequestError] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null,
  );
  const [createClass] = useMutation<{ createClass: ClassResponse }>(
    CREATE_CLASS,
  );
  const { showToast } = Toast();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ClassroomInput,
  ) => {
    setValue(field, event.target.value);
  };

  const handleDateChange = (date: Date) => {
    setValue("startDate", date);
  };

  const validateFields = (): boolean => {
    if (!watch("className") || !!errors.className) {
      return false;
    }

    if (!watch("startDate") || !!errors.startDate) {
      return false;
    }

    if (!watch("gradeLevel") || !!errors.gradeLevel) {
      return false;
    }
    return true;
  };

  const onModalClose = () => {
    setValue("className", "");
    setValue("startDate", new Date());
    setValue("gradeLevel", Grade.K);
    setShowRequestError(false);
    setRequestErrorMessage("");
    onClose();
  };

  const onSave: SubmitHandler<ClassroomForm> = async (data) => {
    if (!validateFields()) {
      setShowRequestError(true);
      setRequestErrorMessage(
        "Please ensure all required components are filled out before saving changes",
      );
    } else {
      if (showRequestError) setShowRequestError(false);
      await createClass({
        variables: {
          classObj: {
            ...data,
            startDate: data.startDate,
            teacher: authenticatedUser?.id,
          },
        },
      })
        .then(() => {
          showToast({
            message: "New classroom created.",
            status: "success",
          });
        })
        .catch(() => {
          showToast({
            message: "Failed to create a new classroom. Please try again.",
            status: "error",
          });
        });
      onModalClose();
    }
  };

  const handleSave = handleSubmit(onSave);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onModalClose} size="3xl">
        <ModalOverlay />
        <ModalContent borderRadius="12px" maxW="80vw" p={2}>
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
                  <FormLabel color="blue.300">Start Date</FormLabel>
                  <DatePicker
                    onChange={handleDateChange}
                    value={watch("startDate")}
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
            <ModalFooterButtons onDiscard={onModalClose} onSave={handleSave} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddClassroomModal;
