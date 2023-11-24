import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { GET_PUBLISHED_TESTS } from "../../../../APIClients/queries/TestQueries";
import {
  assessmentFilterOptions,
  filterAssessments,
  filterAssessmentsBySearch,
} from "../../../../utils/AssessmentUtils";
import { sortArray } from "../../../../utils/GeneralUtils";
import ErrorState from "../../../common/info/ErrorState";
import type { FilterProp } from "../../../common/table/FilterMenu";
import FilterMenu from "../../../common/table/FilterMenu";
import SearchableTablePage from "../../../common/table/SearchableTablePage";
import SearchBar from "../../../common/table/SearchBar";
import type { SortOrder } from "../../../common/table/SortMenu";
import SortMenu from "../../../common/table/SortMenu";
import useSortProperty from "../../../common/table/useSortProperty";
import AssessmentsTable from "../AssessmentsTable";
import DistributeAssessmentWrapper from "../DistributeAssessmentWrapper";

interface ChooseAssessmentProps {
  isEditDisabled: boolean;
  testId: string;
  setTestId: React.Dispatch<React.SetStateAction<string>>;
  setTestName: React.Dispatch<React.SetStateAction<string>>;
}

const SORT_PROPERTIES = [
  "name",
  "grade",
  "assessmentType",
  "curriculumCountry",
  "curriculumRegion",
] as const;

const ChooseAssessment = ({
  isEditDisabled,
  testId,
  setTestId,
  setTestName,
}: ChooseAssessmentProps): React.ReactElement => {
  const [isEmpty, setEmpty] = React.useState(true);

  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = useSortProperty(
    "name",
    SORT_PROPERTIES,
  );
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
    <DistributeAssessmentWrapper
      emptyState={<ErrorState />}
      error={error}
      isEmpty={isEmpty}
      isLoading={loading}
      subtitle="Please enter the name of the assessment you're looking for or use
        filter/sort options to find the assessment that suits your needs."
      title="Choose an Assessment"
    >
      <SearchableTablePage
        filterMenuComponent={<FilterMenu filterProps={filterOptions} />}
        nameOfTableItems="assessments"
        noResults={isEmpty}
        noResultsComponent={<ErrorState />}
        resultsLength={assessments.length}
        search={search}
        searchBarComponent={<SearchBar onSearch={setSearch} search={search} />}
        sortMenuComponent={
          <SortMenu
            initialSortOrder="ascending"
            labels={["name", "grade", "type", "country", "region"]}
            onSortOrder={setSortOrder}
            onSortProperty={setSortProperty}
            properties={SORT_PROPERTIES}
          />
        }
        tableComponent={
          <AssessmentsTable
            assessments={assessments}
            isDisabled={isEditDisabled}
            selectedTestId={testId}
            setTestId={setTestId}
            setTestName={setTestName}
          />
        }
      />
    </DistributeAssessmentWrapper>
  );
};

export default ChooseAssessment;
