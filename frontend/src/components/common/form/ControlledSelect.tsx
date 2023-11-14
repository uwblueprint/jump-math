import React, { type ReactElement } from "react";
import { Controller } from "react-hook-form";

import type { OptionBase, StringOption } from "../../../types/SelectInputTypes";

import Select from "./Select";

interface ControlledSelectProps<Option extends OptionBase = StringOption> {
  name: string;
  options: Option[];
  placeholder: string;
  isSearchable?: boolean;
  isRequired: boolean | string;
}

const ControlledSelect = <Option extends OptionBase>({
  name: fieldName,
  isRequired,
  ...props
}: ControlledSelectProps<Option>): ReactElement => (
  <Controller
    name={fieldName}
    render={({ field: { name, ref, onChange, onBlur, value } }) => (
      <Select<Option>
        {...props}
        ref={ref}
        errorBorderColor="red.200"
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      />
    )}
    rules={{
      validate: (value) => {
        if (isRequired && (value == null || value === "")) {
          return typeof isRequired === "string"
            ? isRequired
            : "This field is required.";
        }
        return true;
      },
    }}
  />
);

export default ControlledSelect;
