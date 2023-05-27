import React, { useState } from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

import type { FilterProp } from "../../common/table/FilterMenu";
import FilterMenu from "../../common/table/FilterMenu";
import SearchBar from "../../common/table/SearchBar";
import type { SortOrder } from "../../common/table/SortMenu";
import SortMenu from "../../common/table/SortMenu";
import FormHeader from "../../sessions/distribute/FormHeader";

const DistributeAssessmentPage = (): React.ReactElement => {
  const [search, setSearch] = useState("");
  const [sortProperty, setSortProperty] = React.useState("updatedAt");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("descending");

  const [grades, setGrades] = React.useState<Array<string>>([]);
  const [testTypes, setTestTypes] = React.useState<Array<string>>([]);
  const [countries, setCountries] = React.useState<Array<string>>([]);
  const [regions, setRegions] = React.useState<Array<string>>([]);

  const [filterOptions, setFilterOptions] = React.useState<FilterProp[]>([
    { label: "Grade", setState: setGrades, options: [] },
    { label: "Type", setState: setTestTypes, options: [] },
    { label: "Country", setState: setCountries, options: [] },
    { label: "Region", setState: setRegions, options: [] },
  ]);

  return (
    <VStack align="left">
      <FormHeader isCurrentPage={true} />
      <Text color="blue.300" textAlign="left" textStyle="header4">
        Choose an Assessment
      </Text>
      <Text color="grey.300" textStyle="paragraph">
        Please enter the name of the assessment you&apos;re looking for or use
        filter/sort options to find the assessment that suits your needs.
      </Text>
      <HStack>
        <SearchBar onSearch={setSearch} />
        <SortMenu
          initialSortOrder="descending"
          labels={["name", "grade", "type", "country", "region"]}
          onSortOrder={setSortOrder}
          onSortProperty={setSortProperty}
          properties={[
            "name",
            "grade",
            "assessmentType",
            "curriculumCountry",
            "curriculumRegion",
          ]}
        />
        <FilterMenu filterProps={filterOptions} />
      </HStack>
    </VStack>
  );
};

export default DistributeAssessmentPage;
