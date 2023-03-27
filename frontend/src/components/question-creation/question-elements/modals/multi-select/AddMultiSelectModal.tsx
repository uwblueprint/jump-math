import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import QuestionEditorContext from "../../../../../contexts/QuestionEditorContext";
import {
  MultiSelectData,
  QuestionElementType,
} from "../../../../../types/QuestionTypes";

import MultiSelectModal from "./MultiSelectModal";

const AddMultiSelectModal = (): React.ReactElement => {
  const { onClose } = useDisclosure();
  const { showAddMultiSelectModal, setShowAddMultiSelectModal } = useContext(
    QuestionEditorContext,
  );
  const closeModal = () => {
    setShowAddMultiSelectModal(false);
    onClose();
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const addMultiSelectElement = (data: MultiSelectData) => {
    setQuestionElements((prevElements) => [
      ...prevElements,
      {
        id: uuidv4(),
        type: QuestionElementType.MULTI_SELECT,
        data,
      },
    ]);
  };

  return (
    <MultiSelectModal
      isOpen={showAddMultiSelectModal}
      onClose={closeModal}
      onConfirm={addMultiSelectElement}
    />
  );
};

export default AddMultiSelectModal;
