import React from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { GET_ALL_TESTS } from "../../../APIClients/queries/TestQueries";
import * as Routes from "../../../constants/Routes";
import { Status } from "../../../types/AssessmentTypes";
import {
  assessmentFilterOptions,
  filterAssessments,
  filterAssessmentsBySearch,
} from "../../../utils/AssessmentUtils";
import { sortArray } from "../../../utils/GeneralUtils";
import AssessmentsTab from "../../assessments/AssessmentsTab";
import AssessmentsTable from "../../assessments/AssessmentsTable";
import ErrorState from "../../common/ErrorState";
import HeaderWithButton from "../../common/HeaderWithButton";
import LoadingState from "../../common/LoadingState";
import type { FilterProp } from "../../common/table/FilterMenu";
import FilterMenu from "../../common/table/FilterMenu";
import SearchBar from "../../common/table/SearchBar";
import type { SortOrder } from "../../common/table/SortMenu";
import SortMenu from "../../common/table/SortMenu";

const DisplayAssessmentsPage = (): React.ReactElement => {
  const unselectedTabColor = "#727278";
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState("updatedAt");
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
    onCompleted: () => {
      const { gradeOptions, testTypeOptions, countryOptions, regionOptions } =
        assessmentFilterOptions(data.tests);

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

  const AssessmentTabPanels = [...Array(4)].map((i) => {
    return (
      <TabPanel key={i} padding="0">
        <AssessmentsTab
          key={i}
          assessmentsTable={<AssessmentsTable assessments={assessments} />}
          filterMenuComponent={<FilterMenu filterProps={filterOptions} />}
          noResults={isEmpty}
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
              properties={[
                "updatedAt",
                "name",
                "status",
                "grade",
                "assessmentType",
                "curriculumCountry",
                "curriculumRegion",
              ]}
            />
          }
        />
      </TabPanel>
    );
  });

  return (
    <>
      <HeaderWithButton
        buttonText="Create Assessment"
        targetRoute={Routes.ASSESSMENT_EDITOR_PAGE}
        title="Assessments"
      />
      {loading && (
        <Center flex="1" margin="15%">
          <LoadingState />
        </Center>
      )}
      {error && (
        <Box height="100%" mt={10}>
          <ErrorState />
        </Box>
      )}
      {assessments && !error && !loading && (
        <Box flex="1">
          <Tabs marginTop={3}>
            <TabList>
              <Tab color={unselectedTabColor} onClick={() => setStatus("")}>
                All
              </Tab>
              <Tab
                color={unselectedTabColor}
                onClick={() => setStatus(Status.DRAFT)}
              >
                Drafts
              </Tab>
              <Tab
                color={unselectedTabColor}
                onClick={() => setStatus(Status.PUBLISHED)}
              >
                Published
              </Tab>
              <Tab
                color={unselectedTabColor}
                onClick={() => setStatus(Status.ARCHIVED)}
              >
                Archived
              </Tab>
            </TabList>
            <TabPanels>{AssessmentTabPanels}</TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );
};

export default DisplayAssessmentsPage;
