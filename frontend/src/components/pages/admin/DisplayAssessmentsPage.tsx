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

import { Grade } from "../../../APIClients/types/UserClientTypes";
import {
  AssessmentTypes,
  Status,
  UseCase,
} from "../../../types/AssessmentTypes";
import CreateAssessementButton from "../../assessments/assessment-creation/CreateAssessementButton";
import AssessmentsTable from "../../assessments/AssessmentsTable";
import EmptyState from "../../common/EmptyState";
import FilterMenu from "../../common/table/FilterMenu";
import SearchBar from "../../common/table/SearchBar";
import SortMenu from "../../common/table/SortMenu";

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
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_5,
    type: UseCase.BEGINNING,
    country: "Canada",
    region: "Ontario",
  },
  {
    status: Status.PUBLISHED,
    name: "Grade 7 California Pre-Term Assessment 2016",
    grade: Grade.GRADE_7,
    type: UseCase.BEGINNING,
    country: "USA",
    region: "California",
  },
  {
    status: Status.ARCHIVED,
    name: "Grade 4 Ottawa Pre-Term Assessment 2018",
    grade: Grade.GRADE_4,
    type: UseCase.BEGINNING,
    country: "Canada",
    region: "Ottawa",
  },
  {
    status: Status.PUBLISHED,
    name: "Grade 2 Texas Pre-Term Assessment 2012",
    grade: Grade.GRADE_2,
    type: UseCase.BEGINNING,
    country: "USA",
    region: "Texas",
  },
  {
    status: Status.DRAFT,
    name: "Grade 4 Quebec Post-Term Assessment 2020",
    grade: Grade.GRADE_4,
    type: UseCase.BEGINNING,
    country: "Canada",
    region: "Quebec",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_7,
    type: UseCase.BEGINNING,
    country: "USA",
    region: "California",
  },
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_5,
    type: UseCase.BEGINNING,
    country: "Canada",
    region: "Ontario",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_7,
    type: UseCase.BEGINNING,
    country: "USA",
    region: "California",
  },
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_5,
    type: UseCase.BEGINNING,
    country: "Canada",
    region: "Ontario",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_7,
    type: UseCase.END,
    country: "USA",
    region: "California",
  },
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_5,
    type: UseCase.END,
    country: "Canada",
    region: "Ontario",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_7,
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
            <Tab color={unselectedColor} onClick={() => setSearch("")}>
              All
            </Tab>
            <Tab color={unselectedColor} onClick={() => setSearch("Draft")}>
              Drafts
            </Tab>
            <Tab color={unselectedColor} onClick={() => setSearch("Published")}>
              Published
            </Tab>
            <Tab color={unselectedColor} onClick={() => setSearch("Archived")}>
              Archived
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
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
                  <FilterMenu />
                </HStack>
                {search && (
                  <Text color="grey.300" fontSize="16px" width="100%">
                    Showing {sampleAssessments.length} results for &quot;
                    {search}&quot;
                  </Text>
                )}
                {assessments.length !== 0 ? (
                  <AssessmentsTable assessments={assessments} />
                ) : (
                  <EmptyState items="assessments" />
                )}
              </VStack>
            </TabPanel>
            <TabPanel>
              {assessments.length !== 0 ? (
                <AssessmentsTable assessments={assessments} />
              ) : (
                <EmptyState items="assessments" />
              )}
            </TabPanel>
            <TabPanel>
              {assessments.length !== 0 ? (
                <AssessmentsTable assessments={assessments} />
              ) : (
                <EmptyState items="assessments" />
              )}
            </TabPanel>
            <TabPanel>
              {assessments.length !== 0 ? (
                <AssessmentsTable assessments={assessments} />
              ) : (
                <EmptyState items="assessments" />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* )} */}
    </>
  );
};

export default DisplayAssessmentsPage;
