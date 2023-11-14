import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import type { MultiOptionData } from "../../../../../../types/QuestionTypes";
import Select from "../../../../../common/form/Select";

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

  const handleSelectCount = (value: number | null) => {
    if (value == null) {
      setOptions([]);
      setOptionCount(0);
      return;
    }

    const countDiff = value - optionCount;
    if (countDiff > 0) {
      addOptions(countDiff);
    } else {
      removeOptions(countDiff);
    }
    setOptionCount(value);
  };

  return (
    <FormControl isInvalid={optionCountError} isRequired>
      <FormLabel color="grey.300" style={{ fontSize: "18px" }}>
        How many options would you like?
      </FormLabel>
      <Select
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            width: "50%",
          }),
        }}
        onChange={handleSelectCount}
        options={[...Array(4)].map((_, i) => ({
          label: String(i + 1),
          value: i + 1,
        }))}
        placeholder="Select Input"
        value={optionCount}
      />
    </FormControl>
  );
};

export default SelectOptionCount;
