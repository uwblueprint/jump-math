import React, { useMemo } from "react";
import {
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import { STATUSES, TestSessionStatus } from "../../../types/TestSessionTypes";
import { titleCase } from "../../../utils/GeneralUtils";
import {
  getSessionStatus,
  getSessionTargetDate,
} from "../../../utils/TestSessionUtils";
import ErrorState from "../../common/ErrorState";
import HeaderWithButton from "../../common/HeaderWithButton";
import LoadingState from "../../common/LoadingState";
import Pagination from "../../common/table/Pagination";
import EmptySessionsTableState from "../../sessions/EmptySessionsTableState";
import TestSessionListItem from "../../sessions/TestSessionListItem";

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

  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage]);

  return (
    <>
      <HeaderWithButton
        buttonText="Add Assessment"
        showButton={!!data?.length}
        targetRoute={Routes.DISTRIBUTE_ASSESSMENT_PAGE}
        title="Assessments"
      />
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
                  {currentPageData.map((session) => (
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
      {!data?.length && !loading && !error && <EmptySessionsTableState />}
    </>
  );
};

export default DisplayAssessmentsPage;
