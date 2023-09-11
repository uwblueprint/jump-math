import React, { type ReactElement } from "react";
import { Controller } from "react-hook-form";
import { Select } from "chakra-react-select";

import type { StringOption } from "../../../../types/SelectInputTypes";

interface SelectFormInputClassroomProps {
  name: string;
  options: StringOption[];
  placeholder: string;
  isSearchable: boolean;
  isRequired: boolean;
}

const SelectFormInputClassroom = ({
  name: fieldName,
  options,
  placeholder,
  isSearchable,
  isRequired,
}: SelectFormInputClassroomProps): ReactElement => (
  <Controller
    name={fieldName}
    render={({ field: { name, ref, onChange, onBlur, value } }) => (
      <Select
        ref={ref}
        errorBorderColor="red.200"
        isSearchable={isSearchable}
        name={name}
        onBlur={onBlur}
        onChange={(option) => onChange(option?.value ?? null)}
        options={options}
        placeholder={placeholder}
        selectedOptionStyle="check"
        useBasicStyles
        value={options.find((option) => option.value === value) || undefined}
      />
    )}
    rules={{
      required: { value: isRequired, message: "This field is required." },
    }}
  />
);

export default SelectFormInputClassroom;
