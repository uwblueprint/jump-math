import type { ForwardedRef, ReactElement } from "react";
import React, { forwardRef, useRef } from "react";
import { Box, Input, useMergeRefs } from "@chakra-ui/react";
import type { ChakraStylesConfig, SelectInstance } from "chakra-react-select";

import type { StringOption } from "../../../types/SelectInputTypes";

import Select from "./Select";

const MINUTE_OPTIONS: StringOption[] = [...Array(60).fill(null)].map(
  (_, num) => ({
    label: num.toString().padStart(2, "0"),
    value: num.toString(),
  }),
);

const HOUR_OPTIONS: StringOption[] = [...Array(24).fill(null)].map(
  (_, num) => ({
    label: num.toString().padStart(2, "0"),
    value: num.toString(),
  }),
);

const chakraStyles = (
  align: "left" | "right",
): ChakraStylesConfig<StringOption> => ({
  control: (provided) => ({
    ...provided,
    background: "unset",
    _hover: {
      background: "unset",
    },
    _focusVisible: {
      outline: "none",
    },
    border: "none",
  }),
  valueContainer: (provided) => ({
    ...provided,
    p: 0,
    justifyContent: align === "left" ? "flex-start" : "flex-end",
    _focusWithin: {
      color: "rgba(255, 255, 255, 0.7)",
    },
    minW: "calc(2em)",
  }),
  inputContainer: (provided) => ({
    ...provided,
    p: "0.125rem",
    m: 0,
    borderRadius: 3,
    _focusWithin: {
      bg: "blue.500",
    },
    justifyContent: align === "left" ? "flex-start" : "flex-end",
  }),
  input: (provided) => ({
    ...provided,
    caretColor: "white",
    color: "white",
    textAlign: align,
    cursor: "inherit",
  }),
  placeholder: (provided) => ({
    ...provided,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: "none",
  }),
  downChevron: (provided) => ({
    ...provided,
    display: "none",
  }),
  container: (provided) => ({
    ...provided,
    flex: 1,
  }),
  menu: (provided) => ({
    ...provided,
    w: 105,
  }),
});

type TimePickerProps = {
  name?: string;
  value: Date | null | undefined;
  defaultDay?: Date;
  onChange: (date: Date) => void;
  isDisabled?: boolean;
};

const TimePicker = forwardRef(function TimePicker(
  { name, value, defaultDay, onChange, isDisabled }: TimePickerProps,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mergedWrapperRef = useMergeRefs(wrapperRef, ref);
  const hourInputRef = useRef<SelectInstance<StringOption>>(null);
  const minuteInputRef = useRef<SelectInstance<StringOption>>(null);
  const elementRef = useRef<HTMLButtonElement>(null);
  const valueHours = value instanceof Date ? value.getHours() : null;
  const valueMinutes = value instanceof Date ? value.getMinutes() : null;

  return (
    <Box>
      <Input
        ref={mergedWrapperRef}
        _focusWithin={{
          bg: "transparent",
          borderColor: "blue.500",
        }}
        _invalid={{
          borderColor: "red.200",
        }}
        as="div"
        cursor="pointer"
        isDisabled={isDisabled}
        onClick={(e) => {
          if (e.target === wrapperRef.current) {
            hourInputRef.current?.focus();
          }
        }}
        role="group"
      >
        <Box
          _focusWithin={{
            cursor: "text",
          }}
          alignItems="center"
          display="inline-flex"
          flexDir="row"
          w="100%"
        >
          <Select<StringOption>
            ref={hourInputRef}
            chakraStyles={chakraStyles("right")}
            isDisabled={isDisabled}
            name={`${name}-hour`}
            onChange={(option) => {
              const hours = parseInt(option ?? "0", 10);
              if (hours == valueHours) {
                return;
              }

              const newValue = new Date(value ?? defaultDay ?? new Date());
              newValue.setHours(hours);
              newValue.setMinutes(valueMinutes ?? 0);
              newValue.setSeconds(0);
              newValue.setMilliseconds(0);
              onChange(newValue);
              minuteInputRef.current?.focus();
            }}
            onFocus={() => {
              setTimeout(() => {
                // For use with a date picker, our date picker will focus itself
                // when it starts to close. This means that we might need to re-
                // focus the hour input afterwards.
                hourInputRef.current?.focus();
                hourInputRef.current?.openMenu("first");
              });
            }}
            options={HOUR_OPTIONS}
            placeholder="00"
            value={valueHours?.toString()}
          />
          <Box cursor="inherit" userSelect="none">
            :
          </Box>
          <Select<StringOption>
            ref={minuteInputRef}
            chakraStyles={chakraStyles("left")}
            isDisabled={isDisabled}
            name={`${name}-minute`}
            onChange={(option) => {
              const minutes = parseInt(option ?? "0", 10);
              if (minutes == valueMinutes) {
                return;
              }

              const newValue = new Date(value ?? defaultDay ?? new Date());
              newValue.setHours(valueHours ?? 0);
              newValue.setMinutes(minutes);
              newValue.setSeconds(0);
              newValue.setMilliseconds(0);
              onChange(newValue);
              elementRef.current?.focus();
            }}
            onFocus={() => {
              minuteInputRef.current?.openMenu("first");
            }}
            options={MINUTE_OPTIONS}
            placeholder="00"
            value={valueMinutes?.toString()}
          />
          <button
            ref={elementRef}
            aria-label="Open time input"
            onClick={() => {
              hourInputRef.current?.focus();
            }}
            tabIndex={-1}
          />
        </Box>
      </Input>
    </Box>
  );
});

export default TimePicker;
