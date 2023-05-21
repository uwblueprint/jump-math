import React, { useState } from "react";
import FocusLock from "react-focus-lock";
import {
  Flex,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import type { Props as DayzedHookProps } from "dayzed";

import { CalendarPanel } from "./components/calendarPanel";
import { monthNamesShort, weekDayNamesShort } from "./utils/calenderUtils";
import type {
  CalendarConfigs,
  DatepickerConfigs,
  DatepickerProps,
  OnDateSelected,
  PropsConfigs,
} from "./utils/commonTypes";

interface RangeCalendarPanelProps {
  dayzedHookProps: DayzedHookProps;
  configs: CalendarConfigs;
  propsConfigs?: PropsConfigs;
  selected?: Date | Date[];
}

export const RangeCalendarPanel: React.FC<RangeCalendarPanelProps> = ({
  dayzedHookProps,
  configs,
  propsConfigs,
  selected,
}) => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Calendar level
  const onMouseLeave = () => {
    setHoveredDate(null);
  };

  // Date level
  const onMouseEnterHighlight = (date: Date) => {
    if (!Array.isArray(selected) || !selected?.length) {
      return;
    }
    setHoveredDate(date);
  };

  const isInRange = (date: Date) => {
    if (!Array.isArray(selected) || !selected?.length) {
      return false;
    }
    const firstSelected = selected[0];
    if (selected.length === 2) {
      const secondSelected = selected[1];
      return firstSelected < date && secondSelected > date;
    } else {
      return (
        hoveredDate &&
        ((firstSelected < date && hoveredDate >= date) ||
          (date < firstSelected && date >= hoveredDate))
      );
    }
  };

  return (
    <Flex onMouseLeave={onMouseLeave}>
      <CalendarPanel
        configs={configs}
        dayzedHookProps={dayzedHookProps}
        isInRange={isInRange}
        onMouseEnterHighlight={onMouseEnterHighlight}
        propsConfigs={propsConfigs}
      />
    </Flex>
  );
};

export interface RangeDatepickerProps extends DatepickerProps {
  selectedDates: Date[];
  configs?: DatepickerConfigs;
  disabled?: boolean;
  defaultIsOpen?: boolean;
  closeOnSelect?: boolean;
  onDateChange: (date: Date[]) => void;
  id?: string;
  name?: string;
  usePortal?: boolean;
}

const DefaultConfigs: CalendarConfigs = {
  dateFormat: "MM/dd/yyyy",
  monthNames: monthNamesShort,
  dayNames: weekDayNamesShort,
  firstDayOfWeek: 0,
};

export const RangeDatepicker: React.FC<RangeDatepickerProps> = ({
  configs,
  propsConfigs = {},
  id,
  name,
  usePortal,
  defaultIsOpen = false,
  closeOnSelect = true,
  ...props
}) => {
  const { selectedDates, minDate, maxDate, onDateChange, disabled } = props;

  // chakra popover utils
  const [dateInView, setDateInView] = useState(selectedDates[0] || new Date());
  const [offset, setOffset] = useState(0);
  const { onOpen, onClose, isOpen } = useDisclosure({ defaultIsOpen });

  const calendarConfigs: CalendarConfigs = {
    ...DefaultConfigs,
    ...configs,
  };

  const onPopoverClose = () => {
    onClose();
    setDateInView(selectedDates[0] || new Date());
    setOffset(0);
  };

  const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
    if (!selectable) {
      return;
    }
    const newDates = [...selectedDates];
    if (selectedDates.length) {
      if (selectedDates.length === 1) {
        const firstTime = selectedDates[0];
        if (firstTime < date) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }
        onDateChange(newDates);

        if (closeOnSelect) onClose();
        return;
      }

      if (newDates.length === 2) {
        onDateChange([date]);
        return;
      }
    } else {
      newDates.push(date);
      onDateChange(newDates);
    }
  };

  // eventually we want to allow user to freely type their own input and parse the input
  let intVal = selectedDates[0]
    ? `${format(selectedDates[0], calendarConfigs.dateFormat)}`
    : "";
  intVal += selectedDates[1]
    ? ` - ${format(selectedDates[1], calendarConfigs.dateFormat)}`
    : "";

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
          value={intVal}
          {...propsConfigs.inputProps}
        />
      </PopoverTrigger>
      <PopoverContentWrapper>
        <PopoverContent
          width="100%"
          {...propsConfigs?.popoverCompProps?.popoverContentProps}
        >
          <PopoverBody {...propsConfigs.popoverCompProps?.popoverBodyProps}>
            <FocusLock>
              <RangeCalendarPanel
                configs={calendarConfigs}
                dayzedHookProps={{
                  onDateSelected: handleOnDateSelected,
                  selected: selectedDates,
                  monthsToDisplay: 2,
                  date: dateInView,
                  minDate: minDate,
                  maxDate: maxDate,
                  offset: offset,
                  onOffsetChanged: setOffset,
                  firstDayOfWeek: calendarConfigs.firstDayOfWeek,
                }}
                propsConfigs={propsConfigs}
                selected={selectedDates}
              />
            </FocusLock>
          </PopoverBody>
        </PopoverContent>
      </PopoverContentWrapper>
    </Popover>
  );
};
