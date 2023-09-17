import React, { type ReactElement, useContext } from "react";
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
import ControlledDatePicker from "../../../common/form/ControlledDatePicker";
import ControlledSelect from "../../../common/form/ControlledSelect";
import InlineFormError from "../../../common/form/InlineFormError";
import Modal from "../../../common/modal/Modal";
import useActionFormHandler from "../../../common/modal/useActionFormHandler";

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
    reset: resetForm,
    formState: { errors },
    register,
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

  const isEditing = !!classroomId;
  const upsertClass = isEditing ? updateClass : createClass;

  const onModalClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = useActionFormHandler((data) =>
    upsertClass({
      variables: {
        classroomId,
        classObj: {
          ...data,
          teacher: authenticatedUser?.id,
        },
      },
    }),
  );

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
                showPlaceholder={!!errors.startDate}
              />
            </FormControl>
          </VStack>
          <VStack align="left" direction="column" width="320px">
            <FormControl isInvalid={!!errors.startDate} isRequired>
              <FormLabel color="blue.300">Start Date</FormLabel>
              <ControlledDatePicker
                additionalRules={
                  isEditing
                    ? {}
                    : {
                        validate: (value: Date) => {
                          const now = new Date();
                          if (value && value < now && !isSameDay(value, now)) {
                            return "Please set a present or future date";
                          }
                          return true;
                        },
                      }
                }
                isDisabled={isEditing}
                isRequired
                name="startDate"
              />
              <InlineFormError
                error={errors.startDate}
                showPlaceholder={!!errors.className}
              />
            </FormControl>
          </VStack>
        </HStack>
        <HStack direction="row" mt={6}>
          <VStack align="left" direction="column" width="320px">
            <FormControl isInvalid={!!errors.gradeLevel} isRequired>
              <FormLabel color="blue.300">Grade Level</FormLabel>
              <ControlledSelect
                isRequired
                isSearchable={false}
                name="gradeLevel"
                options={gradeOptions}
                placeholder="Choose a Grade Level"
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
