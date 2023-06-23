import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

import EmptyTestsMessage from "../info/messages/EmptyTestsMessage";

import type { FilterMenuProps } from "./FilterMenu";
import NoResultsTableState from "./NoResultsTableState";
import type { SearchBarProps } from "./SearchBar";
import type { SortMenuProps } from "./SortMenu";

interface SearchableTablePageProps<T> {
  sortMenuComponent: React.ReactElement<SortMenuProps>;
  filterMenuComponent?: React.ReactElement<FilterMenuProps>;
  noResults: boolean;
  searchBarComponent: React.ReactElement<SearchBarProps>;
  tableComponent: React.ReactElement<T[]>;
  search: string;
  searchLength: number;
  nameOfTableItems: string;
}

const SearchableTablePage = <T,>({
  sortMenuComponent,
  filterMenuComponent,
  noResults,
  searchBarComponent,
  tableComponent,
  search,
  searchLength,
  nameOfTableItems,
}: SearchableTablePageProps<T>): React.ReactElement => {
  const emptyResults = noResults ? (
    <EmptyTestsMessage />
  ) : (
    <NoResultsTableState items={nameOfTableItems} />
  );
  return (
    <>
      <VStack pt={4} spacing={6}>
        <HStack width="100%">
          {searchBarComponent}
          {sortMenuComponent}
          {filterMenuComponent}
        </HStack>
        {search && (
          <Text color="grey.300" fontSize="16px" width="100%">
            Showing {searchLength} results for &quot;
            {search}&quot;
          </Text>
        )}
        {searchLength !== 0 ? tableComponent : emptyResults}
      </VStack>
    </>
  );
};

export default SearchableTablePage;
