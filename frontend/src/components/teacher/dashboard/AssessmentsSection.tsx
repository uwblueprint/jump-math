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

import {
  STATUSES,
  type TestSessionStatus,
} from "../../../types/TestSessionTypes";
import { titleCase } from "../../../utils/GeneralUtils";
import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";
import EmptySessionsMessage from "../../common/info/messages/EmptySessionsMessage";
import TestSessionListItem from "../view-sessions/TestSessionListItem";
import useAssessmentDataQuery from "../view-sessions/useAssessmentDataQuery";

const QUERY_DATA_LIMIT_PER_STATUS = 6;

// 3 tabs - this is a quick way of limiting the number of assessments
// fetched without having complex backend logic
const QUERY_DATA_LIMIT = QUERY_DATA_LIMIT_PER_STATUS * STATUSES.length;

const AssessmentsSection = () => {
  const [currentTab, setCurrentTab] = useState<TestSessionStatus>("ACTIVE");

  const { loading, error, data } = useAssessmentDataQuery(QUERY_DATA_LIMIT);

  const filteredData = useMemo(() => {
    return data
      ?.filter((session) => session.status === currentTab)
      .slice(0, QUERY_DATA_LIMIT_PER_STATUS);
  }, [data, currentTab]);

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
        <Tabs onChange={(index) => setCurrentTab(STATUSES[index])}>
          <TabList border="none" gap={8}>
            {STATUSES.map((status) => (
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
            {STATUSES.map((status) => (
              <TabPanel key={status} p={0}>
                {filteredData?.map((session) => (
                  <TestSessionListItem
                    key={session.testSessionId}
                    {...session}
                    classroomName={session.classroomName ?? ""}
                  />
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
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
