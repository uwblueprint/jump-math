import React, { useMemo, useState } from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import {
  TEST_SESSION_STATUSES,
  TestSessionStatus,
} from "../../../types/TestSessionTypes";
import { titleCase } from "../../../utils/GeneralUtils";
import EmptySessionsMessage from "../../common/info/messages/EmptySessionsMessage";
import QueryStateHandler from "../../common/QueryStateHandler";
import TestSessionTabContents from "../view-sessions/TestSessionTabContents";
import useAssessmentDataQuery from "../view-sessions/useAssessmentDataQuery";

import useViewAllLimitedData from "./useViewAllLimitedData";
import ViewAllLink from "./ViewAllLink";

const QUERY_DATA_LIMIT_PER_STATUS = 6;

const AssessmentsSection = () => {
  const [currentTab, setCurrentTab] = useState(TestSessionStatus.ACTIVE);

  const { loading, error, data } = useAssessmentDataQuery(
    QUERY_DATA_LIMIT_PER_STATUS,
  );

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

  const [limitedData, showViewAll] = useViewAllLimitedData(
    sortedData,
    QUERY_DATA_LIMIT_PER_STATUS,
  );

  return (
    <QueryStateHandler error={error} loading={loading}>
      {data?.length ? (
        <>
          <Tabs
            mt={2}
            onChange={(index) => setCurrentTab(TEST_SESSION_STATUSES[index])}
          >
            <TabList>
              {TEST_SESSION_STATUSES.map((status) => (
                <Tab key={status}>{titleCase(status)}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {TEST_SESSION_STATUSES.map((status) => (
                <TabPanel key={status} p={0}>
                  <TestSessionTabContents data={limitedData} status={status} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          {showViewAll && (
            <ViewAllLink
              borderRadius="8px"
              h="50px"
              to={Routes.DISPLAY_ASSESSMENTS_PAGE}
            />
          )}
        </>
      ) : (
        <Box mt={8}>
          <EmptySessionsMessage />
        </Box>
      )}
    </QueryStateHandler>
  );
};

export default AssessmentsSection;
