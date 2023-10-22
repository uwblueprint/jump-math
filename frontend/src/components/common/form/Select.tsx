import type { ComponentPropsWithoutRef, ForwardedRef } from "react";
import React, { forwardRef as fwRef, type ReactElement } from "react";
import type { ChakraStylesConfig, SelectInstance } from "chakra-react-select";
import { Select as ChakraSelect } from "chakra-react-select";

import type { OptionBase } from "../../../types/SelectInputTypes";

declare module "react" {
  function forwardRef<T, P>(
    render: (props: P, ref: React.Ref<T>) => ReactNode | null,
  ): (props: P & React.RefAttributes<T>) => ReactNode | null;
}

interface SelectProps<Option extends OptionBase>
  extends Omit<
    ComponentPropsWithoutRef<typeof ChakraSelect<Option>>,
    "onChange" | "value"
  > {
  name?: string;
  options: Option[];
  placeholder?: string;
  isSearchable?: boolean;
  onChange?: (value: Option["value"] | null) => void;
  value?: Option["value"] | null;
}

const Select = fwRef(function Select<Option extends OptionBase>(
  {
    options,
    isSearchable = true,
    onChange,
    value,
    chakraStyles,
    ...props
  }: SelectProps<Option>,
  ref: ForwardedRef<SelectInstance<Option>>,
): ReactElement {
  const defaultStyles: ChakraStylesConfig<Option> = {
    placeholder: (provided) => ({
      ...provided,
      color: "placeholder.300",
    }),
  };

  return (
    <ChakraSelect<Option>
      {...props}
      ref={ref}
      chakraStyles={{
        ...defaultStyles,
        ...chakraStyles,
      }}
      errorBorderColor="red.200"
      isSearchable={isSearchable}
      onChange={(option) => onChange?.(option?.value ?? null)}
      options={options}
      selectedOptionStyle="check"
      useBasicStyles
      value={options.find((option) => option.value === value) || undefined}
    />
  );
});

export default Select;
