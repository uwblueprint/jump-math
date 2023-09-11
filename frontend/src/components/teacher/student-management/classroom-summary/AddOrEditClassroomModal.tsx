import React, { useContext } from "react";
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
import type {
  ClassroomForm,
  ClassroomInput,
} from "../../../../types/ClassroomTypes";
import { gradeOptions } from "../../../../utils/AssessmentUtils";
import {
  FormValidationError,
  getQueryName,
} from "../../../../utils/GeneralUtils";
import DatePicker from "../../../common/DatePicker";
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
}: AddOrEditClassroomModalProps): React.ReactElement => {
  const {
    handleSubmit,
    watch,
    setValue,
    reset: resetForm,
    formState: { dirtyFields, errors },
  } = useFormContext<ClassroomForm>();
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

  const handleSave = handleSubmit(onSave);
  const isEditing = !!classroomId;

  return (
    <>
      <Modal
        cancelButtonText="Discard"
        header={isEditing ? "Edit Classroom" : "Add Classroom"}
        isOpen={isOpen}
        messageOnError={
          isEditing
            ? "Failed to update the classroom. Please try again later."
            : "Failed to create the classroom. Please try again later."
        }
        messageOnSuccess={isEditing ? "Classroom updated." : "Classroom added."}
        onClose={onModalClose}
        onSubmit={handleSave}
        submitButtonText="Save"
        variant="large"
      >
        <FormControl isRequired>
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
      </Modal>
    </>
  );
};

export default AddOrEditClassroomModal;
