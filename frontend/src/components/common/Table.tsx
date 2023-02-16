import React, { useState } from "react";
import {
  TableContainer,
  Table as T,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import Pagination from "./Pagination";

export interface TableRow {
  values: string[];
  menu: React.ReactElement;
}

export interface TableProps {
  headers: string[];
  rows: TableRow[];
}

export const Table = ({ headers, rows }: TableProps): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // can edit this to show how many itemsperpage we want
  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the index range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const itemsToShow = rows.slice(startIndex, endIndex);

  // Define the onPageChange function to update the currentPage state

  return (
    <>
      <TableContainer
        padding="0.5em"
        border="1px solid"
        borderColor="#E8EDF1"
        borderRadius="12px"
        minWidth="100%"
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
                backgroundColor={rowIndex % 2 === 0 ? "#E8EDF1" : "#FFFFFF"}
              >
                {row.values.map((value, cellIndex) => (
                  <Td key={value} fontWeight={cellIndex === 0 ? "500" : ""}>
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
        pagesCount={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsToShow={10}
      />
    </>
  );
};

export default Table;
