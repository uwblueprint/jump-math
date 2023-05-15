import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import DistributeAssessmentsIllustration from "../../../assets/illustrations/distribute-assessments.svg";
import * as Routes from "../../../constants/Routes";
import { STATUSES, TestSessionStatus } from "../../../types/TestSessionTypes";
import { titleCase } from "../../../utils/GeneralUtils";
import {
  getSessionStatus,
  getSessionTargetDate,
} from "../../../utils/TestSessionUtils";
import TestSessionListItem from "../../assessments/TestSessionListItem";
import ErrorState from "../../common/ErrorState";
import LoadingState from "../../common/LoadingState";
import MessageContainer from "../../common/MessageContainer";
import Pagination from "../../common/table/Pagination";

const mockData: {
  id: string;
  accessCode: string;
  classroomName: string;
  stats?: {
    mean: number;
    median: number;
    completionRate: number;
    submissions: number;
  };
  startDate: Date;
  endDate: Date;
  testName: string;
}[] = [
  ...[...Array(20)].map((_, i) => ({
    id: i.toString(),
    accessCode: "086731",
    classroomName: "Counting and More",
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-08-31"),
    testName: "Number Recognition Assessment",
  })),
  {
    id: "20",
    accessCode: "086731",
    classroomName: "Counting and More 2",
    startDate: new Date("2023-04-01"),
    endDate: new Date("2023-06-31"),
    testName: "Number Recognition Assessment 2",
  },
  {
    id: "21",
    accessCode: "123456",
    classroomName: "Classroom Name",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-08-31"),
    testName: "Counting Assessment",
  },
  {
    id: "22",
    accessCode: "123456",
    classroomName: "Classroom Name 2",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-07-31"),
    testName: "Counting Assessment 2",
  },
  {
    id: "23",
    accessCode: "123456",
    classroomName: "Classroom Name",
    stats: {
      mean: 3.5,
      median: 3,
      completionRate: 30,
      submissions: 10,
    },
    startDate: new Date("2021-08-01"),
    endDate: new Date("2021-08-31"),
    testName: "Assessment Name",
  },
  {
    id: "24",
    accessCode: "123456",
    classroomName: "Classroom Name 2",
    stats: {
      mean: 97.3,
      median: 3,
      completionRate: 37.1,
      submissions: 4930,
    },
    startDate: new Date("2022-08-01"),
    endDate: new Date("2022-08-31"),
    testName: "Assessment Name 2",
  },
];

const DisplayAssessmentsPage = (): React.ReactElement => {
  const history = useHistory();

  const [currentTab, setCurrentTab] = React.useState<TestSessionStatus>(
    "active",
  );

  const [currentPage, setCurrentPage] = React.useState(1);

  // const data = useQuery(...);
  const {
    data,
    loading,
    error,
  }: { data: typeof mockData; loading: boolean; error: boolean } = {
    data: mockData,
    loading: false,
    error: false,
  };

  const dataWithStatus = useMemo(() => {
    const now = new Date();
    return data.map(({ startDate, endDate, ...session }) => ({
      ...session,
      status: getSessionStatus(startDate, endDate, now),
      targetDate: getSessionTargetDate(startDate, endDate, now),
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return dataWithStatus.filter((session) => session.status === currentTab);
  }, [dataWithStatus, currentTab]);

  const sortedData = useMemo(() => {
    const invertSort = currentTab === "past";
    return filteredData.sort((a, b) => {
      return (
        (invertSort ? -1 : 1) *
        (a.targetDate.getTime() - b.targetDate.getTime())
      );
    });
  }, [filteredData, currentTab]);

  const pageSize = 8;
  const numPages = Math.ceil(sortedData.length / pageSize);

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
          {!!data?.length && (
            <Button
              mt={10}
              onClick={() => history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE)}
              rightIcon={<PlusOutlineIcon />}
              variant="primary"
            >
              Add Assessment
            </Button>
          )}
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
      {!!data?.length && !loading && !error && (
        <>
          <Tabs mt={3}>
            <TabList>
              {STATUSES.map((status) => (
                <Tab key={status} onClick={() => setCurrentTab(status)}>
                  {titleCase(status)}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {STATUSES.map((status) => (
                <TabPanel key={status}>
                  {sortedData
                    .slice((currentPage - 1) * 8, currentPage * 8)
                    .map((session) => (
                      <TestSessionListItem key={session.id} {...session} />
                    ))}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          {sortedData.length > pageSize && (
            <Center>
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                pagesCount={numPages}
              />
            </Center>
          )}
        </>
      )}
      {!data?.length && !loading && !error && (
        <MessageContainer
          buttonIcon={<PlusOutlineIcon />}
          buttonRoute={Routes.DISTRIBUTE_ASSESSMENT_PAGE}
          buttonText="Create new assessment"
          image={DistributeAssessmentsIllustration}
          paragraphs={[
            "Click on the button below to create your first assessment.",
          ]}
          subtitle="You currently have no assessments."
          textColor="blue.300"
        />
      )}
    </>
  );
};

export default DisplayAssessmentsPage;
