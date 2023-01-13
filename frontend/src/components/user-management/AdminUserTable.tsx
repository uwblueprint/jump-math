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
  const headers = ["Name", "Email"];
  const rows: TableRow[] = adminUsers.map((user) => ({
    values: [`${user.firstName} ${user.lastName}`, user.email],
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
