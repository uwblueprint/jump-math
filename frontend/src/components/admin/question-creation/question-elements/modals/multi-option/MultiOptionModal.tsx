import React, { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";

import type {
  MultiData,
  MultiOptionData,
} from "../../../../../../types/QuestionTypes";
import { QuestionElementType } from "../../../../../../types/QuestionTypes";
import { FormValidationError } from "../../../../../../utils/GeneralUtils";
import { exceedsMaxLength } from "../../../../../../utils/QuestionUtils";
import Modal from "../../../../../common/modal/Modal";

import MultipleChoiceOption from "./MultiOption";
import SelectOptionCount from "./SelectOptionCount";

interface MultiOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: MultiData) => void;
  type: QuestionElementType;
  data?: MultiData;
}

const MultiOptionModal = ({
  isOpen,
  onClose,
  onConfirm,
  data,
  type,
}: MultiOptionModalProps): React.ReactElement => {
  const [optionCount, setOptionCount] = useState(0);
  const [options, setOptions] = useState<MultiOptionData[]>([]);
  const [optionCountError, setOptionCountError] = useState(false);
  const [noCorrectOptionError, setNoCorrectOptionError] = useState(false);
  const [emptyOptionError, setEmptyOptionError] = useState(false);

  useEffect(() => {
    setOptionCount(data ? data.options.length : 0);
    setOptions(data ? data.options : []);
  }, [data]);

  const resetErrors = () => {
    setOptionCountError(false);
    setNoCorrectOptionError(false);
    setEmptyOptionError(false);
  };

  const handleClose = () => {
    setOptionCount(data ? data.options.length : 0);
    setOptions(data ? data.options : []);
    resetErrors();
    onClose();
  };

  const correctOptionCount = options.filter(
    (option) => option.isCorrect,
  ).length;
  const lengthError = options.some((option) => exceedsMaxLength(option.value));

  const handleConfirm = () => {
    resetErrors();
    if (optionCount === 0) {
      setOptionCountError(true);
      throw new FormValidationError("Please add an option");
    } else if (!options.every((option) => option.value)) {
      setEmptyOptionError(true);
      throw new FormValidationError("Please ensure all fields are filled");
    } else if (correctOptionCount === 0) {
      setNoCorrectOptionError(true);
      throw new FormValidationError("Please mark a correct answer");
    } else if (
      type === QuestionElementType.MULTIPLE_CHOICE &&
      correctOptionCount > 1
    ) {
      throw new FormValidationError("Please mark only ONE correct answer");
    } else if (lengthError) {
      throw new FormValidationError("One or more fields are too long");
    }

    onConfirm({ options });
  };

  return (
    <Modal
      header={
        type === QuestionElementType.MULTIPLE_CHOICE
          ? "Create multiple choice question"
          : "Create multi-select question"
      }
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleConfirm}
      showDefaultToasts={false}
    >
      <VStack spacing="10" width="100%">
        <SelectOptionCount
          optionCount={optionCount}
          optionCountError={optionCountError}
          setOptionCount={setOptionCount}
          setOptions={setOptions}
        />
        <VStack spacing="6" width="100%">
          {options.map((option) => (
            <MultipleChoiceOption
              key={option.id}
              data={option}
              isCorrectError={noCorrectOptionError}
              isEmptyError={emptyOptionError}
              setOptionCount={setOptionCount}
              setOptions={setOptions}
            />
          ))}
        </VStack>
      </VStack>
    </Modal>
  );
};

export default MultiOptionModal;
