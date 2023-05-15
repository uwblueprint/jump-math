import { useMemo, useState } from "react";

type PaginatedDataResult<T> = {
  paginatedData: T[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
};

const usePaginatedData = <T>(
  data: T[],
  pageSize = 8,
): PaginatedDataResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);

  return {
    paginatedData,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(data.length / pageSize),
  };
};

export default usePaginatedData;
