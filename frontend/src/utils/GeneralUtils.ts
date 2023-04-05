export const titleCase = (input: string): string => {
  const words = input.split(" ");

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
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
