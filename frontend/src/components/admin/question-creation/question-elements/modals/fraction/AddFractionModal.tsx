import React, { useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import QuestionEditorContext from "../../../../../../contexts/QuestionEditorContext";
import type { FractionMetadata } from "../../../../../../types/QuestionMetadataTypes";
import type { FractionType } from "../../../../../../types/QuestionTypes";
import { QuestionElementType } from "../../../../../../types/QuestionTypes";

import ChooseFractionTypeModal from "./ChooseFractionTypeModal";
import FractionModal from "./FractionModal";

const AddFractionModal = (): React.ReactElement => {
  const [fractionType, setFractionType] = useState<FractionType>("regular");
  const {
    onOpen: onSecondModalOpen,
    isOpen: isSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

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
    <>
      <ChooseFractionTypeModal
        fractionType={fractionType}
        onSecondModalOpen={onSecondModalOpen}
        setFractionType={setFractionType}
      />
      <FractionModal
        fractionType={fractionType}
        isOpen={isSecondModalOpen}
        onClose={onSecondModalClose}
        onConfirm={addFractionElement}
      />
    </>
  );
};

export default AddFractionModal;
