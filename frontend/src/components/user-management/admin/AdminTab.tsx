import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

import { AdminUser, TeacherUser } from "../../../types/UserTypes";
import EmptyState from "../../common/EmptyState";

interface SortMenuProps {
  properties: string[];
  onSortProperty: React.Dispatch<React.SetStateAction<string>>;
  onSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

interface SearchBarProps {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
}

interface AdminTabProps {
  sortMenuComponent: React.ReactElement<SortMenuProps>;
  searchBarComponent: React.ReactElement<SearchBarProps>;
  UserTable: React.ReactElement<AdminUser[] | TeacherUser[]>;
  search: string;
  searchLength: number;
}

export interface AdminTableProps {
  users: AdminUser[];
}

export interface TeacherTableProps {
  users: TeacherUser[];
}
const AdminTab = ({
  sortMenuComponent,
  searchBarComponent,
  UserTable,
  search,
  searchLength,
}: AdminTabProps): React.ReactElement => {
  return (
    <>
      <VStack pt={4} spacing={6}>
        <HStack width="100%">
          {searchBarComponent}
          {sortMenuComponent}
        </HStack>
        {search && (
          <Text color="grey.300" fontSize="16px" width="100%">
            Showing {searchLength} results for &quot;{search}&quot;
          </Text>
        )}
        {searchLength !== 0 ? UserTable : <EmptyState items="users" />}
      </VStack>
    </>
  );
};
export default AdminTab;
