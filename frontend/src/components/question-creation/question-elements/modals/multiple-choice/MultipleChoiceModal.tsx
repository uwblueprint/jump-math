import React, { useState } from "react";
import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import ResponseTypeModal from "../ResponseTypeModal";
import MultipleChoiceOption from "./MultipleChoiceOption";
import {
  MultipleChoiceOptionData,
  MultipleChoiceData,
} from "../../../../../types/QuestionTypes";

interface MultipleChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: MultipleChoiceData) => void;
}

const MultipleChoiceModal = ({
  isOpen,
  onClose,
  onConfirm,
}: MultipleChoiceModalProps): React.ReactElement => {
  const [optionCount, setOptionCount] = useState(0);
  const [options, setOptions] = useState<MultipleChoiceOptionData[]>([]);

  const addOption = (newOption: MultipleChoiceOptionData) => {
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const removeLastOption = () => {
    setOptions((prevOptions) => {
      prevOptions.pop();
      return prevOptions;
    });
  };

  const handleSelectCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(event.target.value, 10);
    if (count > optionCount) {
      const elementsToAdd = count - optionCount;
      [...Array(elementsToAdd)].forEach(() =>
        addOption({ id: uuidv4(), data: "", isCorrect: false }),
      );
    }
    if (count < optionCount) {
      const elementsToRemove = optionCount - count;
      [...Array(elementsToRemove)].forEach(() => removeLastOption());
    }
    setOptionCount(count);
  };

  const handleClose = () => {
    setOptionCount(0);
    onClose();
  };

  const handleConfirm = () => {
    onConfirm({ optionCount, options });
    handleClose();
  };

  return (
    <ResponseTypeModal
      isOpen={isOpen}
      onClose={handleClose}
      handleConfirm={handleConfirm}
      title="Create multiple choice question"
    >
      <VStack width="100%" spacing="10">
        <FormControl isRequired>
          <FormLabel color="grey.300" style={{ fontSize: "18px" }}>
            How many options would you like?
          </FormLabel>
          <Select
            value={optionCount}
            onChange={(e) => handleSelectCount(e)}
            width="50%"
          >
            <option selected disabled value={0}>
              Select Input
            </option>
            {[...Array(4)].map((i, count) => (
              <option key={i} value={count + 1}>
                {count + 1}
              </option>
            ))}
          </Select>
        </FormControl>
        <VStack width="100%" spacing="6">
          {options.map((option) => (
            <MultipleChoiceOption
              key={option.id}
              data={option}
              setOptions={setOptions}
              setOptionCount={setOptionCount}
            />
          ))}
        </VStack>
      </VStack>
    </ResponseTypeModal>
  );
};

export default MultipleChoiceModal;
