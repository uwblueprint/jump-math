import React from "react";
import { Text, VStack, HStack } from "@chakra-ui/react";

import { AdminUser, TeacherUser } from "../../types/UserTypes";

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
          <Text fontSize="16px" color="grey.300" width="100%">
            Showing {searchLength} results for &quot;{search}&quot;
          </Text>
        )}
        {UserTable}
      </VStack>
    </>
  );
};
export default AdminTab;
