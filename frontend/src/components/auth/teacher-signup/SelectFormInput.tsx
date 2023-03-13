import React from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { GroupBase, Select, SingleValue } from "chakra-react-select";

import { Option } from "../../../types/SelectInputTypes";
import {
  TeacherInput,
  TeacherSignupForm,
} from "../../../types/TeacherSignupTypes";

interface SelectFormInputProps {
  setValue: UseFormSetValue<TeacherSignupForm>;
  watch: UseFormWatch<TeacherSignupForm>;
  field: TeacherInput;
  options: Option[];
  placeholder: string;
  resetError: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchable: boolean;
}

const SelectFormInput = ({
  setValue,
  watch,
  field,
  options,
  placeholder,
  resetError,
  isSearchable,
}: SelectFormInputProps): React.ReactElement => {
  const handleChange = (option: SingleValue<Option>) => {
    if (option) {
      setValue(field, option.value);
      resetError(false);
    }
  };
  return (
    <Select<Option, false, GroupBase<Option>>
      errorBorderColor="red.200"
      isSearchable={isSearchable}
      name={field}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      selectedOptionStyle="check"
      useBasicStyles
      value={
        options.find((option) => option.value === watch(field)) || undefined
      }
    />
  );
};

export default SelectFormInput;
