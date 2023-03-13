import React from "react";
import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  AssessmentProperties,
  Status,
  UseCase,
} from "../../../types/AssessmentTypes";
import CreateAssessementButton from "../../assessments/assessment-creation/CreateAssessementButton";
import AssessmentsTable from "../../assessments/AssessmentsTable";
import FilterMenu, { FilterProp } from "../../common/table/FilterMenu";
import SearchBar from "../../common/table/SearchBar";
import SortMenu from "../../common/table/SortMenu";

const getAssessments = (assessment: AssessmentProperties) => {
  return {
    status: assessment.status,
    name: assessment.name,
    grade: assessment.grade,
    type: assessment.type,
    country: assessment.country,
    region: assessment.region,
  };
};

const sampleAssessments: AssessmentProperties[] = [
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: UseCase.BEGINNING,
    country: "Canada",
    region: "Ontario",
  },
  {
    status: Status.PUBLISHED,
    name: "Grade 7 California Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: UseCase.BEGINNING,
    country: "USA",
    region: "California",
  },
  {
    status: Status.ARCHIVED,
    name: "Grade 4 Ottawa Pre-Term Assessment 2018",
    grade: "Grade 5",
    type: UseCase.BEGINNING,
    country: "Canada",
    region: "Ottawa",
  },
  {
    status: Status.PUBLISHED,
    name: "Grade 2 Texas Pre-Term Assessment 2012",
    grade: "Grade 7",
    type: UseCase.BEGINNING,
    country: "USA",
    region: "Texas",
  },
  {
    status: Status.DRAFT,
    name: "Grade 4 Quebec Post-Term Assessment 2020",
    grade: "Grade 5",
    type: UseCase.BEGINNING,
    country: "Canada",
    region: "Quebec",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: UseCase.BEGINNING,
    country: "USA",
    region: "California",
  },
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: UseCase.BEGINNING,
    country: "Canada",
    region: "Ontario",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: UseCase.BEGINNING,
    country: "USA",
    region: "California",
  },
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: UseCase.BEGINNING,
    country: "Canada",
    region: "Ontario",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: UseCase.END,
    country: "USA",
    region: "California",
  },
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: UseCase.END,
    country: "Canada",
    region: "Ontario",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: UseCase.END,
    country: "USA",
    region: "California",
  },
];

const DisplayAssessmentsPage = (): React.ReactElement => {
  const unselectedColor = "#727278";
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
  const gradeOptions = [
    "K",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
  ].map((value) => ({ value, label: value === "K" ? "Kindergarten" : value }));

  const setFilterProps: FilterProp[] = [
    { label: "Grade", setState: setGrades, options: gradeOptions },
    { label: "Type", setState: setTestTypes, options: testTypeOptions },
    { label: "Country", setState: setCountries, options: countryOptions },
    { label: "Region", setState: setRegions, options: regionOptions },
  ];

  // const { loading, error, data } = useQuery(GET_USERS_BY_ROLE, {
  //   fetchPolicy: "cache-and-network",
  //   variables: { role: "Admin" },
  // });

  const filteredAssessements = React.useMemo(() => {
    let filteredTests: AssessmentProperties[] = sampleAssessments as AssessmentProperties[];
    const filterProps = [grades, testTypes, countries, regions, status];

    filterProps.forEach((property, i) => {
      filteredTests = filteredTests.filter(
        (assessment: AssessmentProperties) => {
          const assessmentProperties = [
            assessment.grade,
            assessment.type,
            assessment.country,
            assessment.region,
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
  }, [grades, testTypes, countries, regions, status]);

  const searchedAssessements = React.useMemo(() => {
    let searchedTests = filteredAssessements;
    if (search) {
      searchedTests = searchedTests.filter(
        (assessment: AssessmentProperties) =>
          assessment.grade.toLowerCase().includes(search.toLowerCase()) ||
          assessment.country.toLowerCase().includes(search.toLowerCase()) ||
          assessment.region.toLowerCase().includes(search.toLowerCase()) ||
          assessment.type.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return searchedTests?.map(getAssessments);
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

  const TabPanelRows = [...Array(4)].map((i) => {
    return (
      <TabPanel key={i}>
        <VStack pt={4} spacing={6}>
          <HStack width="100%">
            <SearchBar onSearch={setSearch} />
            <SortMenu
              onSortOrder={setSortOrder}
              onSortProperty={setSortProperty}
              properties={[
                "status",
                "name",
                "grade",
                "type",
                "country",
                "region",
              ]}
            />
            <FilterMenu filterProps={setFilterProps} />
          </HStack>
          {search && (
            <Text color="grey.300" fontSize="16px" width="100%">
              Showing {sampleAssessments.length} results for &quot;
              {search}&quot;
            </Text>
          )}
          <AssessmentsTable assessments={assessments} />
        </VStack>
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
      {/* {loading && (
        <Center margin="15%" flex="1">
          <LoadingState />
        </Center>
      )}
      {error && (
        <Center margin="15%" flex="1">
          <ErrorState />
        </Center>
      )} */}
      {/* {sampleAssessments && !error && !loading && ( */}
      <Box flex="1">
        <Tabs marginTop={3}>
          <TabList>
            <Tab color={unselectedColor} onClick={() => setStatus("")}>
              All
            </Tab>
            <Tab
              color={unselectedColor}
              onClick={() => setStatus(Status.DRAFT)}
            >
              Drafts
            </Tab>
            <Tab
              color={unselectedColor}
              onClick={() => setStatus(Status.PUBLISHED)}
            >
              Published
            </Tab>
            <Tab
              color={unselectedColor}
              onClick={() => setStatus(Status.ARCHIVED)}
            >
              Archived
            </Tab>
          </TabList>
          <TabPanels>{TabPanelRows}</TabPanels>
        </Tabs>
      </Box>
      {/* )} */}
    </>
  );
};

export default DisplayAssessmentsPage;
