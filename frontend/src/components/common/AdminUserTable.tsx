import React, { useState } from "react";
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

import { AdminUser } from "../../types/UserTypes";

interface AdminUserTableProps {
  adminUsers: AdminUser[];
}

type AdminUserProperty = "firstName" | "lastName" | "email";

const AdminUserTable = ({
  adminUsers,
}: AdminUserTableProps): React.ReactElement => {
  const [users, setUsers] = useState(adminUsers);
  const [order, setOrder] = useState("Ascending");
  const sorting = (property: AdminUserProperty) => {
     if (order === "Ascending") {
       setUsers(users.sort((a, b)=>
         a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1
       ));
       setUsers(sorted);
       setOrder("Descending")
     }
   };

  return (
    <TableContainer
      padding="10px"
      border="1px solid"
      borderColor="#E2E8F0"
      borderRadius="12px"
    >
      <Table sx={{ tableLayout: "fixed" }} variant="unstyled" size="md">
        <Thead>
          <Tr>
            <Th>
              <Text textStyle="link" color="blue.700" textTransform="none">
                Name
              </Text>
            </Th>
            <Th>
              <Text textStyle="link" color="blue.700" textTransform="none">
                Email
              </Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr
              _hover={{ backgroundColor: "blue.300", color: "grey.50" }}
              key={user.firstName}
              backgroundColor={index % 2 === 0 ? "blue.50" : "grey.50"}
            >
              <Td>
                <Text
                  noOfLines={1}
                  style={{ display: "block" }}
                >{`${user.firstName} ${user.lastName}`}</Text>
              </Td>
              <Td>
                <Text noOfLines={1} style={{ display: "block" }}>
                  {user.email}
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default AdminUserTable;
