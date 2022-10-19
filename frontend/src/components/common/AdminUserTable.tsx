import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";

const userDataArr = [
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its existence, Chakra was created.",
  },
];

const AdminUserTable = (): React.ReactElement => {
  return (
    <TableContainer
      padding="10px"
      border="1px solid"
      borderColor="grey.200"
      borderRadius="12px"
    >
      <Table sx={{ tableLayout: "fixed" }} variant="unstyled" size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userDataArr.map((user, index) => (
            <Tr
              _hover={{ backgroundColor: "#154472", color: "white" }}
              key={user.firstName}
              backgroundColor={index % 2 === 0 ? "#E8EDF1" : "white"}
            >
              <Td>
                <Text
                  noOfLines={1}
                >{`${user.firstName} ${user.lastName}`}</Text>
              </Td>
              <Td>
                <Text noOfLines={1}>{user.email}</Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default AdminUserTable;
