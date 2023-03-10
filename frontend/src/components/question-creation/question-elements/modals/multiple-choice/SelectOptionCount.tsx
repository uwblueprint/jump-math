import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { MultipleChoiceOptionData } from "../../../../../types/QuestionTypes";

interface SelectOptionCountProps {
  optionCount: number;
  optionCountError: boolean;
  setOptionCount: React.Dispatch<React.SetStateAction<number>>;
  setOptions: React.Dispatch<React.SetStateAction<MultipleChoiceOptionData[]>>;
}

const SelectOptionCount = ({
  optionCount,
  optionCountError,
  setOptionCount,
  setOptions,
}: SelectOptionCountProps): React.ReactElement => {
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

  return (
    <FormControl isRequired isInvalid={optionCountError}>
      <FormLabel color="grey.300" style={{ fontSize: "18px" }}>
        How many options would you like?
      </FormLabel>
      <Select
        value={optionCount}
        onChange={(e) => handleSelectCount(e)}
        width="50%"
      >
        <option disabled value={0}>
          Select Input
        </option>
        {[...Array(4)].map((i, count) => (
          <option key={i} value={count + 1}>
            {count + 1}
          </option>
        ))}
      </Select>
      <FormErrorMessage>Select a value before confirming.</FormErrorMessage>
    </FormControl>
  );
};

export default SelectOptionCount;
