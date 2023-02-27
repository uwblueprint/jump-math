import {
  GroupBase,
  OptionBase,
  Select,
  SingleValue,
} from "chakra-react-select";
import React from "react";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ClassroomForm, ClassroomInput } from "../../types/ClassroomTypes";
import {
  TeacherInput,
  TeacherSignupForm,
} from "../../types/TeacherSignupTypes";

interface Option extends OptionBase {
  label: string;
  value: string | boolean;
}

interface SelectFormProps<T> {
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  field: ClassroomInput;
  options: Option[];
  placeholder: string;
  resetError?: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchable: boolean;
}

const SelectFormInput = <T,>({
  setValue,
  watch,
  field,
  options,
  placeholder,
  resetError,
  isSearchable,
}: SelectFormProps<T>): React.ReactElement => {
  const handleChange = (option: SingleValue<Option>) => {
    if (option) {
      setValue(field, option.value);
      resetError(false);
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
      useBasicStyles
      isSearchable={isSearchable}
      errorBorderColor="red.200"
    />
  );
};

export default SelectFormInput;
