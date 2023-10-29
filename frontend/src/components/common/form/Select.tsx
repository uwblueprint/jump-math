import type { ComponentPropsWithoutRef, ForwardedRef } from "react";
import React, { forwardRef as fwRef, type ReactElement } from "react";
import type { ChakraStylesConfig, SelectInstance } from "chakra-react-select";
import { Select as ChakraSelect } from "chakra-react-select";

import type { OptionBase } from "../../../types/SelectInputTypes";

// React doesn't include a generic type for forwardRef, so we have to add it ourselves.
declare module "react" {
  function forwardRef<T, P>(
    render: (props: P, ref: React.Ref<T>) => ReactNode | null,
  ): (props: P & React.RefAttributes<T>) => ReactNode | null;
}

type OptionType<Option> = Option[] | Option | null;
type OnChangeValue<
  Option extends OptionBase,
  IsMulti extends boolean,
> = IsMulti extends true ? Option["value"][] : Option["value"] | null;

interface SelectProps<Option extends OptionBase, IsMulti extends boolean>
  extends Omit<
    ComponentPropsWithoutRef<typeof ChakraSelect<Option, IsMulti>>,
    "onChange" | "value"
  > {
  name?: string;
  options: Option[];
  placeholder?: string;
  isSearchable?: boolean;
  onChange?: (value: OnChangeValue<Option, IsMulti>) => void;
  value?: Option["value"] | null;
}

const Select = fwRef(function Select<
  Option extends OptionBase,
  IsMulti extends boolean = false,
>(
  {
    options,
    isSearchable = true,
    useBasicStyles = true,
    onChange,
    value,
    chakraStyles,
    ...props
  }: SelectProps<Option, IsMulti>,
  ref: ForwardedRef<SelectInstance<Option, IsMulti>>,
): ReactElement {
  const defaultStyles: ChakraStylesConfig<Option> = {
    placeholder: (provided) => ({
      ...provided,
      color: "placeholder.300",
    }),
  };

  return (
    <ChakraSelect<Option, IsMulti>
      {...props}
      ref={ref}
      chakraStyles={{
        ...defaultStyles,
        ...chakraStyles,
      }}
      errorBorderColor="red.200"
      isSearchable={isSearchable}
      onChange={(newValue) => {
        const choices = newValue as OptionType<Option>;
        return onChange?.(
          (Array.isArray(choices)
            ? choices.map((choice) => choice.value ?? null)
            : choices?.value ?? null) as OnChangeValue<Option, IsMulti>,
        );
      }}
      options={options}
      selectedOptionStyle="check"
      useBasicStyles={useBasicStyles}
      value={options.find((option) => option.value === value) || undefined}
    />
  );
});

export default Select;
