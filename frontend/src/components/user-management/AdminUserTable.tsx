import React from "react";
import { Tbody, Tr, Td } from "@chakra-ui/react";
import { AdminUser } from "../../types/UserTypes";
import { TableRow, Table } from "../common/Table";
import RemoveUserPopover from "./RemoveUserPopover";

interface AdminUserTableProps {
  adminUsers: AdminUser[];
}

const AdminUserTable = ({
  adminUsers,
}: AdminUserTableProps): React.ReactElement => {
  const users = adminUsers;

  const removeButton = <RemoveUserPopover name="test" email="test" />;

  const tableRow: TableRow[] = [{ values: ["test1", "test2"], removeButton }];
  const tableBody = (
    <Tbody>
      {users.map((user, index) => (
        <Tr
          key={user.email}
          backgroundColor={index % 2 === 0 ? "blue.50" : "grey.50"}
        >
          <Td fontWeight="bold">{`${user.firstName} ${user.lastName}`}</Td>
          <Td>{user.email}</Td>
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

  return <Table tableHeaders={["Name", "Email"]} tableRows={tableRow} />;
};
export default AdminUserTable;
