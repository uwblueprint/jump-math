import React from "react";
import { useQuery } from "@apollo/client";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { GET_ALL_TESTS } from "../../../APIClients/queries/TestQueries";
import * as Routes from "../../../constants/Routes";
import { Status } from "../../../types/AssessmentTypes";
import {
  assessmentFilterOptions,
  filterAssessments,
  filterAssessmentsBySearch,
} from "../../../utils/AssessmentUtils";
import { sortArray } from "../../../utils/GeneralUtils";
import AssessmentsTable from "../../admin/view-assessments/AssessmentsTable";
import HeaderWithButton from "../../common/HeaderWithButton";
import EmptyTestsMessage from "../../common/info/messages/EmptyTestsMessage";
import QueryStateHandler from "../../common/QueryStateHandler";
import type { FilterProp } from "../../common/table/FilterMenu";
import FilterMenu from "../../common/table/FilterMenu";
import SearchableTablePage from "../../common/table/SearchableTablePage";
import SearchBar from "../../common/table/SearchBar";
import SortMenu, { type SortOrder } from "../../common/table/SortMenu";
import useSortProperty from "../../common/table/useSortProperty";

const STATUS_ORDER = ["", Status.DRAFT, Status.PUBLISHED, Status.ARCHIVED];
const SORT_PROPERTIES = [
  "updatedAt",
  "name",
  "status",
  "grade",
  "assessmentType",
  "curriculumCountry",
  "curriculumRegion",
] as const;

const DisplayAssessmentsPage = (): React.ReactElement => {
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = useSortProperty(
    "updatedAt",
    SORT_PROPERTIES,
  );
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("descending");

  const [grades, setGrades] = React.useState<Array<string>>([]);
  const [testTypes, setTestTypes] = React.useState<Array<string>>([]);
  const [countries, setCountries] = React.useState<Array<string>>([]);
  const [regions, setRegions] = React.useState<Array<string>>([]);
  const [status, setStatus] = React.useState("");

  const [isEmpty, setEmpty] = React.useState(true);

  const [filterOptions, setFilterOptions] = React.useState<FilterProp[]>([
    { label: "Grade", setState: setGrades, options: [] },
    { label: "Type", setState: setTestTypes, options: [] },
    { label: "Country", setState: setCountries, options: [] },
    { label: "Region", setState: setRegions, options: [] },
  ]);

  const { loading, error, data } = useQuery(GET_ALL_TESTS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (fetchedData) => {
      const { gradeOptions, testTypeOptions, countryOptions, regionOptions } =
        assessmentFilterOptions(fetchedData.tests);

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

  const filteredAssessments = React.useMemo(() => {
    if (!data) return [];
    if (data.tests.length) {
      setEmpty(false);
    }

    const filterProps = [grades, testTypes, countries, regions, status];
    return filterAssessments(data.tests, filterProps);
  }, [data, grades, testTypes, countries, regions, status]);

  const searchedAssessments = React.useMemo(() => {
    return filterAssessmentsBySearch(filteredAssessments, search);
  }, [filteredAssessments, search]);

  const assessments = React.useMemo(() => {
    return sortArray(searchedAssessments, sortProperty, sortOrder);
  }, [searchedAssessments, sortProperty, sortOrder]);

  const AssessmentTabPanels = STATUS_ORDER.map((panelStatus) => {
    return (
      <TabPanel key={panelStatus} padding="0">
        <SearchableTablePage
          filterMenuComponent={<FilterMenu filterProps={filterOptions} />}
          nameOfTableItems="assessments"
          noResults={isEmpty}
          noResultsComponent={<EmptyTestsMessage />}
          search={search}
          searchBarComponent={<SearchBar onSearch={setSearch} />}
          searchLength={assessments.length}
          sortMenuComponent={
            <SortMenu
              initialSortOrder="descending"
              labels={[
                "last updated",
                "name",
                "status",
                "grade",
                "type",
                "country",
                "region",
              ]}
              onSortOrder={setSortOrder}
              onSortProperty={setSortProperty}
              properties={SORT_PROPERTIES}
            />
          }
          tableComponent={<AssessmentsTable assessments={assessments} />}
        />
      </TabPanel>
    );
  });

  return (
    <>
      <HeaderWithButton
        buttonText="Create Assessment"
        targetRoute={Routes.ASSESSMENT_CREATOR_PAGE}
        title="Assessments"
      />
      <QueryStateHandler error={error} loading={loading}>
        <Tabs
          marginTop={3}
          onChange={(index) => setStatus(STATUS_ORDER[index])}
        >
          <TabList>
            <Tab>All</Tab>
            <Tab>Drafts</Tab>
            <Tab>Published</Tab>
            <Tab>Archived</Tab>
          </TabList>
          <TabPanels>{AssessmentTabPanels}</TabPanels>
        </Tabs>
      </QueryStateHandler>
    </>
  );
};

export default DisplayAssessmentsPage;
