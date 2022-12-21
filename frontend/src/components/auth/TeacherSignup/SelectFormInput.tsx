import {
  GroupBase,
  OptionBase,
  Select,
  SingleValue,
} from "chakra-react-select";
import React from "react";

import { UseFormSetValue } from "react-hook-form";
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
  name: TeacherInput;
  options: Option[];
  placeholder: string;
  resetError: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchable: boolean;
}

const SelectFormInput = ({
  setValue,
  name,
  options,
  placeholder,
  resetError,
  isSearchable,
}: SelectFormInputProps): React.ReactElement => {
  const handleChange = (option: SingleValue<Option>) => {
    if (option) {
      setValue(name, option.value);
      resetError(false);
    }
  };
  return (
    <Select<Option, false, GroupBase<Option>>
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
