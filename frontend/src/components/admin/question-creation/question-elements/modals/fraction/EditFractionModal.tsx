import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

import QuestionEditorContext from "../../../../../../contexts/QuestionEditorContext";
import type { FractionMetadata } from "../../../../../../types/QuestionMetadataTypes";
import { updatedQuestionElement } from "../../../../../../utils/QuestionUtils";

import FractionModal from "./FractionModal";

interface EditFractionModalProps {
  id: string;
  data: FractionMetadata;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditFractionModal = ({
  id,
  data,
  isOpen,
  setOpen,
}: EditFractionModalProps): React.ReactElement => {
  const { onClose } = useDisclosure();
  const closeModal = () => {
    setOpen(false);
    onClose();
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const updateFractionElement = (updatedAnswer: FractionMetadata) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedAnswer, prevElements);
    });
  };

  return (
    <FractionModal
      data={data}
      isOpen={isOpen}
      onClose={closeModal}
      onConfirm={updateFractionElement}
    />
  );
};

export default EditFractionModal;
