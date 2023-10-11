import React, { type ReactElement } from "react";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";

import type { StringOrBoolOption } from "../../../types/SelectInputTypes";
import type {
  TeacherInput,
  TeacherSignupForm,
} from "../../../types/TeacherSignupTypes";
import Select from "../../common/form/Select";

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
}: SelectFormInputProps): ReactElement => {
  const handleChange = (option: StringOrBoolOption["value"] | null) => {
    if (option) {
      setValue(field, option);
      resetError(false);
    }
  };
  return (
    <Select
      isSearchable={isSearchable}
      name={field}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      /*value={
        options.find((option) => option.value === watch(field)) || undefined
      }*/
    />
  );
};

export default SelectFormInput;
