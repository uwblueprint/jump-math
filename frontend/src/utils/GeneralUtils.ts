export const titleCase = (word: string): string => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const removeUnderscore = (word: string): string => {
  return word.replace(/_/g, " ");
};

export const getFirstNumber = (word: string): string => {
  const numbers = word.match(/^\d+/);
  return numbers ? numbers[0] : "";
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
