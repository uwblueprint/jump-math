export const NUMBER_FORMAT = (value: number) => value.toFixed(0);
export const PERCENTAGE_FORMAT = (value: number) => `${NUMBER_FORMAT(value)}%`;
export const NTH_FORMAT = (value: number) => {
  const lastDigit = value % 10;
  let suffix = "th";
  if (lastDigit === 1) suffix = "st";
  if (lastDigit === 2) suffix = "nd";
  if (lastDigit === 3) suffix = "rd";
  return `${NUMBER_FORMAT(value)}${suffix}`;
};
