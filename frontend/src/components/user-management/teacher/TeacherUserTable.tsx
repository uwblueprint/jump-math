import React from "react";

import type { TableRow } from "../../common/table/Table";
import { Table } from "../../common/table/Table";
import type { TeacherTableProps } from "../admin/AdminTab";
import RemoveUserPopover from "../RemoveUserPopover";

const TeacherUserTable = ({ users }: TeacherTableProps): React.ReactElement => {
  const headers = ["Name", "School", "Email"];
  const rows: TableRow[] = users.map((user) => ({
    values: [`${user.firstName} ${user.lastName}`, user.school, user.email],
    menu: (
      <RemoveUserPopover
        email={user.email}
        name={`${user.firstName} ${user.lastName}`}
      />
    ),
  }));

  return <Table headers={headers} rows={rows} />;
};
export default TeacherUserTable;
