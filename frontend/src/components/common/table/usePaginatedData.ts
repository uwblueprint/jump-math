import { useMemo, useState } from "react";

const usePaginatedData = <T>(data: T[], pageSize = 8) => {
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
