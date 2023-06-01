import React, { useContext, useMemo } from "react";
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

import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import type { TestSessionOverviewData } from "../../../APIClients/types/TestSessionClientTypes";
import * as Routes from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import type { TestSessionStatus } from "../../../types/TestSessionTypes";
import { STATUSES } from "../../../types/TestSessionTypes";
import { titleCase } from "../../../utils/GeneralUtils";
import {
  getSessionStatus,
  getSessionTargetDate,
} from "../../../utils/TestSessionUtils";
import HeaderWithButton from "../../common/HeaderWithButton";
import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";
import EmptySessionsMessage from "../../common/info/messages/EmptySessionsMessage";
import Pagination from "../../common/table/Pagination";
import usePaginatedData from "../../common/table/usePaginatedData";
import TestSessionListItem from "../../teacher/view-sessions/TestSessionListItem";

const DisplayAssessmentsPage = (): React.ReactElement => {
  const [currentTab, setCurrentTab] =
    React.useState<TestSessionStatus>("active");

  const { authenticatedUser } = useContext(AuthContext);

  const { id: teacherId } = authenticatedUser ?? {};

  const { loading, error, data } = useQuery<{
    testSessionsByTeacherId: TestSessionOverviewData[];
  }>(GET_TEST_SESSIONS_BY_TEACHER_ID, {
    fetchPolicy: "cache-and-network",
    variables: { teacherId },
    skip: !teacherId,
  });

  const formattedData = useMemo(() => {
    const now = new Date();
    return data?.testSessionsByTeacherId?.map(
      ({ id, startDate, endDate, test, class: classroom, ...session }) => ({
        ...session,
        testSessionId: id,
        testName: test.name,
        classroomName: classroom.className,
        status: getSessionStatus(startDate, endDate, now),
        targetDate: getSessionTargetDate(startDate, endDate, now),
      }),
    );
  }, [data]);

  const filteredData = useMemo(() => {
    return formattedData?.filter((session) => session.status === currentTab);
  }, [formattedData, currentTab]);

  const sortedData = useMemo(() => {
    const invertSort = currentTab === "past";
    return filteredData?.sort((a, b) => {
      return (
        (invertSort ? -1 : 1) *
        (a.targetDate.getTime() - b.targetDate.getTime())
      );
    });
  }, [filteredData, currentTab]);

  const { paginatedData, totalPages, currentPage, setCurrentPage } =
    usePaginatedData(sortedData);

  return (
    <>
      <HeaderWithButton
        buttonText="Add Assessment"
        showButton={!!formattedData?.length}
        targetRoute={Routes.DISTRIBUTE_ASSESSMENT_PAGE}
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
      {!!formattedData?.length && !loading && !error && (
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
                <TabPanel key={status} pl={0} pr={0}>
                  {paginatedData?.map((session) => (
                    <TestSessionListItem
                      key={session.testSessionId}
                      {...session}
                    />
                  ))}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          {totalPages > 1 && (
            <Center>
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                pagesCount={totalPages}
              />
            </Center>
          )}
        </>
      )}
      {!formattedData?.length && !loading && !error && <EmptySessionsMessage />}
    </>
  );
};

export default DisplayAssessmentsPage;
