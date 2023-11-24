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
  menu?: React.ReactElement;
  id?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

interface TableProps<T extends Nodes = Nodes> {
  headers: string[];
  rows: TableRow<T>[];
}

export const Table = <T extends Nodes = Nodes>({
  headers,
  rows,
}: TableProps<T>): React.ReactElement => {
  const { paginatedData, totalPages, currentPage, setCurrentPage } =
    usePaginatedData(rows);

  return (
    <VStack alignItems="center" spacing="6" width="100%">
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
                key={row.id || rowIndex}
                backgroundColor={rowIndex % 2 === 0 ? "blue.50" : "grey.50"}
                cursor={row.isDisabled ? "not-allowed" : "pointer"}
                onClick={row.isDisabled ? undefined : row.onClick}
              >
                {row.values.map((value, cellIndex) => (
                  <Td
                    key={`${value}-${cellIndex}`}
                    fontWeight={cellIndex === 0 ? "bold" : ""}
                  >
                    {value}
                  </Td>
                ))}
                {row.menu && <Td width="5%">{row.menu}</Td>}
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
