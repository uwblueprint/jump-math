import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import QuestionEditorContext from "../../../../../contexts/QuestionEditorContext";
import {
  MultipleChoiceData,
  QuestionElementType,
} from "../../../../../types/QuestionTypes";

import MultipleChoiceModal from "./MultipleChoiceModal";

const AddMultipleChoiceModal = (): React.ReactElement => {
  const { onClose } = useDisclosure();
  const {
    showAddMultipleChoiceModal,
    setShowAddMultipleChoiceModal,
    isMultiSelect,
  } = useContext(QuestionEditorContext);
  const closeModal = () => {
    setShowAddMultipleChoiceModal(false);
    onClose();
  };

  const multiData = isMultiSelect
    ? { type: QuestionElementType.MULTI_SELECT }
    : { type: QuestionElementType.MULTIPLE_CHOICE };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const addMultipleChoiceElement = (data: MultipleChoiceData) => {
    setQuestionElements((prevElements) => [
      ...prevElements,
      {
        id: uuidv4(),
        ...multiData,
        data,
      },
    ]);
  };

  return (
    <MultipleChoiceModal
      isMultiSelect={isMultiSelect}
      isOpen={showAddMultipleChoiceModal}
      onClose={closeModal}
      onConfirm={addMultipleChoiceElement}
    />
  );
};

export default AddMultipleChoiceModal;
