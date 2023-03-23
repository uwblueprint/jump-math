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
