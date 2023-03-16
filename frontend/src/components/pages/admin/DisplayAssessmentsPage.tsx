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
  VStack,
} from "@chakra-ui/react";

import { GET_ALL_TESTS } from "../../../APIClients/queries/TestQueries";
import { Grade } from "../../../APIClients/types/UserClientTypes";
import {
  AssessmentTypes,
  Status,
  UseCase,
} from "../../../types/AssessmentTypes";
import CreateAssessementButton from "../../assessments/assessment-creation/CreateAssessementButton";
import AssessmentsTable from "../../assessments/AssessmentsTable";
import ErrorState from "../../common/ErrorState";
import LoadingState from "../../common/LoadingState";
import FilterMenu from "../../common/table/FilterMenu";
import SearchBar from "../../common/table/SearchBar";
import SortMenu from "../../common/table/SortMenu";

const getAssessments = (assessment: AssessmentTypes) => {
  return {
    status: assessment.status,
    name: assessment.name,
    grade: assessment.grade,
    assessmentType: assessment.assessmentType,
    curriculumCountry: assessment.curriculumCountry,
    curriculumRegion: assessment.curriculumRegion,
  };
};

const sampleAssessments: AssessmentTypes[] = [
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_5,
    assessmentType: UseCase.BEGINNING,
    curriculumCountry: "Canada",
    curriculumRegion: "Ontario",
  },
  {
    status: Status.PUBLISHED,
    name: "Grade 7 California Pre-Term Assessment 2016",
    grade: Grade.GRADE_7,
    assessmentType: UseCase.BEGINNING,
    curriculumCountry: "USA",
    curriculumRegion: "California",
  },
  {
    status: Status.ARCHIVED,
    name: "Grade 4 Ottawa Pre-Term Assessment 2018",
    grade: Grade.GRADE_4,
    assessmentType: UseCase.BEGINNING,
    curriculumCountry: "Canada",
    curriculumRegion: "Ottawa",
  },
  {
    status: Status.PUBLISHED,
    name: "Grade 2 Texas Pre-Term Assessment 2012",
    grade: Grade.GRADE_2,
    assessmentType: UseCase.BEGINNING,
    curriculumCountry: "USA",
    curriculumRegion: "Texas",
  },
  {
    status: Status.DRAFT,
    name: "Grade 4 Quebec Post-Term Assessment 2020",
    grade: Grade.GRADE_4,
    assessmentType: UseCase.BEGINNING,
    curriculumCountry: "Canada",
    curriculumRegion: "Quebec",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_7,
    assessmentType: UseCase.BEGINNING,
    curriculumCountry: "USA",
    curriculumRegion: "California",
  },
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_5,
    assessmentType: UseCase.BEGINNING,
    curriculumCountry: "Canada",
    curriculumRegion: "Ontario",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_7,
    assessmentType: UseCase.BEGINNING,
    curriculumCountry: "USA",
    curriculumRegion: "California",
  },
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_5,
    assessmentType: UseCase.BEGINNING,
    curriculumCountry: "Canada",
    curriculumRegion: "Ontario",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_7,
    assessmentType: UseCase.END,
    curriculumCountry: "USA",
    curriculumRegion: "California",
  },
  {
    status: Status.DRAFT,
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_5,
    assessmentType: UseCase.END,
    curriculumCountry: "Canada",
    curriculumRegion: "Ontario",
  },
  {
    status: Status.DRAFT,
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: Grade.GRADE_7,
    assessmentType: UseCase.END,
    curriculumCountry: "USA",
    curriculumRegion: "California",
  },
];

const DisplayAssessmentsPage = (): React.ReactElement => {
  const unselectedColor = "#727278";
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState("name");
  const [sortOrder, setSortOrder] = React.useState("ascending");

  const { loading, error, data } = useQuery(GET_ALL_TESTS, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Admin" },
  });

  const searchedAssessements = React.useMemo(() => {
    if (!data) return [];
    let filteredTests = data.tests;

    if (search) {
      filteredTests = filteredTests.filter(
        (assessment: AssessmentTypes) =>
          assessment.grade.toLowerCase().includes(search.toLowerCase()) ||
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
  }, [data, search]);

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
      {data && !error && !loading && (
        <Box flex="1">
          <Tabs marginTop={3}>
            <TabList>
              <Tab color={unselectedColor} onClick={() => setSearch("")}>
                All
              </Tab>
              <Tab color={unselectedColor} onClick={() => setSearch("Draft")}>
                Drafts
              </Tab>
              <Tab
                color={unselectedColor}
                onClick={() => setSearch("Published")}
              >
                Published
              </Tab>
              <Tab
                color={unselectedColor}
                onClick={() => setSearch("Archived")}
              >
                Archived
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack pt={4} spacing={6}>
                  <HStack width="100%">
                    <SearchBar onSearch={setSearch} />
                    <SortMenu
                      labels={[
                        "status",
                        "name",
                        "grade",
                        "type",
                        "country",
                        "region",
                      ]}
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
                    <FilterMenu />
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
              <TabPanel>
                <AssessmentsTable assessments={assessments} />
              </TabPanel>
              <TabPanel>
                <AssessmentsTable assessments={assessments} />
              </TabPanel>
              <TabPanel>
                <AssessmentsTable assessments={assessments} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );
};

export default DisplayAssessmentsPage;
