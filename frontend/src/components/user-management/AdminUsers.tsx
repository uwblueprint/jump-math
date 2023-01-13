import React from "react";
import { HStack, VStack, Text } from "@chakra-ui/react";

import SearchBar from "../common/SearchBar";
import SortTablePopover from "../common/SortTablePopover";
import AdminUserTable from "./AdminUserTable";

import { TableData } from "../../types/UserTypes";

interface AdminUsersProps {
  data: TableData[];
}

type AdminUserProperty = "name" | "email";
type SortOrder = "ascending" | "descending";

const AdminUsers = ({ data }: AdminUsersProps): React.ReactElement => {
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState<AdminUserProperty>(
    "name",
  );
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("ascending");

  const OrderingSets = {
    sortProperty,
    sortOrder,
    setSortProperty,
    setSortOrder,
  };

  const admins = React.useMemo(() => {
    let users = data;
    if (search) {
      users = users.filter(
        (user: TableData) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (sortOrder === "ascending") {
      users = users?.sort((a, b) =>
        a[sortProperty].toLowerCase() > b[sortProperty].toLowerCase() ? 1 : -1,
      );
    }
    if (sortOrder === "descending") {
      users = users?.sort((a, b) =>
        a[sortProperty].toLowerCase() < b[sortProperty].toLowerCase() ? 1 : -1,
      );
    }
    return users;
  }, [search, sortOrder, sortProperty, data]);

  return (
    <VStack pt={4} spacing={6}>
      <HStack width="100%">
        <SearchBar onSearch={setSearch} />
        <SortTablePopover OrderingSets={OrderingSets} />
      </HStack>
      {search && (
        <Text fontSize="16px" color="grey.300" width="100%">
          Showing {admins.length} results for &quot;{search}&quot;
        </Text>
      )}
      <AdminUserTable adminUsers={admins} />
    </VStack>
  );
};

export default AdminUsers;
