import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

import type { AdminUser, TeacherUser } from "../../../../types/UserTypes";
import NoResultsTableState from "../../../common/table/NoResultsTableState";
import type { SearchBarProps } from "../../../common/table/SearchBar";
import type { SortMenuProps } from "../../../common/table/SortMenu";

interface AdminTabProps<SortPropTypes extends readonly string[]> {
  sortMenuComponent: React.ReactElement<SortMenuProps<SortPropTypes>>;
  searchBarComponent: React.ReactElement<SearchBarProps>;
  UserTable: React.ReactElement<AdminUser[] | TeacherUser[]>;
  search: string;
  resultsLength: number;
}

export interface AdminTableProps {
  users: AdminUser[];
}

export interface TeacherTableProps {
  users: TeacherUser[];
}
const AdminTab = <SortPropTypes extends readonly string[]>({
  sortMenuComponent,
  searchBarComponent,
  UserTable,
  search,
  resultsLength,
}: AdminTabProps<SortPropTypes>): React.ReactElement => {
  return (
    <>
      <VStack pt={4} spacing={6}>
        <HStack width="100%">
          {searchBarComponent}
          {sortMenuComponent}
        </HStack>
        {search && (
          <Text color="grey.300" fontSize="16px" width="100%">
            Showing {resultsLength} results for &quot;{search}&quot;
          </Text>
        )}
        {resultsLength !== 0 ? (
          UserTable
        ) : (
          <NoResultsTableState items="users" />
        )}
      </VStack>
    </>
  );
};
export default AdminTab;
