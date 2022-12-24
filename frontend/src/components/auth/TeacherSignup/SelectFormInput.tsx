import {
  GroupBase,
  OptionBase,
  Select,
  SingleValue,
} from "chakra-react-select";
import React from "react";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { TeacherSignupForm } from "./types";

type TeacherInput =
  | "firstName"
  | "lastName"
  | "email"
  | "grades"
  | "currentlyTeachingJM"
  | "school"
  | "password"
  | `grades.${number}`
  | "school.name"
  | "school.id"
  | "school.country"
  | "school.city"
  | "school.district"
  | "school.address";

interface Option extends OptionBase {
  label: string;
  value: string;
}
interface SelectFormInputProps {
  setValue: UseFormSetValue<TeacherSignupForm>;
  watch: UseFormWatch<TeacherSignupForm>;
  name: TeacherInput;
  options: Option[];
  placeholder: string;
  resetError: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchable: boolean;
  hiddenField?: TeacherInput;
}

const SelectFormInput = ({
  setValue,
  watch,
  name,
  options,
  placeholder,
  resetError,
  isSearchable,
  hiddenField,
}: SelectFormInputProps): React.ReactElement => {
  const selectedValue = options.find((option) => option.label === watch(name));
  const handleChange = (option: SingleValue<Option>) => {
    if (option) {
      setValue(name, option.label);
      resetError(false);

      if (hiddenField) setValue(hiddenField, option.value);
    }
  };
  return (
    <Select<Option, false, GroupBase<Option>>
      value={selectedValue || undefined}
      name={name}
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
        container: (provided) => ({
          ...provided,
          marginBottom: "1em",
        }),
      }}
      isSearchable={isSearchable}
      errorBorderColor="red.200"
    />
  );
};

export default SelectFormInput;
