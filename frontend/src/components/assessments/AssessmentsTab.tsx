import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

import { AssessmentProperties } from "../../types/AssessmentTypes";
import EmptyTableState from "../common/table/EmptyTableState";
import { FilterMenuProps } from "../common/table/FilterMenu";
import { SearchBarProps } from "../common/table/SearchBar";
import { SortMenuProps } from "../common/table/SortMenu";

interface AssessmentsTabProps {
  sortMenuComponent: React.ReactElement<SortMenuProps>;
  filterMenuComponent: React.ReactElement<FilterMenuProps>;
  searchBarComponent: React.ReactElement<SearchBarProps>;
  assessmentsTable: React.ReactElement<AssessmentProperties[]>;
  search: string;
  searchLength: number;
}

const AssessmentsTab = ({
  sortMenuComponent,
  filterMenuComponent,
  searchBarComponent,
  assessmentsTable,
  search,
  searchLength,
}: AssessmentsTabProps): React.ReactElement => {
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
        {searchLength !== 0 ? (
          assessmentsTable
        ) : (
          <EmptyTableState items="assessments" />
        )}
      </VStack>
    </>
  );
};

export default AssessmentsTab;
