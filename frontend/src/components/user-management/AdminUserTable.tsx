import React from "react";
import { TableData } from "../../types/UserTypes";
import { TableRow, Table } from "../common/Table";
import RemoveUserPopover from "./RemoveUserPopover";

interface AdminUserTableProps {
  adminUsers: TableData[];
}

const AdminUserTable = ({
  adminUsers,
}: AdminUserTableProps): React.ReactElement => {
  const headers = ["Name", "Email"];
  const rows: TableRow[] = adminUsers.map((user) => ({
    values: [user.name, user.email],
    menu: <RemoveUserPopover name={user.name} email={user.email} />,
  }));

  return <Table headers={headers} rows={rows} />;
};
export default AdminUserTable;
