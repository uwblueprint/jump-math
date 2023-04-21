import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

import { AssessmentProperties } from "../../types/AssessmentTypes";
import EmptyTableState from "../common/table/EmptyTableState";
import { FilterMenuProps } from "../common/table/FilterMenu";
import NoResultsTableState from "../common/table/NoResultsTableState";
import { SearchBarProps } from "../common/table/SearchBar";
import { SortMenuProps } from "../common/table/SortMenu";

interface AssessmentsTabProps {
  sortMenuComponent: React.ReactElement<SortMenuProps>;
  filterMenuComponent: React.ReactElement<FilterMenuProps>;
  noResults: boolean;
  searchBarComponent: React.ReactElement<SearchBarProps>;
  assessmentsTable: React.ReactElement<AssessmentProperties[]>;
  search: string;
  searchLength: number;
}

const AssessmentsTab = ({
  sortMenuComponent,
  filterMenuComponent,
  noResults,
  searchBarComponent,
  assessmentsTable,
  search,
  searchLength,
}: AssessmentsTabProps): React.ReactElement => {
  const emptyResults = noResults ? (
    <EmptyTableState />
  ) : (
    <NoResultsTableState items="assessments" />
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
        {searchLength !== 0 ? assessmentsTable : emptyResults}
      </VStack>
    </>
  );
};

export default AssessmentsTab;
