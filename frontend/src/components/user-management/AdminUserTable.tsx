import React from "react";
import { TableRow, Table } from "../common/Table";
import RemoveUserPopover from "./RemoveUserPopover";
import { AdminTableProps } from "./AdminTab";

const AdminUserTable = ({ users }: AdminTableProps): React.ReactElement => {
  const headers = ["Name", "Email"];
  const rows: TableRow[] = users.map((user) => ({
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
