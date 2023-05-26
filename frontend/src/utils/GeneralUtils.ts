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

export const getCurrentDate = (): string => formatDate(new Date());

export const formatDateTime = (date: Date): string => {
  return `${formatDate(new Date(date))} at ${date.toLocaleTimeString("en-US")}`;
};

export function sortArrayAscending<Type extends Record<string, string>>(
  array: Type[],
  sortProperty: string,
): Type[] {
  return array?.sort((a, b) =>
    a[sortProperty as keyof Type].toLowerCase() >
    b[sortProperty as keyof Type].toLowerCase()
      ? 1
      : -1,
  );
}

export function sortArrayDescending<Type extends Record<string, string>>(
  array: Type[],
  sortProperty: string,
): Type[] {
  return array?.sort((a, b) =>
    a[sortProperty as keyof Type].toLowerCase() <
    b[sortProperty as keyof Type].toLowerCase()
      ? 1
      : -1,
  );
}

export function sortArray<Type extends Record<string, string>>(
  array: Type[],
  sortProperty: string,
  order: string,
): Type[] {
  return order === "descending"
    ? sortArrayDescending<Type>(array, sortProperty)
    : sortArrayAscending<Type>(array, sortProperty);
}

export const randomNumber = (): number =>
  window.crypto.getRandomValues(new Uint32Array(1))[0];

export const stringToNumber = (input: string): number | null => {
  const value = parseFloat(input);
  return Number.isNaN(value) ? null : value;
};
