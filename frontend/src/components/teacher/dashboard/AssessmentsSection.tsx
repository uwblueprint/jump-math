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
import RouterLink from "../../common/navigation/RouterLink";
import TestSessionListItem from "../view-sessions/TestSessionListItem";
import useAssessmentDataQuery from "../view-sessions/useAssessmentDataQuery";

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
            <TabList border="none" gap={8}>
              {TEST_SESSION_STATUSES.map((status) => (
                <Tab
                  key={status}
                  _focus={{ background: "none" }}
                  border="none"
                  color="blue.100"
                  fontWeight="bold"
                  px={0}
                >
                  {titleCase(status)}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {TEST_SESSION_STATUSES.map((status) => (
                <TabPanel key={status} p={0}>
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
          <RouterLink
            _hover={{ backgroundColor: "blue.50" }}
            alignItems="center"
            backgroundColor="grey.100"
            borderRadius="8px"
            color="blue.300"
            display="flex"
            fontSize="14px"
            fontWeight="bold"
            h="50px"
            justifyContent="center"
            mt={4}
            textDecor="none"
            to={Routes.DISPLAY_ASSESSMENTS_PAGE}
            w="100%"
          >
            View all
          </RouterLink>
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
