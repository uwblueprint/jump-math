import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

import QuestionEditorContext from "../../../../../contexts/QuestionEditorContext";
import {
  MultiData,
  QuestionElementType,
} from "../../../../../types/QuestionTypes";
import { updatedQuestionElement } from "../../../../../utils/QuestionUtils";

import MultiOptionModal from "./MultiOptionModal";

interface EditMultiOptionModalProps {
  id: string;
  data: MultiData;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: QuestionElementType;
}

const EditMultiOptionModal = ({
  id,
  data,
  isOpen,
  setOpen,
  type,
}: EditMultiOptionModalProps): React.ReactElement => {
  const { onClose } = useDisclosure();
  const closeModal = () => {
    setOpen(false);
    onClose();
  };

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
      onClose={closeModal}
      onConfirm={updateMultipleChoiceElement}
      type={type}
    />
  );
};

export default EditMultiOptionModal;
