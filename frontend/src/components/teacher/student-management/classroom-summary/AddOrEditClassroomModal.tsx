import React, { type ReactElement, useContext } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import isSameDay from "date-fns/isSameDay";

import {
  CREATE_CLASS,
  UPDATE_CLASS,
} from "../../../../APIClients/mutations/ClassMutations";
import {
  GET_CLASS_DETAILS_BY_ID,
  GET_CLASSES_BY_TEACHER,
} from "../../../../APIClients/queries/ClassQueries";
import type { ClassResponse } from "../../../../APIClients/types/ClassClientTypes";
import AuthContext from "../../../../contexts/AuthContext";
import type { ClassroomForm } from "../../../../types/ClassroomTypes";
import { gradeOptions } from "../../../../utils/AssessmentUtils";
import {
  FormValidationError,
  getQueryName,
} from "../../../../utils/GeneralUtils";
import DatePicker from "../../../common/DatePicker";
import InlineFormError from "../../../common/form/InlineFormError";
import Modal from "../../../common/modal/Modal";

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
}: AddOrEditClassroomModalProps): ReactElement => {
  const {
    handleSubmit,
    watch,
    setValue,
    reset: resetForm,
    formState,
    register,
  } = useFormContext<ClassroomForm>();
  const { dirtyFields, errors } = formState;

  const { authenticatedUser } = useContext(AuthContext);
  const [createClass] = useMutation<{ createClass: ClassResponse }>(
    CREATE_CLASS,
    {
      refetchQueries: [getQueryName(GET_CLASSES_BY_TEACHER)],
    },
  );
  const [updateClass] = useMutation<{ updateClass: ClassResponse }>(
    UPDATE_CLASS,
    {
      refetchQueries: [
        getQueryName(GET_CLASSES_BY_TEACHER),
        getQueryName(GET_CLASS_DETAILS_BY_ID),
      ],
    },
  );
  const upsertClass = classroomId ? updateClass : createClass;

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
    resetForm();
    onClose();
  };

  const onSave: SubmitHandler<ClassroomForm> = async (data) => {
    const startDate = watch("startDate");
    const now = new Date();

    if (!validateFields()) {
      throw new FormValidationError("Please fill out all required fields");
    }

    if (
      dirtyFields.startDate &&
      startDate &&
      startDate < now &&
      !isSameDay(startDate, now)
    ) {
      throw new FormValidationError("Please set a present or future date");
    }

    const classObj = {
      ...data,
      startDate: data.startDate,
      teacher: authenticatedUser?.id,
    };

    await upsertClass({
      variables: {
        classroomId,
        classObj,
      },
    });
  };

  const handleSave = async () => {
    await handleSubmit(onSave)();
    if (!formState.isValid) {
      throw new FormValidationError("Please ensure all fields are valid");
    }
  };
  const isEditing = !!classroomId;

  return (
    <>
      <Modal
        cancelButtonText="Discard"
        header={isEditing ? "Edit Classroom" : "Add Classroom"}
        isOpen={isOpen}
        messageOnError={(error) => {
          if (error instanceof FormValidationError) {
            return error.message;
          }

          return isEditing
            ? "Failed to update the classroom. Please try again later."
            : "Failed to create the classroom. Please try again later.";
        }}
        messageOnSuccess={isEditing ? "Classroom updated." : "Classroom added."}
        onClose={onModalClose}
        onSubmit={handleSave}
        submitButtonText="Save"
        variant="large"
      >
        <HStack direction="row" mt={6}>
          <VStack align="left" direction="column" width="320px">
            <FormControl isInvalid={!!errors.className} isRequired>
              <FormLabel color="blue.300">Class Name</FormLabel>
              <Input
                placeholder="Type in Class Name"
                type="text"
                {...register("className", {
                  required: { value: true, message: "This field is required." },
                })}
              />
              <InlineFormError
                error={errors.className}
                // only affected by fields in the same HStack
                showPlaceholder={!!errors.startDate}
              />
            </FormControl>
          </VStack>
          <VStack align="left" direction="column" width="320px">
            <FormControl isInvalid={!!errors.startDate} isRequired>
              <FormLabel color="blue.300">Start Date</FormLabel>
              <DatePicker
                onChange={handleDateChange}
                value={watch("startDate")}
              />
              <InlineFormError
                error={errors.startDate}
                // only affected by fields in the same HStack
                showPlaceholder={!!errors.className}
              />
            </FormControl>
          </VStack>
        </HStack>
        <HStack direction="row" mt={6}>
          <VStack align="left" direction="column" width="320px">
            <FormControl isInvalid={!!errors.gradeLevel} isRequired>
              <FormLabel color="blue.300">Grade Level</FormLabel>
              <SelectFormInputClassroom
                field="gradeLevel"
                isSearchable={false}
                options={gradeOptions}
                placeholder="Choose a Grade Level"
                setValue={setValue}
                watch={watch}
              />
              <InlineFormError error={errors.gradeLevel} />
            </FormControl>
          </VStack>
        </HStack>
      </Modal>
    </>
  );
};

export default AddOrEditClassroomModal;
