import React, { useMemo } from "react";
import {
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import { TestSessionStatus } from "../../../types/TestSessionTypes";
import { TEST_SESSION_STATUSES } from "../../../types/TestSessionTypes";
import { titleCase } from "../../../utils/GeneralUtils";
import HeaderWithButton from "../../common/HeaderWithButton";
import EmptySessionsMessage from "../../common/info/messages/EmptySessionsMessage";
import QueryStateHandler from "../../common/QueryStateHandler";
import Pagination from "../../common/table/Pagination";
import usePaginatedData from "../../common/table/usePaginatedData";
import TestSessionListItem from "../../teacher/view-sessions/TestSessionListItem";
import useAssessmentDataQuery from "../../teacher/view-sessions/useAssessmentDataQuery";

const DisplayAssessmentsPage = (): React.ReactElement => {
  const [currentTab, setCurrentTab] = React.useState(TestSessionStatus.ACTIVE);

  const { loading, error, data } = useAssessmentDataQuery();

  const filteredData = useMemo(() => {
    return data?.filter((session) => session.status === currentTab);
  }, [data, currentTab]);

  const sortedData = useMemo(() => {
    const invertSort = currentTab === TestSessionStatus.PAST;
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
      <VStack align="left">
        <HeaderWithButton
          buttonText="Add Assessment"
          showButton={!!data?.length}
          targetRoute={Routes.DISTRIBUTE_ASSESSMENT_PAGE}
          title="Assessments"
        />
      </VStack>
      <QueryStateHandler error={error} loading={loading}>
        {!!data?.length ? (
          <>
            <Tabs
              mt={3}
              onChange={(index) => setCurrentTab(TEST_SESSION_STATUSES[index])}
            >
              <TabList>
                {TEST_SESSION_STATUSES.map((status) => (
                  <Tab key={status}>{titleCase(status)}</Tab>
                ))}
              </TabList>
              <TabPanels>
                {TEST_SESSION_STATUSES.map((status) => (
                  <TabPanel key={status} pl={0} pr={0}>
                    {paginatedData?.map((session) => (
                      <TestSessionListItem
                        key={session.testSessionId}
                        session={session}
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
        ) : (
          <EmptySessionsMessage />
        )}
      </QueryStateHandler>
    </>
  );
};

export default DisplayAssessmentsPage;
