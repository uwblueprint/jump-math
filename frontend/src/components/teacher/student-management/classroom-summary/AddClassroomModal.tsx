import React, { useContext, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { useHistory } from "react-router-dom";
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
  CREATE_CLASS,
  UPDATE_CLASS,
} from "../../../../APIClients/mutations/ClassMutations";
import {
  GET_CLASS_DETAILS_BY_ID,
  GET_CLASSES_BY_TEACHER,
} from "../../../../APIClients/queries/ClassQueries";
import type { ClassResponse } from "../../../../APIClients/types/ClassClientTypes";
import { Grade } from "../../../../APIClients/types/UserClientTypes";
import AuthContext from "../../../../contexts/AuthContext";
import type {
  ClassroomForm,
  ClassroomInput,
} from "../../../../types/ClassroomTypes";
import { gradeOptions } from "../../../../utils/AssessmentUtils";
import { isPastDate } from "../../../../utils/GeneralUtils";
import DatePicker from "../../../common/DatePicker";
import ErrorToast from "../../../common/info/toasts/ErrorToast";
import useToast from "../../../common/info/useToast";
import ModalFooterButtons from "../../../common/modal/ModalFooterButtons";

import SelectFormInputClassroom from "./SelectFormInputClassroom";

type AddOrEditClassroomModalProps = {
  onClose: () => void;
  isOpen: boolean;
  classroomId?: string;
};

const AddOrEditClassroomModal = ({
  onClose,
  isOpen,
  classroomId,
}: AddOrEditClassroomModalProps): React.ReactElement => {
  const history = useHistory();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { dirtyFields, errors },
  } = useFormContext<ClassroomForm>();
  const { authenticatedUser } = useContext(AuthContext);
  const [showRequestError, setShowRequestError] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null,
  );
  const [createClass] = useMutation<{ createClass: ClassResponse }>(
    CREATE_CLASS,
    {
      refetchQueries: [
        {
          query: GET_CLASSES_BY_TEACHER,
          variables: { teacherId: authenticatedUser?.id },
        },
      ],
    },
  );
  const [updateClass] = useMutation<{ updateClass: ClassResponse }>(
    UPDATE_CLASS,
    {
      refetchQueries: [
        {
          query: GET_CLASS_DETAILS_BY_ID,
          variables: { classroomId },
        },
      ],
    },
  );

  const { showToast } = useToast();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ClassroomInput,
  ) => {
    setValue(field, event.target.value);
  };

  const handleDateChange = (date: Date) => {
    setValue("startDate", date, { shouldDirty: true });
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
    setValue("startDate", undefined);
    setValue("gradeLevel", Grade.K);
    setShowRequestError(false);
    setRequestErrorMessage("");
    onClose();
  };

  const onSave: SubmitHandler<ClassroomForm> = async (data) => {
    const startDate = watch("startDate");

    if (!validateFields()) {
      setShowRequestError(true);
      setRequestErrorMessage(
        "Please ensure all required components are filled out before saving changes",
      );
    } else if (dirtyFields.startDate && startDate && isPastDate(startDate)) {
      setShowRequestError(true);
      setRequestErrorMessage("Please set a present or future date");
    } else {
      if (showRequestError) setShowRequestError(false);
      const classObj = {
        ...data,
        startDate: data.startDate,
        teacher: authenticatedUser?.id,
      };

      if (classroomId) {
        try {
          await updateClass({
            variables: {
              classroomId,
              classObj,
            },
          });
          history.replace(history.location.pathname, undefined);
          showToast({
            message: "Classroom information updated.",
            status: "success",
          });
        } catch (e) {
          showToast({
            message:
              "Failed to update the classroom's information. Please try again.",
            status: "error",
          });
        }
      } else {
        try {
          await createClass({
            variables: {
              classObj: {
                ...data,
                startDate: data.startDate,
                teacher: authenticatedUser?.id,
              },
            },
          });
          showToast({
            message: "New classroom created.",
            status: "success",
          });
        } catch (e) {
          showToast({
            message: "Failed to create a new classroom. Please try again.",
            status: "error",
          });
        }
      }
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
              {classroomId ? "Edit Classroom" : "Add Classroom"}
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

export default AddOrEditClassroomModal;
