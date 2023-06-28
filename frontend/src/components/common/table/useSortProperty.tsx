import { useState } from "react";

const useSortProperty = <SortPropertyArrayType extends readonly string[]>(
  initialSortProperty:
    | SortPropertyArrayType[number]
    | (() => SortPropertyArrayType[number]),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sortPropertyArray?: SortPropertyArrayType,
) => {
  const [sortProperty, setSortProperty] =
    useState<SortPropertyArrayType[number]>(initialSortProperty);

  return [sortProperty, setSortProperty] as const;
};

export default useSortProperty;
