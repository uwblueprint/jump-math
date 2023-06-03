/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

import { GET_PUBLISHED_TESTS } from "../../../../APIClients/queries/TestQueries";
import {
  assessmentFilterOptions,
  filterAssessments,
  filterAssessmentsBySearch,
} from "../../../../utils/AssessmentUtils";
import { sortArray } from "../../../../utils/GeneralUtils";
import ErrorState from "../../../common/info/ErrorState";
import LoadingState from "../../../common/info/LoadingState";
import type { FilterProp } from "../../../common/table/FilterMenu";
import FilterMenu from "../../../common/table/FilterMenu";
import SearchBar from "../../../common/table/SearchBar";
import type { SortOrder } from "../../../common/table/SortMenu";
import SortMenu from "../../../common/table/SortMenu";
import AssessmentsTable from "../AssessmentsTable";

interface ChooseAssessmentProps {
  testId: string;
  setTestId: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseAssessment = ({
  testId,
  setTestId,
}: ChooseAssessmentProps): React.ReactElement => {
  const [isEmpty, setEmpty] = React.useState(true);

  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState("name");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("ascending");

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

  const { loading, error, data } = useQuery(GET_PUBLISHED_TESTS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (fetchedData) => {
      const { gradeOptions, testTypeOptions, countryOptions, regionOptions } =
        assessmentFilterOptions(fetchedData.publishedTests);
      setFilterOptions((prev) => {
        return [
          {
            ...prev[0],
            options: gradeOptions,
          },
          {
            ...prev[1],
            options: testTypeOptions,
          },
          {
            ...prev[2],
            options: countryOptions,
          },
          {
            ...prev[3],
            options: regionOptions,
          },
        ];
      });
    },
  });

  const filteredAssessments = useMemo(() => {
    if (!data) return [];
    if (data.publishedTests.length) {
      setEmpty(false);
    }

    const filterProps = [grades, testTypes, countries, regions];
    return filterAssessments(data.publishedTests, filterProps);
  }, [data, grades, testTypes, countries, regions]);

  const searchedAssessments = useMemo(() => {
    return filterAssessmentsBySearch(filteredAssessments, search);
  }, [filteredAssessments, search]);

  const assessments = useMemo(() => {
    return sortArray(searchedAssessments, sortProperty, sortOrder);
  }, [searchedAssessments, sortProperty, sortOrder]);

  return (
    <VStack align="left" height="100%" spacing="2">
      <Text color="blue.300" textAlign="left" textStyle="header4">
        Choose an Assessment
      </Text>
      <Text color="grey.300" textStyle="paragraph">
        Please enter the name of the assessment you&apos;re looking for or use
        filter/sort options to find the assessment that suits your needs.
      </Text>
      <Box height="100%" pt="6">
        {loading ? (
          // TODO: fix loading center
          <LoadingState />
        ) : error || isEmpty ? (
          <ErrorState />
        ) : (
          <VStack spacing={6} width="100%">
            <HStack width="100%">
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
              {<FilterMenu filterProps={filterOptions} />}
            </HStack>
            {search && (
              <Text color="grey.300" fontSize="16px" width="100%">
                Showing {search.length} results for &quot;
                {search}&quot;
              </Text>
            )}
            <AssessmentsTable
              assessments={assessments}
              selectedTestId={testId}
              setTestId={setTestId}
            />
          </VStack>
        )}
      </Box>
    </VStack>
  );
};

export default ChooseAssessment;
