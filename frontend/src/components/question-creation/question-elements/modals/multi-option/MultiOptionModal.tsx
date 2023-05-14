import React, { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";

import {
  MultiData,
  MultiOptionData,
  QuestionElementType,
} from "../../../../../types/QuestionTypes";
import { exceedsMaxLength } from "../../../../../utils/QuestionUtils";
import Modal from "../../../../common/modal/Modal";
import FormError from "../../../../common/state/FormError";

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
  const [manyCorrectOptionsError, setManyCorrectOptionsError] = useState(false);
  const [emptyOptionError, setEmptyOptionError] = useState(false);

  useEffect(() => {
    setOptionCount(data ? data.options.length : 0);
    setOptions(data ? data.options : []);
  }, [data]);

  const resetErrors = () => {
    setOptionCountError(false);
    setNoCorrectOptionError(false);
    setManyCorrectOptionsError(false);
    setEmptyOptionError(false);
  };

  const handleClose = () => {
    setOptionCount(data ? data.options.length : 0);
    setOptions(data ? data.options : []);
    resetErrors();
    onClose();
  };

  const correctOptionCount = options.filter((option) => option.isCorrect)
    .length;
  const lengthError = options.some((option) => exceedsMaxLength(option.value));

  const handleConfirm = () => {
    resetErrors();
    if (optionCount === 0) {
      setOptionCountError(true);
    } else if (correctOptionCount === 0) {
      setNoCorrectOptionError(true);
    } else if (
      type === QuestionElementType.MULTIPLE_CHOICE &&
      correctOptionCount > 1
    ) {
      setManyCorrectOptionsError(true);
    } else if (!options.every((option) => option.value)) {
      setEmptyOptionError(true);
    } else if (!lengthError) {
      onConfirm({ options });
      handleClose();
    }
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
    >
      <VStack spacing="10" width="100%">
        {noCorrectOptionError && (
          <FormError message="Mark a correct answer before confirming" />
        )}
        {manyCorrectOptionsError && (
          <FormError message="Please mark only ONE correct answer before confirming" />
        )}
        {emptyOptionError && (
          <FormError message="Please ensure all fields are filled before confirming" />
        )}
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
