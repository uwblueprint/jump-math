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

export const getReadableDate = (): string => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
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
