import React from "react";
import { TableRow, Table } from "../../common/table/Table";
import RemoveUserPopover from "../RemoveUserPopover";
import { TeacherTableProps } from "../admin/AdminTab";

const TeacherUserTable = ({ users }: TeacherTableProps): React.ReactElement => {
  const headers = ["Name", "School", "Email"];
  const rows: TableRow[] = users.map((user) => ({
    values: [`${user.firstName} ${user.lastName}`, user.school!, user.email],
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
