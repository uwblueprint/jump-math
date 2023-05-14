import { useMemo, useState } from "react";

type PaginatedDataResult<E, Data extends Array<E> | undefined> = {
  paginatedData: Data;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
};

const usePaginatedData = <E, Data extends Array<E> | undefined>(
  data: Data,
  pageSize = 8,
): PaginatedDataResult<E, Data> => {
  const [currentPage, setCurrentPage] = useState(1);

  const numElements = data?.length ?? 0;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data?.slice(start, end);
  }, [data, currentPage, pageSize]);

  return {
    // Cast to Data to avoid having to check for undefined
    paginatedData: paginatedData as Data,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(numElements / pageSize),
  };
};

export default usePaginatedData;
