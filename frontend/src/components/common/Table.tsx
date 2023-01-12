import React from "react";
import {
  TableContainer,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Text,
} from "@chakra-ui/react";

interface TableProps {
  columns: string[];
  tableBody: React.ReactElement;
}

const Table = ({ columns, tableBody }: TableProps): React.ReactElement => {
  return (
    <TableContainer
      padding="0.5em"
      border="1px solid"
      borderColor="#E2E8F0"
      borderRadius="12px"
      minWidth="100%"
    >
      <ChakraTable sx={{ tableLayout: "auto" }} variant="unstyled" size="md">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>
                <Text textStyle="tableHeader">{column}</Text>
              </Th>
            ))}
          </Tr>
        </Thead>
        {tableBody}
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;
