import React from "react";
import { AdminUser } from "../../types/UserTypes";
import { TableRow, Table } from "../common/Table";
import RemoveUserPopover from "./RemoveUserPopover";

interface AdminUserTableProps {
  adminUsers: AdminUser[];
}

const AdminUserTable = ({
  adminUsers,
}: AdminUserTableProps): React.ReactElement => {
  const tableRows: TableRow[] = adminUsers.map((user) => ({
    values: [`${user.firstName} ${user.lastName}`, user.email],
    removeButton: (
      <RemoveUserPopover
        name={`${user.firstName} ${user.lastName}`}
        email={user.email}
      />
    ),
  }));

  return <Table tableHeaders={["Name", "Email"]} tableRows={tableRows} />;
};
export default AdminUserTable;
