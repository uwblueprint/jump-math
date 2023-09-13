import type { ReactElement } from "react";
import React from "react";
import { Controller } from "react-hook-form";

import DatePicker from "../../../common/DatePicker";

type ControlledDatePickerProps = {
  name?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  additionalRules?: Record<string, unknown>;
};

const ControlledDatePicker = ({
  name: fieldName,
  isDisabled,
  isRequired,
  additionalRules,
}: ControlledDatePickerProps): ReactElement => {
  return (
    <Controller
      name={fieldName || "date-input"}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <DatePicker
          isDisabled={isDisabled}
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
        ...(additionalRules ?? {}),
      }}
    ></Controller>
  );
};

export default ControlledDatePicker;
