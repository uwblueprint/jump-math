// Rounds number to two decimals
export const roundTwoDecimals = (num: number): number => {
  return parseFloat(num.toFixed(2));
};

// Calculates median score
export const calculateMedianScore = (values: number[]): number => {
  const count = values.length;
  const mid = Math.floor(count / 2);
  const odd = count % 2 === 1;

  if (odd) {
    return values[mid];
  }
  return (values[mid] + values[mid - 1]) / 2;
};
