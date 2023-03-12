import React from "react";

import { Table, TableRow } from "../../common/table/Table";
import RemoveUserPopover from "../RemoveUserPopover";

import { AdminTableProps } from "./AdminTab";

const AdminUserTable = ({ users }: AdminTableProps): React.ReactElement => {
  const headers = ["Name", "Email"];
  const rows: TableRow[] = users.map((user) => ({
    values: [`${user.firstName} ${user.lastName}`, user.email],
    menu: (
      <RemoveUserPopover
        email={user.email}
        name={`${user.firstName} ${user.lastName}`}
      />
    ),
  }));

  return <Table headers={headers} rows={rows} />;
};
export default AdminUserTable;