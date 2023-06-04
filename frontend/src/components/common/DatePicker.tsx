import React from "react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { format } from "date-fns";

type DatePickerProps = {
  onChange: (date: Date) => void;
  value: Date | undefined;
};

const DatePicker = ({
  onChange,
  value,
}: DatePickerProps): React.ReactElement => {
  return (
    <SingleDatepicker
      configs={{
        dayNames: "SMTWTFS".split(""),
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      }}
      date={value}
      name="date-input"
      onDateChange={(date) => onChange(date)}
      propsConfigs={{
        dateNavBtnProps: {
          fontWeight: 400,
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            width: "2rem",
            color: "grey.400",
            fontWeight: 400,
            borderRadius: 20,
            _hover: {
              width: "2rem",
              background: "blue.300",
              color: "white",
              bg: "blue.300",
            },
          },
          selectedBtnProps: {
            width: "2rem",
            background: "blue.300",
            borderRadius: 20,
            color: "white",
          },
          todayBtnProps: {
            width: "2rem",
            borderColor: "grey.300",
            borderRadius: 20,
            border: "1px solid grey",
          },
        },
        inputProps: {
          value: value ? format(value, "yyyy-MM-dd") : "Please choose a date",
        },
        popoverCompProps: {
          popoverContentProps: {
            fontWeight: "400",
            color: "grey.300",
          },
        },
      }}
    />
  );
};

export default DatePicker;
