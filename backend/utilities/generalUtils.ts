// Rounds number to two decimals
export const roundTwoDecimals = (num: number): number => {
  return parseFloat(num.toFixed(2));
};

export const equalArrays = (arr1: number[], arr2: number[]): boolean => {
  return (
    arr1.length === arr2.length && arr1.every((val, idx) => val === arr2[idx])
  );
};

export const calculateMedianScore = (values: number[]): number => {
  const count = values.length;
  const mid = Math.floor(count / 2);
  const odd = count % 2 === 1;

  if (odd) {
    return values[mid];
  }
  return (values[mid] + values[mid - 1]) / 2;
};

export const isCompletedTestSession = (
  results: Array<Array<Array<number>>>,
): boolean => {
  return results.every((question) =>
    question.every((subquestion) => subquestion.length !== 0),
  );
};
