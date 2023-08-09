import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import QuestionEditorContext from "../../../../../../contexts/QuestionEditorContext";
import type { FractionMetadata } from "../../../../../../types/QuestionMetadataTypes";
import { QuestionElementType } from "../../../../../../types/QuestionTypes";

import FractionModal from "./FractionModal";

const AddFractionModal = (): React.ReactElement => {
  const { showAddFractionModal, setShowAddFractionModal } = useContext(
    QuestionEditorContext,
  );
  const closeModal = () => {
    setShowAddFractionModal(false);
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const addFractionElement = (data: FractionMetadata) => {
    setQuestionElements((prevElements) => [
      ...prevElements,
      {
        id: uuidv4(),
        type: QuestionElementType.FRACTION,
        data,
      },
    ]);
  };

  return (
    <FractionModal
      isOpen={showAddFractionModal}
      onClose={closeModal}
      onConfirm={addFractionElement}
    />
  );
};

export default AddFractionModal;
