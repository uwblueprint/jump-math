import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import { MultiOptionData } from "../../../../../types/QuestionTypes";

interface SelectOptionCountProps {
  optionCount: number;
  optionCountError: boolean;
  setOptionCount: React.Dispatch<React.SetStateAction<number>>;
  setOptions: React.Dispatch<React.SetStateAction<MultiOptionData[]>>;
}

const SelectOptionCount = ({
  optionCount,
  optionCountError,
  setOptionCount,
  setOptions,
}: SelectOptionCountProps): React.ReactElement => {
  const addOptions = (n: number) => {
    const newOptions: MultiOptionData[] = [];
    [...Array(n)].forEach(() =>
      newOptions.push({ id: uuidv4(), value: "", isCorrect: false }),
    );
    setOptions((prevOptions) => [...prevOptions, ...newOptions]);
  };

  const removeOptions = (n: number) => {
    setOptions((prevOptions) => prevOptions.slice(0, n));
  };

  const handleSelectCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(event.target.value, 10);
    const countDiff = count - optionCount;
    if (countDiff > 0) {
      addOptions(countDiff);
    } else {
      removeOptions(countDiff);
    }
    setOptionCount(count);
  };

  return (
    <FormControl isInvalid={optionCountError} isRequired>
      <FormLabel color="grey.300" style={{ fontSize: "18px" }}>
        How many options would you like?
      </FormLabel>
      <Select
        onChange={(e) => handleSelectCount(e)}
        value={optionCount}
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
