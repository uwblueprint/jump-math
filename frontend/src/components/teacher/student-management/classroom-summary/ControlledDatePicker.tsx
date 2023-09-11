import type { ReactElement } from "react";
import React from "react";
import { Controller } from "react-hook-form";

import DatePicker from "../../../common/DatePicker";

type ControlledDatePickerProps = {
  name?: string;
  isRequired?: boolean;
};

const ControlledDatePicker = ({
  name: fieldName,
  isRequired,
}: ControlledDatePickerProps): ReactElement => {
  return (
    <Controller
      name={fieldName || "date-input"}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <DatePicker
          name={name}
          onChange={(date) => {
            onChange(date);

            // We have to manually invoke onBlur here since the DatePicker
            // component doesn't let us pass in a ref to the input element.
            onBlur();
          }}
          value={value}
        />
      )}
      rules={{
        required: {
          value: isRequired ?? false,
          message: "This field is required.",
        },
      }}
    ></Controller>
  );
};

export default ControlledDatePicker;
