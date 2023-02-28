import {
  GroupBase,
  OptionBase,
  Select,
  SingleValue,
} from "chakra-react-select";
import React from "react";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ClassroomInput, ClassroomForm } from "../../types/ClassroomTypes";

interface Option extends OptionBase {
  label: string;
  value: string;
}
interface SelectFormInputClassroomProps {
  setValue: UseFormSetValue<ClassroomForm>;
  watch: UseFormWatch<ClassroomForm>;
  field: ClassroomInput;
  options: Option[];
  placeholder: string;
  // resetError: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchable: boolean;
}

const SelectFormInputClassroom = ({
  setValue,
  watch,
  field,
  options,
  placeholder,
  // resetError,
  isSearchable,
}: SelectFormInputClassroomProps): React.ReactElement => {
  const handleChange = (option: SingleValue<Option>) => {
    if (option) {
      setValue(field, option.value);
      // resetError(false);
    }
  };
  return (
    <Select<Option, false, GroupBase<Option>>
      value={
        options.find((option) => option.value === watch(field)) || undefined
      }
      name={field}
      options={options}
      placeholder={placeholder}
      selectedOptionStyle="check"
      onChange={handleChange}
      chakraStyles={{
        dropdownIndicator: (provided) => ({
          ...provided,
          bg: "transparent",
          px: 2,
          cursor: "inherit",
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: "none",
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "grey.300",
        }),
      }}
      isSearchable={isSearchable}
      errorBorderColor="red.200"
    />
  );
};

export default SelectFormInputClassroom;
