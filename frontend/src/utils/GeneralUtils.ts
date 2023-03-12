const titleCase = (word: string): string => {
  const replacedWord = word.replace(/_/g, " ");
  return replacedWord[0].toUpperCase() + replacedWord.slice(1).toLowerCase();
};

export default titleCase;
