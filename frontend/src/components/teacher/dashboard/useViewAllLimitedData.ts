import { useMemo } from "react";

const useViewAllLimitedData = <T>(
  arr: T[] | undefined,
  limit: number,
): [T[] | undefined, boolean] => {
  return useMemo(() => {
    if (arr?.length && arr.length >= limit) {
      return [arr?.slice(0, -1), true];
    }
    return [arr, false];
  }, [arr, limit]);
};

export default useViewAllLimitedData;
