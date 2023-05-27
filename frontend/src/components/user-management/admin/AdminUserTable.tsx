import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";

import AuthContext from "../../../contexts/AuthContext";
import type { AuthenticatedAdminOrTeacher } from "../../../types/AuthTypes";
import type { TableRow } from "../../common/table/Table";
import { Table } from "../../common/table/Table";
import RemoveUserPopover from "../RemoveUserPopover";

import type { AdminTableProps } from "./AdminTab";

const AdminUserTable = ({ users }: AdminTableProps): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);

  const headers = ["Name", "Email"];
  const rows: TableRow[] = users.map((user) => ({
    values: [`${user.firstName} ${user.lastName}`, user.email],
    menu:
      authenticatedUser &&
      (authenticatedUser as AuthenticatedAdminOrTeacher).email !==
        user.email ? (
        <RemoveUserPopover
          email={user.email}
          name={`${user.firstName} ${user.lastName}`}
        />
      ) : (
        <Box height="32px" />
      ),
  }));

  return <Table headers={headers} rows={rows} />;
};
export default AdminUserTable;
