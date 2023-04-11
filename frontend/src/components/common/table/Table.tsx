import React, { useState } from "react";
import {
  Table as T,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import Pagination from "./Pagination";

export interface TableRow {
  values: any[];
  menu: React.ReactElement;
}

interface TableProps {
  headers: string[];
  rows: TableRow[];
}

export const Table = ({ headers, rows }: TableProps): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const itemsToShow = rows.slice(startIndex, endIndex);

  return (
    <>
      <TableContainer
        border="1px solid"
        borderColor="blue.50"
        borderRadius="12px"
        minWidth="100%"
        padding="0.5em"
      >
        <T>
          <Thead>
            <Tr _hover={{ pointerEvents: "none" }}>
              {headers.map((header, index) => (
                <Th key={index}>{header} </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {itemsToShow.map((row, rowIndex) => (
              <Tr
                key={rowIndex}
                backgroundColor={rowIndex % 2 === 0 ? "blue.50" : "grey.50"}
              >
                {row.values.map((value, cellIndex) => (
                  <Td key={value} fontWeight={cellIndex === 0 ? "bold" : ""}>
                    {value}
                  </Td>
                ))}
                <Td width="5%">{row.menu}</Td>
              </Tr>
            ))}
          </Tbody>
        </T>
      </TableContainer>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pagesCount={totalPages}
      />
    </>
  );
};

export default Table;
