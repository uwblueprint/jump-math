import React from "react";
import {
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  VStack,
  HStack,
} from "@chakra-ui/react";
import CreateAssessementButton from "../../assessment-creation/CreateAssessementButton";
import { AssessmentTypes } from "../../../types/AssessmentTypes";
import SortMenu from "../../common/SortMenu";
import FilterMenu, {
  FilterMenuProp,
  Option,
} from "../../assessment-creation/FilterMenu";
import SearchBar from "../../common/SearchBar";
import AssessmentsTable from "../../assessment-creation/AssessmentsTable";

// const ErrorState = (): React.ReactElement => (
//   <VStack spacing={6} textAlign="center">
//     <AlertIcon />
//     <Text textStyle="paragraph" color="blue.300">
//       The data has not loaded properly. Please reload the page or contact Jump
//       Math.
//     </Text>
//   </VStack>
// );

const getAssessments = (assessment: AssessmentTypes) => {
  return {
    status: assessment.status,
    name: assessment.name,
    grade: assessment.grade,
    type: assessment.type,
    country: assessment.country,
    region: assessment.region,
  };
};

const sampleAssessments: AssessmentTypes[] = [
  {
    status: "DRAFT",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "BEGINNING",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "PUBLISHED",
    name: "Grade 7 California Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "BEGINNING",
    country: "USA",
    region: "California",
  },
  {
    status: "ARCHIVED",
    name: "Grade 4 Ottawa Pre-Term Assessment 2018",
    grade: "Grade 5",
    type: "BEGINNING",
    country: "Canada",
    region: "Ottawa",
  },
  {
    status: "PUBLISHED",
    name: "Grade 2 Texas Pre-Term Assessment 2012",
    grade: "Grade 7",
    type: "BEGINNING",
    country: "USA",
    region: "Texas",
  },
  {
    status: "DRAFT",
    name: "Grade 4 Quebec Post-Term Assessment 2020",
    grade: "Grade 5",
    type: "BEGINNING",
    country: "Canada",
    region: "Quebec",
  },
  {
    status: "DRAFT",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "BEGINNING",
    country: "USA",
    region: "California",
  },
  {
    status: "DRAFT",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "BEGINNING",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "DRAFT",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "BEGINNING",
    country: "USA",
    region: "California",
  },
  {
    status: "DRAFT",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "BEGINNING",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "DRAFT",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "BEGINNING",
    country: "USA",
    region: "California",
  },
  {
    status: "DRAFT",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "BEGINNING",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "DRAFT",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "BEGINNING",
    country: "USA",
    region: "California",
  },
];

