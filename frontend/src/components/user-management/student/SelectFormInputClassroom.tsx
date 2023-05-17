import React from "react";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { GroupBase, SingleValue } from "chakra-react-select";
import { Select } from "chakra-react-select";

import type {
  ClassroomForm,
  ClassroomInput,
} from "../../../types/ClassroomTypes";
import type { StringOption } from "../../../types/SelectInputTypes";

interface SelectFormInputClassroomProps {
  setValue: UseFormSetValue<ClassroomForm>;
  watch: UseFormWatch<ClassroomForm>;
  field: ClassroomInput;
  options: StringOption[];
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
  const handleChange = (option: SingleValue<StringOption>) => {
    if (option) {
      setValue(field, option.value);
    }
  };
  return (
    <Select<StringOption, false, GroupBase<StringOption>>
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
