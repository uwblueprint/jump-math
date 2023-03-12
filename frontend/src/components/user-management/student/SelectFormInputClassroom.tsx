import React from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import {
  GroupBase,
  OptionBase,
  Select,
  SingleValue,
} from "chakra-react-select";

import { ClassroomForm, ClassroomInput } from "../../../types/ClassroomTypes";

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
  isSearchable: boolean;
}

const SelectFormInputClassroom = ({
  setValue,
  watch,
  field,
  options,
  placeholder,
  isSearchable,
}: SelectFormInputClassroomProps): React.ReactElement => {
  const handleChange = (option: SingleValue<Option>) => {
    if (option) {
      setValue(field, option.value);
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

export default SelectFormInputClassroom;