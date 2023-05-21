import React, { useState } from "react";
import FocusLock from "react-focus-lock";
import {
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";

import { CalendarPanel } from "./components/calendarPanel";
import { monthNamesFull, weekDayNamesShort } from "./utils/calenderUtils";
import type {
  CalendarConfigs,
  DatepickerConfigs,
  DatepickerProps,
  OnDateSelected,
} from "./utils/commonTypes";

export interface SingleDatepickerProps extends DatepickerProps {
  date?: Date;
  onDateChange: (date: Date) => void;
  configs?: DatepickerConfigs;
  disabled?: boolean;
  /**
   * disabledDates: `Uses startOfDay as comparison`
   */
  disabledDates?: Set<number>;
  defaultIsOpen?: boolean;
  closeOnSelect?: boolean;
  id?: string;
  name?: string;
  usePortal?: boolean;
}

const DefaultConfigs: CalendarConfigs = {
  dateFormat: "yyyy-MM-dd",
  monthNames: monthNamesFull,
  dayNames: weekDayNamesShort,
  firstDayOfWeek: 1,
};

export const SingleDatepicker: React.FC<SingleDatepickerProps> = ({
  configs,
  propsConfigs,
  usePortal,
  disabledDates,
  defaultIsOpen = false,
  closeOnSelect = true,
  ...props
}) => {
  const {
    date: selectedDate,
    name,
    disabled,
    onDateChange,
    id,
    minDate,
    maxDate,
  } = props;

  const [dateInView, setDateInView] = useState(selectedDate);
  const [offset, setOffset] = useState(0);

  const { onOpen, onClose, isOpen } = useDisclosure({ defaultIsOpen });

  const calendarConfigs: CalendarConfigs = {
    ...DefaultConfigs,
    ...configs,
  };

  const onPopoverClose = () => {
    onClose();
    setDateInView(selectedDate);
    setOffset(0);
  };

  // dayzed utils
  const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
    if (!selectable) return;
    if (date instanceof Date && !isNaN(date.getTime())) {
      onDateChange(date);
      if (closeOnSelect) onClose();
      return;
    }
  };

  const PopoverContentWrapper = usePortal ? Portal : React.Fragment;

  return (
    <Popover
      isLazy
      isOpen={isOpen}
      onClose={onPopoverClose}
      onOpen={onOpen}
      placement="bottom-start"
      variant="responsive"
    >
      <PopoverTrigger>
        <Input
          autoComplete="off"
          id={id}
          isDisabled={disabled}
          name={name}
          onChange={(e) => e.target.value}
          onKeyPress={(e) => {
            if (e.key === " " && !isOpen) {
              e.preventDefault();
              onOpen();
            }
          }}
          value={
            selectedDate ? format(selectedDate, calendarConfigs.dateFormat) : ""
          }
          {...propsConfigs?.inputProps}
        />
      </PopoverTrigger>
      <PopoverContentWrapper>
        <PopoverContent
          width="100%"
          {...propsConfigs?.popoverCompProps?.popoverContentProps}
        >
          <PopoverBody {...propsConfigs?.popoverCompProps?.popoverBodyProps}>
            <FocusLock>
              <CalendarPanel
                configs={calendarConfigs}
                dayzedHookProps={{
                  showOutsideDays: true,
                  onDateSelected: handleOnDateSelected,
                  selected: selectedDate,
                  date: dateInView,
                  minDate: minDate,
                  maxDate: maxDate,
                  offset: offset,
                  onOffsetChanged: setOffset,
                  firstDayOfWeek: calendarConfigs.firstDayOfWeek,
                }}
                disabledDates={disabledDates}
                propsConfigs={propsConfigs}
              />
            </FocusLock>
          </PopoverBody>
        </PopoverContent>
      </PopoverContentWrapper>
    </Popover>
  );
};
