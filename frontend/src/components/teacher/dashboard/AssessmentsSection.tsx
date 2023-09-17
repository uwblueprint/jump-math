import React, { useMemo, useState } from "react";
import { Box, Center } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import { TestSessionStatus } from "../../../types/TestSessionTypes";
import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";
import EmptySessionsMessage from "../../common/info/messages/EmptySessionsMessage";
import TestSessionTabs from "../view-sessions/TestSessionTabs";
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
          <TestSessionTabs data={sortedData} setCurrentTab={setCurrentTab} />
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
