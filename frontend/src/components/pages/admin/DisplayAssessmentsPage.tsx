import React from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import GET_ALL_TESTS from "../../../APIClients/queries/TestQueries";
import gradeOptions from "../../../constants/CreateAssessmentConstants";
import {
  AssessmentProperties,
  Status,
  UseCase,
} from "../../../types/AssessmentTypes";
import { getFirstNumber, removeUnderscore } from "../../../utils/GeneralUtils";
import CreateAssessementButton from "../../assessments/assessment-creation/CreateAssessementButton";
import AssessmentsTab from "../../assessments/AssessmentsTab";
import AssessmentsTable from "../../assessments/AssessmentsTable";
import ErrorState from "../../common/ErrorState";
import LoadingState from "../../common/LoadingState";
import FilterMenu, { FilterProp } from "../../common/table/FilterMenu";
import SearchBar from "../../common/table/SearchBar";
import SortMenu from "../../common/table/SortMenu";

const getAssessments = (assessment: AssessmentProperties) => {
  return {
    id: assessment.id,
    status: assessment.status,
    name: assessment.name,
    grade: assessment.grade,
    assessmentType: assessment.assessmentType,
    curriculumCountry: assessment.curriculumCountry,
    curriculumRegion: assessment.curriculumRegion,
  };
};

const DisplayAssessmentsPage = (): React.ReactElement => {
  const unselectedTabColor = "#727278";
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState("name");
  const [sortOrder, setSortOrder] = React.useState("ascending");

  const [grades, setGrades] = React.useState<Array<string>>([]);
  const [testTypes, setTestTypes] = React.useState<Array<string>>([]);
  const [countries, setCountries] = React.useState<Array<string>>([]);
  const [regions, setRegions] = React.useState<Array<string>>([]);
  const [status, setStatus] = React.useState("");

  const countryOptions = [
    { value: "Canada", label: "Canada" },
    { value: "USA", label: "USA" },
  ];

  const regionOptions = [
    "Ottawa",
    "Calfornia",
    "Ontario",
    "Texas",
  ].map((value) => ({ value, label: value }));

  const testTypeOptions = [
    { value: UseCase.BEGINNING, label: "Beginning" },
    { value: UseCase.END, label: "End" },
  ];

  const setFilterProps: FilterProp[] = [
    { label: "Grade", setState: setGrades, options: gradeOptions },
    { label: "Type", setState: setTestTypes, options: testTypeOptions },
    { label: "Country", setState: setCountries, options: countryOptions },
    { label: "Region", setState: setRegions, options: regionOptions },
  ];

  const { loading, error, data } = useQuery(GET_ALL_TESTS, {
    fetchPolicy: "cache-and-network",
    variables: { status: ["PUBLISHED", "ARCHIVED", "DRAFT"] },
  });

  const filteredAssessements = React.useMemo(() => {
    if (!data) return [];
    let filteredTests: AssessmentProperties[] = data.tests as AssessmentProperties[];
    const filterProps = [grades, testTypes, countries, regions, status];

    filterProps.forEach((property, i) => {
      filteredTests = filteredTests.filter(
        (assessment: AssessmentProperties) => {
          const assessmentProperties = [
            assessment.grade,
            assessment.assessmentType,
            assessment.curriculumCountry,
            assessment.curriculumRegion,
            assessment.status,
          ];
          if (property.length === 0) {
            return true;
          }
          return property.includes(assessmentProperties[i]);
        },
      );
    });

    return filteredTests;
  }, [data, grades, testTypes, countries, regions, status]);

  const searchedAssessements = React.useMemo(() => {
    let filteredTests = filteredAssessements;
    if (search) {
      filteredTests = filteredTests.filter(
        (assessment: AssessmentProperties) =>
          assessment.name.toLowerCase().includes(search.toLowerCase()) ||
          removeUnderscore(assessment.grade)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          getFirstNumber(assessment.grade)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          removeUnderscore(assessment.grade)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          assessment.curriculumCountry
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          assessment.curriculumRegion
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          assessment.assessmentType
            .toLowerCase()
            .includes(search.toLowerCase()),
      );
    }
    return filteredTests?.map(getAssessments);
  }, [filteredAssessements, search]);

  const assessments = React.useMemo(() => {
    let sortedAssessments: AssessmentProperties[] = searchedAssessements as AssessmentProperties[];
    if (sortOrder === "descending") {
      sortedAssessments = sortedAssessments?.sort((a, b) =>
        a[sortProperty as keyof AssessmentProperties].toLowerCase() <
        b[sortProperty as keyof AssessmentProperties].toLowerCase()
          ? 1
          : -1,
      );
    } else if (sortOrder === "ascending") {
      sortedAssessments = sortedAssessments?.sort((a, b) =>
        a[sortProperty as keyof AssessmentProperties].toLowerCase() >
        b[sortProperty as keyof AssessmentProperties].toLowerCase()
          ? 1
          : -1,
      );
    }
    return sortedAssessments;
  }, [searchedAssessements, sortProperty, sortOrder]);

  const AssessmentTabPanels = [...Array(4)].map((i) => {
    return (
      <TabPanel key={i}>
        <AssessmentsTab
          key={i}
          assessmentsTable={<AssessmentsTable assessments={assessments} />}
          filterMenuComponent={<FilterMenu filterProps={setFilterProps} />}
          search={search}
          searchBarComponent={<SearchBar onSearch={setSearch} />}
          searchLength={assessments.length}
          sortMenuComponent={
            <SortMenu
              labels={["status", "name", "grade", "type", "country", "region"]}
              onSortOrder={setSortOrder}
              onSortProperty={setSortProperty}
              properties={[
                "status",
                "name",
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
      <Box>
        <HStack justifyContent="space-between">
          <Text
            color="blue.300"
            marginBottom="0.5em"
            style={{ textAlign: "left" }}
            textStyle="header4"
          >
            Assessments
          </Text>
          <CreateAssessementButton />
        </HStack>
      </Box>
      {loading && (
        <Center flex="1" margin="15%">
          <LoadingState />
        </Center>
      )}
      {error && (
        <Center flex="1" margin="15%">
          <ErrorState />
        </Center>
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
