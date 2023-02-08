import React from "react";
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

interface TableProps {
  headers: string[];
  rows: TableRow[];
}

export const Table = ({ headers, rows }: TableProps): React.ReactElement => {
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
            {rows.map((row, rowIndex) => (
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
      <Pagination />
    </>
  );
};

export default Table;
