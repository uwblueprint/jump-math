import React, { useMemo, useState } from "react";
import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import {
  TEST_SESSION_STATUSES,
  TestSessionStatus,
} from "../../../types/TestSessionTypes";
import { titleCase } from "../../../utils/GeneralUtils";
import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";
import EmptySessionsMessage from "../../common/info/messages/EmptySessionsMessage";
import TestSessionListItem from "../view-sessions/TestSessionListItem";
import useAssessmentDataQuery from "../view-sessions/useAssessmentDataQuery";

import ViewAllLink from "./ViewAllLink";

const QUERY_DATA_LIMIT_PER_STATUS = 5;

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

  return (
    <Box flex="1">
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
      {!!data?.length && !error && !loading && (
        <>
          <Tabs
            onChange={(index) => setCurrentTab(TEST_SESSION_STATUSES[index])}
          >
            <TabList>
              {TEST_SESSION_STATUSES.map((status) => (
                <Tab key={status}>{titleCase(status)}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {TEST_SESSION_STATUSES.map((status) => (
                <TabPanel key={status} px={0}>
                  {sortedData?.map((session) => (
                    <TestSessionListItem
                      key={session.testSessionId}
                      session={session}
                    />
                  ))}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          <ViewAllLink
            borderRadius="8px"
            h="50px"
            mt={4}
            to={Routes.DISPLAY_ASSESSMENTS_PAGE}
          />
        </>
      )}
      {!data?.length && !loading && !error && (
        <Box mt={8}>
          <EmptySessionsMessage />
        </Box>
      )}
    </Box>
  );
};

export default AssessmentsSection;
