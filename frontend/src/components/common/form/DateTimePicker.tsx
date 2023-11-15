import type { ReactElement } from "react";
import React, { useRef, useState } from "react";
import { HStack } from "@chakra-ui/react";

import { combineDateAndTime } from "../../../utils/DateUtils";

import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

type DateTimePickerProps = {
  name?: string;
  onChange: (date: Date | null) => void;
  value: Date | null | undefined;
  isDisabled?: boolean;
};

const DateTimePicker = ({
  isDisabled,
  onChange,
  value,
  name,
}: DateTimePickerProps): ReactElement => {
  const timePickerRef = useRef<HTMLDivElement>(null);

  const [internalDateValue, setInternalDateValue] = useState<Date | null>(null);
  const [internalTimeValue, setInternalTimeValue] = useState<Date | null>(null);
  const dateValue = value ?? internalDateValue;
  const timeValue = value ?? internalTimeValue;

  const handleDateChange = (newDate: Date | null) => {
    setInternalDateValue(newDate);
    if (timeValue && newDate) {
      onChange(combineDateAndTime(newDate, timeValue));
    }

    // For some reason, the time picker doesn't focus properly if we try to
    // focus it while the date picker is open. This is a workaround to make
    // sure the focus happens after the date picker has started to close.
    setTimeout(() => {
      timePickerRef.current?.click();
    });
  };

  const handleTimeChange = (newTime: Date | null) => {
    setInternalTimeValue(newTime);
    if (dateValue && newTime) {
      onChange(combineDateAndTime(dateValue, newTime));
    }
  };

  return (
    <HStack gap={4}>
      <DatePicker
        isDisabled={isDisabled}
        name={name}
        onChange={handleDateChange}
        value={dateValue ?? undefined}
      />
      <TimePicker
        ref={timePickerRef}
        isDisabled={isDisabled}
        name={name}
        onChange={handleTimeChange}
        value={timeValue ?? undefined}
      />
    </HStack>
  );
};

export default DateTimePicker;
