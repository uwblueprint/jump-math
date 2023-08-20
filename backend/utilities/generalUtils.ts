import type { QueryOptions as MongooseQueryOptions, Document } from "mongoose";
import type { QueryOptions } from "../types";

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

export const isCompletedTestResult = (
  results: Array<Array<Array<number>>>,
): boolean => {
  return results.flat().every((answer) => answer.length);
};

export const computePercentiles = <
  K extends string,
  T extends Record<K, number>,
>(
  results: T[],
  key: K,
): (T & { percentile: number })[] =>
  results
    .sort((a, b) => a[key] - b[key])
    .map((result, index) => {
      const percentile = roundTwoDecimals((index + 1) / results.length) * 100;
      return { ...result, percentile };
    });

export const generateAccessCode = () => {
  const minm = 100000;
  const maxm = 999999;
  return String(Math.floor(Math.random() * (maxm - minm + 1)) + minm);
};

export const mapDocumentToDTO = <T extends Document>(document: T) =>
  document.toObject();

export const mapDocumentsToDTOs = <T extends Document>(documents: Array<T>) =>
  documents.map(mapDocumentToDTO);

const pickQueryOptions = ({
  limit,
  skip,
  sort,
}: MongooseQueryOptions): QueryOptions => ({ limit, skip, sort });

export const applyQueryOptions = <
  T extends { setOptions: (o: QueryOptions) => void },
>(
  query: T,
  queryOptions?: QueryOptions,
): void => {
  if (queryOptions) {
    query.setOptions(pickQueryOptions(queryOptions));
  }
};
