import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import QuestionEditorContext from "../../../../../../contexts/QuestionEditorContext";
import type { MultiData } from "../../../../../../types/QuestionTypes";
import { QuestionElementType } from "../../../../../../types/QuestionTypes";

import MultiOptionModal from "./MultiOptionModal";

const AddMultiOptionModal = (): React.ReactElement => {
  const {
    showAddMultipleChoiceModal,
    setShowAddMultipleChoiceModal,
    showAddMultiSelectModal,
    setShowAddMultiSelectModal,
  } = useContext(QuestionEditorContext);
  const closeModal = () => {
    setShowAddMultipleChoiceModal(false);
    setShowAddMultiSelectModal(false);
  };

  const multiData = showAddMultiSelectModal
    ? QuestionElementType.MULTI_SELECT
    : QuestionElementType.MULTIPLE_CHOICE;

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const addMultipleChoiceElement = (data: MultiData) => {
    setQuestionElements((prevElements) => [
      ...prevElements,
      {
        id: uuidv4(),
        type: multiData,
        data,
      },
    ]);
  };

  return (
    <MultiOptionModal
      isOpen={showAddMultipleChoiceModal || showAddMultiSelectModal}
      onClose={closeModal}
      onConfirm={addMultipleChoiceElement}
      type={
        showAddMultipleChoiceModal
          ? QuestionElementType.MULTIPLE_CHOICE
          : QuestionElementType.MULTI_SELECT
      }
    />
  );
};

export default AddMultiOptionModal;
