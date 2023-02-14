import React from "react";
import {
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";
import CreateAssessementButton from "../../assessment-creation/CreateAssessementButton";
import AssessmentTable from "../../assessment-creation/AssessmentsTable";
import { AssessmentTypes } from "../../../types/AssessmentTypes";
import SortMenu from "../../common/SortMenu";
import FilterMenu from "../../assessment-creation/FilterMenu";
import SearchBar from "../../common/SearchBar";

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
    status: "Draft",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "Published",
    name: "Grade 7 California Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
  {
    status: "Archived",
    name: "Grade 4 Ottawa Pre-Term Assessment 2018",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ottawa",
  },
  {
    status: "Published",
    name: "Grade 2 Texas Pre-Term Assessment 2012",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "Texas",
  },
  {
    status: "Draft",
    name: "Grade 4 Quebec Post-Term Assessment 2020",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Quebec",
  },
  {
    status: "Draft",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
  {
    status: "Draft",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "Draft",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
  {
    status: "Draft",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "Draft",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
  {
    status: "Draft",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "Draft",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
];

const DisplayAssessmentsPage = (): React.ReactElement => {
  const unselectedColor = "#727278";
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState("name");
  const [sortOrder, setSortOrder] = React.useState("ascending");

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

  const assessments = React.useMemo(() => {
    let sortedAssessments: AssessmentTypes[] = searchedAssessements as AssessmentTypes[];
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
  }, [searchedAssessements, sortProperty, sortOrder]);

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
            <Tab onClick={() => setSearch("")} color={unselectedColor}>
              All
            </Tab>
            <Tab onClick={() => setSearch("Draft")} color={unselectedColor}>
              Drafts
            </Tab>
            <Tab onClick={() => setSearch("Published")} color={unselectedColor}>
              Published
            </Tab>
            <Tab onClick={() => setSearch("Archived")} color={unselectedColor}>
              Archived
            </Tab>
          </TabList>
          <TabPanels>
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
                  <FilterMenu />
                </HStack>
                {search && (
                  <Text fontSize="16px" color="grey.300" width="100%">
                    Showing {sampleAssessments.length} results for &quot;
                    {search}&quot;
                  </Text>
                )}
                <AssessmentTable assessments={assessments} />
              </VStack>
            </TabPanel>
            <TabPanel>
              <AssessmentTable assessments={assessments} />
            </TabPanel>
            <TabPanel>
              <AssessmentTable assessments={assessments} />
            </TabPanel>
            <TabPanel>
              <AssessmentTable assessments={assessments} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* )} */}
    </>
  );
};

export default DisplayAssessmentsPage;
