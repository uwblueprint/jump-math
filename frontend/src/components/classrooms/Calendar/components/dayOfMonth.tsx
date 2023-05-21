import React, { useMemo } from "react";
import type { ButtonProps } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import type { DateObj, RenderProps } from "dayzed";

import type {
  DatepickerProps,
  DayOfMonthBtnStyleProps,
} from "../utils/commonTypes";

interface DayOfMonthProps extends DatepickerProps {
  renderProps: RenderProps;
  disabledDates?: Set<number>;
  dateObj: DateObj;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

type HoverStyle =
  | (ButtonProps["_hover"] & { _disabled: ButtonProps["_disabled"] })
  | undefined;

const halfGap = 0.125; //default Chakra-gap-space-1 is 0.25rem

export const DayOfMonth: React.FC<DayOfMonthProps> = ({
  dateObj,
  propsConfigs,
  disabledDates,
  renderProps,
  onMouseEnter,
}) => {
  const { date, selected, selectable, today } = dateObj;
  const { getDateProps } = renderProps;
  const { defaultBtnProps, selectedBtnProps, todayBtnProps } =
    propsConfigs?.dayOfMonthBtnProps || {};
  const disabled = !selectable || disabledDates?.has(date.getTime());
  const styleBtnProps: DayOfMonthBtnStyleProps = useMemo(
    () => ({
      defaultBtnProps: {
        size: "sm",
        variant: "ghost",
        fontWeight: 400,
        borderRadius: 20,
        color: "grey.400",
        width: "2rem",
        // this intends to fill the visual gap from Grid to improve the UX
        // so the button active area is actually larger than what it's seen
        ...defaultBtnProps,
        _after: {
          content: "''",
          position: "absolute",
          top: `-${halfGap}rem`,
          left: `-${halfGap}rem`,
          bottom: `-${halfGap}rem`,
          right: `-${halfGap}rem`,
          borderWidth: `${halfGap}rem`,
          borderColor: "transparent",
          ...defaultBtnProps?._after,
        },
        _hover: {
          background: "blue.300",
          color: "white",
          bg: "blue.300",
          ...defaultBtnProps?._hover,
          _disabled: {
            bg: "gray.100",
            // temperory hack to persist the typescript checking
            ...(defaultBtnProps?._hover as HoverStyle)?._disabled,
          },
        },
      },
      selectedBtnProps: {
        background: "blue.300",
        borderRadius: 20,
        color: "white",
        ...selectedBtnProps,
      },
      todayBtnProps: {
        borderColor: "grey.400",
        borderRadius: 20,
        border: "1px solid grey",
        ...todayBtnProps,
      },
    }),
    [defaultBtnProps, selectedBtnProps, todayBtnProps],
  );

  return (
    <Button
      {...getDateProps({
        dateObj,
        disabled: disabled,
        onMouseEnter: onMouseEnter,
      })}
      isDisabled={disabled}
      {...styleBtnProps.defaultBtnProps}
      {...(selected && !disabled && styleBtnProps.selectedBtnProps)}
      {...(today && styleBtnProps.todayBtnProps)}
    >
      {date.getDate()}
    </Button>
  );
};
