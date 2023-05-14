import React, { useMemo } from "react";
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

import { titleCase } from "../../../utils/GeneralUtils";
import TestSessionListItem, {
  STATUSES,
  TestSessionStatus,
} from "../../assessments/TestSessionListItem";
import ErrorState from "../../common/ErrorState";
import LoadingState from "../../common/LoadingState";
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
  testSessionName: string;
}[] = [
  ...[...Array(20)].map((_, i) => ({
    id: i.toString(),
    accessCode: "086 731",
    classroomName: "Counting and More",
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-08-31"),
    testSessionName: "Number Recognition Assessment",
  })),
  {
    id: "20",
    accessCode: "086 731",
    classroomName: "Counting and More 2",
    startDate: new Date("2023-04-01"),
    endDate: new Date("2023-06-31"),
    testSessionName: "Number Recognition Assessment 2",
  },
  {
    id: "21",
    accessCode: "123 456",
    classroomName: "Classroom Name",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-08-31"),
    testSessionName: "Counting Assessment",
  },
  {
    id: "22",
    accessCode: "123 456",
    classroomName: "Classroom Name 2",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-07-31"),
    testSessionName: "Counting Assessment 2",
  },
  {
    id: "23",
    accessCode: "123 456",
    classroomName: "Classroom Name",
    stats: {
      mean: 3.5,
      median: 3,
      completionRate: 0.5,
      submissions: 10,
    },
    startDate: new Date("2021-08-01"),
    endDate: new Date("2021-08-31"),
    testSessionName: "Assessment Name",
  },
  {
    id: "24",
    accessCode: "123 456",
    classroomName: "Classroom Name 2",
    stats: {
      mean: 3.5,
      median: 3,
      completionRate: 0.5,
      submissions: 10,
    },
    startDate: new Date("2022-08-01"),
    endDate: new Date("2022-08-31"),
    testSessionName: "Assessment Name 2",
  },
];

const DistributeAssessmentPage = (): React.ReactElement => {
  const [currentTab, setCurrentTab] = React.useState<TestSessionStatus>(
    "active",
  );

  const [currentPage, setCurrentPage] = React.useState(1);

  // const data = useQuery(...);
  const [loading, error] = [false, false];
  const data = mockData;

  const now = new Date();
  const dataWithStatus = mockData.map(
    (session) => {
      const status: TestSessionStatus = (() => {
        if (session.endDate < now) return "past";
        if (session.startDate > now) return "upcoming";
        return "active";
      })();

      const targetDate =
        status === "active" ? session.endDate : session.startDate;

      return {
        ...session,
        status,
        targetDate,
      };
    },
    [data],
  );

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
          {/* TODO button */}
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
      {sortedData && !loading && !error && (
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
          {sortedData.length > 8 && (
            <Center>
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                pagesCount={Math.ceil(sortedData.length / 8)}
              />
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default DistributeAssessmentPage;
