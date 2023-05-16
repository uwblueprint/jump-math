import React from "react";
import {
  Table as T,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import Pagination from "./Pagination";
import usePaginatedData from "./usePaginatedData";

type Nodes = React.ReactNode[];

export interface TableRow<T extends Nodes = Nodes> {
  values: [...T];
  menu: React.ReactElement;
}

interface TableProps<T extends Nodes = Nodes> {
  headers: string[];
  rows: TableRow<T>[];
}

export const Table = <T extends Nodes = Nodes>({
  headers,
  rows,
}: TableProps<T>): React.ReactElement => {
  const {
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
  } = usePaginatedData(rows);

  return (
    <VStack alignItems="center" paddingBottom="6" spacing="6" width="100%">
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
            {paginatedData.map((row, rowIndex) => (
              <Tr
                key={rowIndex}
                backgroundColor={rowIndex % 2 === 0 ? "blue.50" : "grey.50"}
              >
                {row.values.map((value, cellIndex) => (
                  <Td
                    key={String(value)}
                    fontWeight={cellIndex === 0 ? "bold" : ""}
                  >
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
    </VStack>
  );
};

export default Table;
