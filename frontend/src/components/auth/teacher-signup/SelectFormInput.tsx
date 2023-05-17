import React from "react";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { GroupBase, SingleValue } from "chakra-react-select";
import { Select } from "chakra-react-select";

import type { StringOrBoolOption } from "../../../types/SelectInputTypes";
import type {
  TeacherInput,
  TeacherSignupForm,
} from "../../../types/TeacherSignupTypes";

interface SelectFormInputProps {
  setValue: UseFormSetValue<TeacherSignupForm>;
  watch: UseFormWatch<TeacherSignupForm>;
  field: TeacherInput;
  options: StringOrBoolOption[];
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
  const handleChange = (option: SingleValue<StringOrBoolOption>) => {
    if (option) {
      setValue(field, option.value);
      resetError(false);
    }
  };
  return (
    <Select<StringOrBoolOption, false, GroupBase<StringOrBoolOption>>
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
