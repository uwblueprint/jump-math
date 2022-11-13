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
import { AdminUser } from "../../types/UserTypes";
import RemoveUserPopover from "./Admin/RemoveUserPopover";

interface AdminUserTableProps {
  adminUsers: AdminUser[];
}

const AdminUserTable = ({
  adminUsers,
}: AdminUserTableProps): React.ReactElement => {
  return (
    <TableContainer
      padding="10px"
      border="1px solid"
      borderColor="#E2E8F0"
      borderRadius="12px"
    >
      <Table sx={{ tableLayout: "auto" }} variant="unstyled" size="md">
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
          {adminUsers.map((user, index) => (
            <Tr
              _hover={{ backgroundColor: "blue.300", color: "grey.50" }}
              key={user.email}
              backgroundColor={index % 2 === 0 ? "blue.50" : "grey.50"}
            >
              <Td sx={{ width: "50%", pr: "400px" }}>
                <Text
                  noOfLines={1}
                  style={{ display: "block" }}
                >{`${user.firstName} ${user.lastName}`}</Text>
              </Td>
              <Td maxWidth="200px">
                <Text noOfLines={1} style={{ display: "block" }}>
                  {user.email}
                </Text>
              </Td>
              <Td sx={{ width: "7%" }} maxWidth="5px" p="0" m="0">
                <RemoveUserPopover
                  name={`${user.firstName} ${user.lastName}`}
                  email={user.email}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default AdminUserTable;
