import React, { useContext } from "react";

import QuestionEditorContext from "../../../../../../contexts/QuestionEditorContext";
import type { FractionMetadata } from "../../../../../../types/QuestionMetadataTypes";
import { updatedQuestionElement } from "../../../../../../utils/QuestionUtils";

import FractionModal from "./FractionModal";

interface EditFractionModalProps {
  id: string;
  data: FractionMetadata;
  isOpen: boolean;
  onClose: () => void;
}

const EditFractionModal = ({
  id,
  data,
  isOpen,
  onClose,
}: EditFractionModalProps): React.ReactElement => {
  const { setQuestionElements } = useContext(QuestionEditorContext);
  const updateFractionElement = (updatedAnswer: FractionMetadata) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedAnswer, prevElements);
    });
  };

  return (
    <FractionModal
      data={data}
      fractionType={data.wholeNumber ? "mixed" : "regular"}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={updateFractionElement}
    />
  );
};

export default EditFractionModal;
