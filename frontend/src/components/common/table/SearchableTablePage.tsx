import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

import type { FilterMenuProps } from "./FilterMenu";
import NoResultsTableState from "./NoResultsTableState";
import type { SearchBarProps } from "./SearchBar";
import type { SortMenuProps } from "./SortMenu";

interface SearchableTablePageProps<T, SortPropTypes extends readonly string[]> {
  sortMenuComponent: React.ReactElement<SortMenuProps<SortPropTypes>>;
  filterMenuComponent?: React.ReactElement<FilterMenuProps>;
  noResults: boolean;
  noResultsComponent: React.ReactElement;
  searchBarComponent: React.ReactElement<SearchBarProps>;
  tableComponent: React.ReactElement<T[]>;
  search: string;
  resultsLength: number;
  nameOfTableItems: string;
}

const SearchableTablePage = <T, SortPropTypes extends readonly string[]>({
  sortMenuComponent,
  filterMenuComponent,
  noResults,
  noResultsComponent,
  searchBarComponent,
  tableComponent,
  search,
  resultsLength,
  nameOfTableItems,
}: SearchableTablePageProps<T, SortPropTypes>): React.ReactElement => {
  const emptyResults = noResults ? (
    noResultsComponent
  ) : (
    <NoResultsTableState items={nameOfTableItems} />
  );
  return (
    <>
      <VStack py={4} spacing={6} w="full">
        {!noResults && (
          <HStack width="100%">
            {searchBarComponent}
            {sortMenuComponent}
            {filterMenuComponent}
          </HStack>
        )}
        {search && (
          <Text color="grey.300" fontSize="16px" width="100%">
            Showing {resultsLength} results for &quot;
            {search}&quot;
          </Text>
        )}
        {resultsLength !== 0 ? tableComponent : emptyResults}
      </VStack>
    </>
  );
};

export default SearchableTablePage;
