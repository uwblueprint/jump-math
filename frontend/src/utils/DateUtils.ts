import addDays from "date-fns/addDays";
import addHours from "date-fns/addHours";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

export const getEarliestValidDate = (now: Date): Date => addHours(now, 1);
export const combineDateAndTime = (date: Date, time: Date): Date =>
  addDays(time, differenceInCalendarDays(date, time));
