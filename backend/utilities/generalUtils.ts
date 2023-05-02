export const roundTwoDecimals = (num: number): number => {
  return parseFloat(num.toFixed(2));
};

export const isEqual = (arr1: number[], arr2: number[]): boolean => {
  return (
    arr1.length === arr2.length && arr1.every((val, idx) => val === arr2[idx])
  );
};
