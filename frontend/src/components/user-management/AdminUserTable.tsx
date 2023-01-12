import React from "react";
import { Tbody, Tr, Td, Text } from "@chakra-ui/react";
import { AdminUser } from "../../types/UserTypes";
import Table from "../common/Table";
import RemoveUserPopover from "./RemoveUserPopover";

interface AdminUserTableProps {
  adminUsers: AdminUser[];
}

const AdminUserTable = ({
  adminUsers,
}: AdminUserTableProps): React.ReactElement => {
  const users = adminUsers;

  const tableBody = (
    <Tbody>
      {users.map((user, index) => (
        <Tr
          _hover={{ backgroundColor: "blue.300", color: "grey.50" }}
          key={user.email}
          backgroundColor={index % 2 === 0 ? "blue.50" : "grey.50"}
        >
          <Td>
            <Text
              fontWeight="bold"
              textStyle="tableBody"
            >{`${user.firstName} ${user.lastName}`}</Text>
          </Td>
          <Td>
            <Text textStyle="tableBody">{user.email}</Text>
          </Td>
          <Td width="5%">
            <RemoveUserPopover
              name={`${user.firstName} ${user.lastName}`}
              email={user.email}
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  );

  return <Table columns={["Name", "Email"]} tableBody={tableBody} />;
};
export default AdminUserTable;
