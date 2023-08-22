import { isSameDay } from "date-fns";

export const titleCase = (input: string): string => {
  const words = input.trim().split(/\s+/);
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
};

export const removeUnderscore = (word: string): string => {
  return word.replace(/_/g, " ");
};

export const includesIgnoreCase = (text: string, pattern: string): boolean => {
  return text.toLowerCase().includes(pattern.toLowerCase());
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const formatMonth = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const getCurrentDate = (): string => formatDate(new Date());

export const formatDateTime = (date: Date): string => {
  return `${formatDate(new Date(date))} at ${date.toLocaleTimeString("en-US")}`;
};

export function sortArrayAscending<
  Type extends Record<Keys, string>,
  Keys extends keyof Type = keyof Type,
>(array: Type[], sortProperty: Keys): Type[] {
  return [...array].sort((a, b) =>
    a[sortProperty].toLowerCase() > b[sortProperty].toLowerCase() ? 1 : -1,
  );
}

export function sortArrayDescending<
  Type extends Record<Keys, string>,
  Keys extends keyof Type = keyof Type,
>(array: Type[], sortProperty: Keys): Type[] {
  return [...array].sort((a, b) =>
    a[sortProperty].toLowerCase() < b[sortProperty].toLowerCase() ? 1 : -1,
  );
}

export function sortArray<
  Type extends Record<Keys, string>,
  Keys extends keyof Type = keyof Type,
>(array: Type[], sortProperty: Keys, order: string): Type[] {
  return order === "descending"
    ? sortArrayDescending<Type, Keys>(array, sortProperty)
    : sortArrayAscending<Type, Keys>(array, sortProperty);
}

export const randomNumber = (): number =>
  window.crypto.getRandomValues(new Uint32Array(1))[0];

export const stringToFloat = (input: string): number | undefined => {
  const value = parseFloat(input);
  return Number.isNaN(value) ? undefined : value;
};

export const stringToInt = (input: string): number | undefined => {
  const value = parseInt(input);
  return Number.isNaN(value) ? undefined : value;
};

export const isPastDate = (input: Date) => {
  const now = new Date();
  return input < now && !isSameDay(input, now);
};

export const getLetterFromNumber = (number: number): string => {
  if (number < 0) {
    throw new Error("Invalid number");
  }
  if (number > 26 * 26 - 1) {
    throw new Error("Number too large");
  }

  const firstLetter =
    number < 26 ? "" : String.fromCharCode(Math.floor(number / 26) + 96);
  const secondLetter = String.fromCharCode((number % 26) + 97);

  return firstLetter + secondLetter;
};

export const preventNonNumericKeys = (
  e: React.KeyboardEvent<HTMLInputElement>,
  value: string,
  integerOnly = false,
) => {
  if (
    (integerOnly && e.key === ".") ||
    e.key === "e" ||
    (e.key === "-" && value.length !== 0)
  )
    e.preventDefault();
};
