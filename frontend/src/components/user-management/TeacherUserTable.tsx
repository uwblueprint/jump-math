import React from "react";
import { User } from "../../types/UserTypes";
import { TableRow, Table } from "../common/Table";
import RemoveUserPopover from "./RemoveUserPopover";
import { UserTableProps } from "./AdminTab";

const TeacherUserTable = ({ users }: UserTableProps): React.ReactElement => {
  const headers = ["Name", "School", "Email"];
  const rows: TableRow[] = users.map((user) => ({
    values: [`${user.firstName} ${user.lastName}`, user.school!, user.email],
    menu: (
      <RemoveUserPopover
        name={`${user.firstName} ${user.lastName}`}
        email={user.email}
      />
    ),
  }));

  return <Table headers={headers} rows={rows} />;
};
export default TeacherUserTable;
