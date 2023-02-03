import React from "react";
import { Text } from "@chakra-ui/react";
import { AdminUser } from "../../types/UserTypes";
import { TableRow, Table } from "../common/Table";
import RemoveUserPopover from "./RemoveUserPopover";

interface AdminUserTableProps {
  adminUsers: AdminUser[];
}

const AdminUserTable = ({
  adminUsers,
}: AdminUserTableProps): React.ReactElement => {
  const headers = ["Name", "Email"];
  const rows: TableRow[] = adminUsers.map((user) => ({
    values: [
      <Text key={0} fontWeight="bold">
        {user.firstName} {user.lastName}
      </Text>,
      user.email,
    ],
    menu: (
      <RemoveUserPopover
        name={`${user.firstName} ${user.lastName}`}
        email={user.email}
      />
    ),
  }));

  return <Table headers={headers} rows={rows} />;
};
export default AdminUserTable;
