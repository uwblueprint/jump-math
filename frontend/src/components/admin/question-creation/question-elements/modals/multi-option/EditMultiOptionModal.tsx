import React, { useContext } from "react";

import QuestionEditorContext from "../../../../../../contexts/QuestionEditorContext";
import type {
  MultiData,
  QuestionElementType,
} from "../../../../../../types/QuestionTypes";
import { updatedQuestionElement } from "../../../../../../utils/QuestionUtils";

import MultiOptionModal from "./MultiOptionModal";

interface EditMultiOptionModalProps {
  id: string;
  data: MultiData;
  isOpen: boolean;
  onClose: () => void;
  type: QuestionElementType;
}

const EditMultiOptionModal = ({
  id,
  data,
  isOpen,
  onClose,
  type,
}: EditMultiOptionModalProps): React.ReactElement => {
  const { setQuestionElements } = useContext(QuestionEditorContext);
  const updateMultipleChoiceElement = (updatedMultipleChoice: MultiData) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedMultipleChoice, prevElements);
    });
  };

  return (
    <MultiOptionModal
      data={data}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={updateMultipleChoiceElement}
      type={type}
    />
  );
};

export default EditMultiOptionModal;
