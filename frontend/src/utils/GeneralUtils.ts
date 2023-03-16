const titleCase = (word: string): string => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const gradeCase = (word: string): string => {
  return titleCase(word).replace(/_/g, " ");
};

export default titleCase;
