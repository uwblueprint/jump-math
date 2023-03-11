import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import QuestionEditorContext from "../../../../../contexts/QuestionEditorContext";
import MultipleChoiceModal from "./MultipleChoiceModal";
import {
  QuestionElementType,
  MultipleChoiceData,
} from "../../../../../types/QuestionTypes";

const AddMultipleChoiceModal = (): React.ReactElement => {
  const { onClose } = useDisclosure();
  const {
    showAddMultipleChoiceModal,
    setShowAddMultipleChoiceModal,
  } = useContext(QuestionEditorContext);
  const closeModal = () => {
    setShowAddMultipleChoiceModal(false);
    onClose();
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const addMultipleChoiceElement = (data: MultipleChoiceData) => {
    setQuestionElements((prevElements) => [
      ...prevElements,
      {
        id: uuidv4(),
        type: QuestionElementType.MULTIPLE_CHOICE,
        data,
      },
    ]);
  };

  return (
    <MultipleChoiceModal
      isOpen={showAddMultipleChoiceModal}
      onClose={closeModal}
      onConfirm={addMultipleChoiceElement}
    />
  );
};

export default AddMultipleChoiceModal;
