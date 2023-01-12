import React from "react";
import {
  TableContainer,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
} from "@chakra-ui/react";

interface TableProps {
  tableHeaders: string[];
  tableRows: React.ReactElement;
}

const Table = ({ tableHeaders, tableRows }: TableProps): React.ReactElement => {
  return (
    <TableContainer
      padding="0.5em"
      border="1px solid"
      borderColor="#E2E8F0"
      borderRadius="12px"
      minWidth="100%"
    >
      <ChakraTable>
        <Thead>
          <Tr _hover={{ pointerEvents: "none" }}>
            {tableHeaders.map((tableHeader, index) => (
              <Th key={index}>{tableHeader}</Th>
            ))}
          </Tr>
        </Thead>
        {tableRows}
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;
