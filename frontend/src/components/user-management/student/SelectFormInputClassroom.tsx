import React from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { GroupBase, Select, SingleValue } from "chakra-react-select";

import { Grade } from "../../../APIClients/types/UserClientTypes";
import { ClassroomForm, ClassroomInput } from "../../../types/ClassroomTypes";
import { StringOption } from "../../../types/SelectInputTypes";

interface SelectFormInputClassroomProps {
  setValue: UseFormSetValue<ClassroomForm>;
  watch: UseFormWatch<ClassroomForm>;
  field: ClassroomInput;
  options: StringOption[];
  placeholder: string;
  isSearchable: boolean;
  setGradeLevel: React.Dispatch<React.SetStateAction<Grade>>;
}

const SelectFormInputClassroom = ({
  setValue,
  watch,
  field,
  options,
  placeholder,
  isSearchable,
  setGradeLevel,
}: SelectFormInputClassroomProps): React.ReactElement => {
  const handleChange = (option: SingleValue<StringOption>) => {
    if (option) {
      setValue(field, option.value);
      setGradeLevel(option.value as Grade);
      console.log(`${field}: ${option.value}`);
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