const DisplayAssessmentsPage = (): React.ReactElement => {
  const unselectedColor = "#727278";
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState("name");
  const [sortOrder, setSortOrder] = React.useState("ascending");
  const [types, setTypes] = React.useState<Array<string>>([]);
  const [countries, setCountries] = React.useState<Array<string>>([]);
  const [regions, setRegions] = React.useState<Array<string>>([]);
  const [status, setStatus] = React.useState("");

  const typeOptions = [
    { value: "Beginning", label: "Beginning" },
    { value: "End", label: "End" },
  ];

  const countryOptions = [
    { value: "Canada", label: "Canada" },
    { value: "USA", label: "USA" },
  ] as Option[];

  const regionOptions = [
    { value: "Ottawa", label: "Ottawa" },
    { value: "California", label: "California" },
    { value: "Ontario", label: "Ontario" },
    { value: "Texas", label: "Texas" },
  ];

  const setCountryProps: FilterMenuProp[] = [
    { label: "Type", setState: setTypes, options: typeOptions },
    { label: "Country", setState: setCountries, options: countryOptions },
    { label: "Region", setState: setRegions, options: regionOptions },
  ];

  // const { loading, error, data } = useQuery(GET_USERS_BY_ROLE, {
  //   fetchPolicy: "cache-and-network",
  //   variables: { role: "Admin" },
  // });

  const searchedAssessements = React.useMemo(() => {
    let filteredTests = sampleAssessments;
    if (search) {
      filteredTests = filteredTests.filter(
        (assessment: AssessmentTypes) =>
          assessment.grade.toLowerCase().includes(search.toLowerCase()) ||
          assessment.country.toLowerCase().includes(search.toLowerCase()) ||
          assessment.region.toLowerCase().includes(search.toLowerCase()) ||
          assessment.type.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return filteredTests?.map(getAssessments);
  }, [search]);

  const filteredAssessements = React.useMemo(() => {
    let filteredTests: AssessmentTypes[] = searchedAssessements as AssessmentTypes[];

    if (types.length !== 0) {
      filteredTests = filteredTests.filter((assessment: AssessmentTypes) =>
        types.includes(assessment.type),
      );
    }

    if (countries.length !== 0) {
      filteredTests = filteredTests.filter((assessment: AssessmentTypes) =>
        countries.includes(assessment.country),
      );
    }

    if (regions.length !== 0) {
      filteredTests = filteredTests.filter((assessment: AssessmentTypes) =>
        regions.includes(assessment.region),
      );
    }

    if (status) {
      filteredTests = filteredTests.filter((assessment: AssessmentTypes) =>
        status.includes(assessment.status),
      );
    }

    return filteredTests;
  }, [searchedAssessements, countries, regions, types, status]);

  const assessments = React.useMemo(() => {
    let sortedAssessments: AssessmentTypes[] = filteredAssessements as AssessmentTypes[];
    if (sortOrder === "descending") {
      sortedAssessments = sortedAssessments?.sort((a, b) =>
        a[sortProperty as keyof AssessmentTypes].toLowerCase() <
        b[sortProperty as keyof AssessmentTypes].toLowerCase()
          ? 1
          : -1,
      );
    } else if (sortOrder === "ascending") {
      sortedAssessments = sortedAssessments?.sort((a, b) =>
        a[sortProperty as keyof AssessmentTypes].toLowerCase() >
        b[sortProperty as keyof AssessmentTypes].toLowerCase()
          ? 1
          : -1,
      );
    }
    return sortedAssessments;
  }, [filteredAssessements, sortOrder, sortProperty]);
  const FullTabPanel = (
    <TabPanel>
      <VStack pt={4} spacing={6}>
        <HStack width="100%">
          <SearchBar onSearch={setSearch} />
          <SortMenu
            properties={[
              "status",
              "name",
              "grade",
              "type",
              "country",
              "region",
            ]}
            onSortOrder={setSortOrder}
            onSortProperty={setSortProperty}
          />
          <FilterMenu filterProps={setCountryProps} />
        </HStack>
        {search && (
          <Text fontSize="16px" color="grey.300" width="100%">
            Showing {sampleAssessments.length} results for &quot;
            {search}&quot;
          </Text>
        )}
        <AssessmentsTable assessments={assessments} />
      </VStack>
    </TabPanel>
  );
  return (
    <>
      <Box>
        <HStack justifyContent="space-between">
          <Text
            textStyle="header4"
            color="blue.300"
            style={{ textAlign: "left" }}
            marginBottom="0.5em"
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
            <Tab onClick={() => setStatus("")} color={unselectedColor}>
              All
            </Tab>
            <Tab onClick={() => setStatus("DRAFT")} color={unselectedColor}>
              Drafts
            </Tab>
            <Tab onClick={() => setStatus("PUBLISHED")} color={unselectedColor}>
              Published
            </Tab>
            <Tab onClick={() => setStatus("ARCHIVED")} color={unselectedColor}>
              Archived
            </Tab>
          </TabList>
          <TabPanels>
            {FullTabPanel}
            {FullTabPanel}
            {FullTabPanel}
            {FullTabPanel}
          </TabPanels>
        </Tabs>
      </Box>
      {/* )} */}
    </>
  );
};

export default DisplayAssessmentsPage;
