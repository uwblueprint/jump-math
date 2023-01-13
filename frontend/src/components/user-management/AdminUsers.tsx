import React from "react";
import { HStack, VStack, Text } from "@chakra-ui/react";

import SearchBar from "../common/SearchBar";
import SortTablePopover from "../common/SortTablePopover";
import AdminUserTable from "./AdminUserTable";

import { AdminUser } from "../../types/UserTypes";

interface AdminUsersProps {
  admins: AdminUser[];
}

type AdminUserProperty = "firstName" | "email";
type SortOrder = "Ascending" | "Descending";

const AdminUsers = ({ admins }: AdminUsersProps): React.ReactElement => {
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState<AdminUserProperty>(
    "firstName",
  );
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("Ascending");

  const OrderingSets = {
    sortProperty,
    sortOrder,
    setSortProperty,
    setSortOrder,
  };

  const filteredAdmins = React.useMemo(() => {
    let filteredUsers = admins;
    if (search) {
      filteredUsers = filteredUsers.filter(
        (user: AdminUser) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return filteredUsers;
  }, [search, admins]);

  const sortedAdmins = React.useMemo(() => {
    let sortedUsers: AdminUser[] = filteredAdmins as AdminUser[];
    if (sortOrder === "Descending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty].toLowerCase() < b[sortProperty].toLowerCase() ? 1 : -1,
      );
    } else if (sortOrder === "Ascending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty].toLowerCase() > b[sortProperty].toLowerCase() ? 1 : -1,
      );
    }
    return sortedUsers;
  }, [filteredAdmins, sortProperty, sortOrder]);

  return (
    <VStack pt={4} spacing={6}>
      <HStack width="100%">
        <SearchBar onSearch={setSearch} />
        <SortTablePopover OrderingSets={OrderingSets} />
      </HStack>
      {search && (
        <Text fontSize="16px" color="grey.300" width="100%">
          Showing {sortedAdmins.length} results for &quot;{search}&quot;
        </Text>
      )}
      <AdminUserTable adminUsers={sortedAdmins} />
    </VStack>
  );
};

export default AdminUsers;
