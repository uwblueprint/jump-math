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

export interface TableRow {
  values: string[];
  menu: React.ReactElement;
}

interface TableProps {
  tableHeaders: string[];
  tableRows: TableRow[];
}

export const Table = ({
  tableHeaders,
  tableRows,
}: TableProps): React.ReactElement => {
  return (
    <TableContainer
      padding="0.5em"
      border="1px solid"
      borderColor="#E2E8F0"
      borderRadius="12px"
      minWidth="100%"
    >
      <T>
        <Thead>
          <Tr _hover={{ pointerEvents: "none" }}>
            {tableHeaders.map((tableHeader, index) => (
              <Th key={index}>{tableHeader}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableRows.map((row, rowIndex) => (
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
  );
};

export default Table;
